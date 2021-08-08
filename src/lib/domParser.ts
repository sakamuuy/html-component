import fs from 'fs/promises'
import { Parser } from 'htmlparser2'
import { nyaan } from './types'

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

export async function parse(path: string) {
  const htmlStr = await readHTML(path)

  let root: nyaan.HTMLObj<keyof HTMLElementTagNameMap>;
  let opening: nyaan.HTMLObj<keyof HTMLElementTagNameMap> | null;

  const parser = new Parser({
    onopentag(name: keyof HTMLElementTagNameMap, attributes) {
      const obj = createHTMLObj<typeof name>(name, attributes, root? false : true)
      if (!root) {
        root = obj
      }

      if (opening) {
        opening.children.push(obj)
      }

      opening = obj
    },
    ontext(text) {
      if (opening) {
        opening.children.push(text)
      }
    },
    onclosetag(tagname) {
      if (opening?.tagName === tagname) {
        opening = null
      }  
    },
    onend() {
      console.log(JSON.stringify(root, null , "\t"))
    }
  })

  parser.write(htmlStr)
  parser.end()
}

