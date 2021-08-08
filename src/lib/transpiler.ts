import fs from 'fs/promises'
import * as esprima from 'esprima'
import estraverse from 'estraverse'
import { nyaan } from './types'

const NYAAN_CALEE: nyaan.$NYAAN_COMPONENT = '$NYAAN_COMPONENT'

async function readFile(path: string) {
  return await fs.readFile(path, 'utf-8')
}

function transpileJS(jsStr: string) {
  const ast = esprima.parseScript(jsStr)
  estraverse.traverse(ast, {
    enter(node, parent) {
      if (node.type === 'VariableDeclarator' && 
        node.init?.type === 'CallExpression' &&
        (node.init.callee as unknown as { type: string; name: string}).name === NYAAN_CALEE) {
          
        console.log('nyaan')
      }
    },
    leave(node, parent) {

    }
  })
}

export async function transpile(path: string) {
  if (/\.js$/.test(path)) {
    transpileJS((await readFile(path)))
  } else if (/\.ts$/.test(path)) {

  } else {
    throw new Error('Invalid path of transpile target')
  }
}