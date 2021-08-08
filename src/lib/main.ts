import { parse } from './domParser'
import { transpile } from './transpiler'

const PATH = 'Example/src/components/List/index.html'
const JS_PATH = 'Example/src/js/useList.js'

export function main() {
  transpile(JS_PATH)
  // parse(PATH, (root) => console.log(JSON.stringify(root)))
}
