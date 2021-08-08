import fs from 'fs/promises'
import * as htmlparser from 'htmlparser2'
import { nyaan } from './types'

type Wrapper = {
  isClosed: boolean
  el: nyaan.HTMLObj<keyof HTMLElementTagNameMap>
}

const createHTMLObj = <T extends keyof HTMLElementTagNameMap>(
  tagName: keyof HTMLElementTagNameMap,
  attributes: nyaan.HTMLObj<T>['attributes'],
  isRoot: boolean
) => {
  const obj: nyaan.HTMLObj<T> = {
    tagName,
    attributes,
    children: [],
    content: [],
    isRoot: isRoot,
  }
  return obj
}

async function readHTML(path: string) {
  const raw = await fs.readFile(path, 'utf-8')
  return raw.replace(/(\r|\n|\r\n)/g, '')
}

export async function parseHTMLComponent(
  path: string,
  onEnd: (result: nyaan.HTMLObj<keyof HTMLElementTagNameMap>) => void
) {
  let root: Wrapper
  let opening: Wrapper | null
  const editingStack: Wrapper[] = []

  const parser = new htmlparser.Parser({
    onopentag(name: keyof HTMLElementTagNameMap, attributes) {
      const obj: Wrapper = {
        isClosed: false,
        el: createHTMLObj<typeof name>(name, attributes, root ? false : true),
      }

      if (!root) {
        root = obj
      }

      if (opening) {
        opening.el.children.push(obj.el)
      }

      editingStack.push(obj)

      opening = obj
    },
    ontext(text) {
      if (opening) {
        text = text.trim()
        if (text && text.length) opening.el.content.push(text)
      }
    },
    onclosetag(tagname) {
      if (opening?.el.tagName === tagname) {
        opening.isClosed = true
        editingStack.pop()
        const openingParent = editingStack.reverse().find((obj) => !obj.isClosed)
        if (openingParent) {
          opening = openingParent
        }

        // Fix order
        editingStack.reverse()
      }
    },
    onend() {
      onEnd(root.el)
    },
  })

  parser.write(await readHTML(path))
  parser.end()
}
