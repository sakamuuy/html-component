import fs from 'fs/promises'
import * as esprima from 'esprima'
import estraverse from 'estraverse'
import { nyaan } from './types'
import { parseHTMLComponent } from './domParser'
import escodegen from 'escodegen'
import mkdirp from 'mkdirp'

let componentDeclaration: string
const NYAAN_CALEE: nyaan.$NYAAN_COMPONENT = '$NYAAN_COMPONENT'

function searchNyaan(ast: esprima.Program, onFind: (componentPath: string) => void) {
  estraverse.traverse(ast, {
    enter(node, _) {
      if (
        node.type === 'VariableDeclarator' &&
        node.init?.type === 'CallExpression' &&
        (node.init.callee as { type: string; name: string }).name === NYAAN_CALEE
      ) {
        let componentPath = (node.init.arguments[0] as { value: string }).value
        if (componentPath.indexOf('.html') === -1) componentPath += '/index.html'

        componentDeclaration = (node.id as { name: string }).name
        onFind(componentPath)
      }
    },
  })
}

function replaceNyaan(ast: esprima.Program, component: nyaan.HTMLObj<keyof HTMLElementTagNameMap>) {
  return estraverse.replace(ast, {
    enter(node, _) {
      if (
        node.type === 'VariableDeclarator' &&
        node.init?.type === 'CallExpression' &&
        (node.init.callee as { type: string; name: string }).name === NYAAN_CALEE
      ) {
        const componentAst = esprima.parseScript(`${componentDeclaration} = ${JSON.stringify(component)}`)

        return componentAst
      }
    },
  })
}

async function readFile(path: string) {
  return await fs.readFile(path, 'utf-8')
}

function transpileJS(jsStr: string, onEnd: (result: string) => void) {
  const ast = esprima.parseScript(jsStr)

  searchNyaan(ast, (componentPath) => {
    parseHTMLComponent(componentPath, (result) => {
      const replacedAst = replaceNyaan(ast, result)
      onEnd(escodegen.generate(replacedAst))
    })
  })
}

export async function transpile(path: string) {
  if (/\.js$/.test(path)) {
    transpileJS(await readFile(path), (result) => {
      const paths = path.split('/')
      const fileName = paths.pop()
      paths.push(`_generated_${fileName}`)
      fs.writeFile(paths.join('/'), result, 'utf-8')
    })
  } else if (/\.ts$/.test(path)) {
  } else {
    throw new Error('Invalid path of transpile target')
  }
}

// const isNyaanDeclaration = (node:) => (
//   node.type === 'VariableDeclarator' &&
//   node.init?.type === 'CallExpression' &&
//   (node.init.callee as { type: string; name: string}).name === NYAAN_CALEE)
// )
