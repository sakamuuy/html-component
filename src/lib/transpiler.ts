import fs from 'fs/promises'
import * as esprima from 'esprima'
import estraverse from 'estraverse'
import { nyaan } from './types'
import { parseHTMLComponent } from './domParser'
import { ObjectExpression } from 'estree'

const NYAAN_CALEE: nyaan.$NYAAN_COMPONENT = '$NYAAN_COMPONENT'

function searchNyaan(ast: esprima.Program, onFind: (componentPath: string) => void) {
  estraverse.traverse(ast, {
    enter(node, _) {
      console.log('====start====\n')
      console.log(node, '\n====end====\n')
      if (node.type === 'VariableDeclarator' && 
        node.init?.type === 'CallExpression' &&
        (node.init.callee as { type: string; name: string}).name === NYAAN_CALEE) {
        let componentPath = (node.init.arguments[0] as {value: string}).value
        if (componentPath.indexOf('.html') === -1) componentPath += '/index.html'

        onFind(componentPath)   
      }
    },
    leave(node, parent) {},
  })
}

function replaceNyaan(ast: esprima.Program, component: nyaan.HTMLObj<keyof HTMLElementTagNameMap>) {
  estraverse.traverse(ast, {
    enter(node, _) {
      if (node.type === 'CallExpression' &&
        (node.callee as { name: string }).name === NYAAN_CALEE) {
        
          return {
            type: 'ObjectExpression',
            properties: component as any
          } as ObjectExpression
      }
    },
    leave(node, parent) {},
  })
}

async function readFile(path: string) {
  return await fs.readFile(path, 'utf-8')
}

function transpileJS(jsStr: string) {
  const ast = esprima.parseScript(jsStr)
  searchNyaan(ast, (componentPath) => {
    parseHTMLComponent(componentPath, (result) => {
      const replacedAst = replaceNyaan(ast, result)

      console.log()
    })
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