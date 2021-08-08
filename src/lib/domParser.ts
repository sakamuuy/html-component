import fs from 'fs/promises'
import { Parser } from 'htmlparser2'
import { nyaan } from './types'

const createHTMLObj = <T extends keyof HTMLElementTagNameMap>(tagName: keyof HTMLElementTagNameMap, attributes: nyaan.HTMLObj<T>['attributes']) => {
  const obj: nyaan.HTMLObj<T> = {
    tagName,
    attributes,
    children: []
  }
  return obj
}

async function readHTML(path: string) {
  return await fs.readFile(path, 'utf-8')
}

export async function parse(path: string) {
  const htmlStr = await readHTML(path)

  let opening: nyaan.HTMLObj<keyof HTMLElementTagNameMap> | null;
  const editing: nyaan.HTMLObj<keyof HTMLElementTagNameMap>[] = []
  const editted: nyaan.HTMLObj<keyof HTMLElementTagNameMap>[] = []
  
  const parser = new Parser({
    onopentag(name: keyof HTMLElementTagNameMap, attributes) {
      opening = createHTMLObj<typeof name>(name, attributes)
      editing.unshift(opening)
    },
    ontext(text) {
      if (opening) {
        opening.children.push(text)
      }
    },
    onclosetag(tagname) {
      if (opening.tagName === tagname) {
        opening = null
      }

      const index = editing.findIndex((nyaan) => nyaan.tagName === tagname)
      editted.push(editing[index])
      editing.splice(index, index+1) // Delete element finish edit.      
    }
  })

  parser.write(htmlStr)
  parser.end()

  console.log(editted)
}

