import fs from 'fs/promises'
import * as htmlparser from 'htmlparser2'
import { nyaan } from './types'

type Wrapper = {
  isClosed: boolean
  el: nyaan.HTMLObj<keyof HTMLElementTagNameMap>
}

const createHTMLObj = <T extends keyof HTMLElementTagNameMap>(tagName: keyof HTMLElementTagNameMap, attributes: nyaan.HTMLObj<T>['attributes'], isRoot: boolean) => {
  const obj: nyaan.HTMLObj<T> = {
    tagName,
    attributes,
    children: [],
    isRoot: isRoot
  }
  return obj
}

async function readHTML(path: string) {
  return await fs.readFile(path, 'utf-8')
}

// function findOpenParent(stack: Wrapper[]) {
//   return 
// }

export async function parse(path: string) {
  let root: Wrapper
  let opening: Wrapper | null
  const editingStack: Wrapper[] = []

  const parser = new htmlparser.Parser({
    onopentag(name: keyof HTMLElementTagNameMap, attributes) {
      const obj: Wrapper = {
        isClosed: false,
        el: createHTMLObj<typeof name>(name, attributes, root? false : true)
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
        opening.el.children.push(text)
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
      console.log(JSON.stringify(root, null , "\t"))
    }
  })

  parser.write((await readHTML(path)))
  parser.end()
}
