import { transpile } from './transpiler'

const JS_PATH = 'Example/src/js/useList.js'

export function main() {
  transpile(JS_PATH)
  // parse(PATH, (root) => console.log(JSON.stringify(root)))
}
