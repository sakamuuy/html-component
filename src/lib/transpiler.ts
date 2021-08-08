import fs from 'fs/promises'

async function readFile(path: string) {
  return await fs.readFile(path, 'utf-8')
}

function transpileJS(jsStr: string) {
  console.log(jsStr)
}

export async function transpile(path: string) {
  if (/\.js$/.test(path)) {
    transpileJS((await readFile(path)))
  } else if (/\.ts$/.test(path)) {

  } else {
    throw new Error('Invalid path of transpile target')
  }
}