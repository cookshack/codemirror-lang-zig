import { lr } from '../dist/index.js'

import * as fs from 'fs'

let content, tree

function pretty
(node, offset = 0, indent = 0) {
  if (node) {
    let ret, child, prefix

    ret = ''
    prefix = ''
    if (indent)
      prefix = ' '.repeat(offset)
    offset += (node.name.length + 1)
    child = node.firstChild
    while (child) {
      let str

      str = pretty(child, offset, ret.length)
      if (str) {
        if (ret.length)
          ret += ',\n'
        ret += str
      }
      child = child.nextSibling
    }

    return prefix + node.name + (ret.length ? '(' + ret + ')' : '')
  }
  return ''
}

if (process.argv.length < 3) {
  console.error('Pass a file as the first arg.')
  process.exit()
}

content = fs.readFileSync(process.argv[2], 'utf8')
//console.log(content)
tree = lr.parser.parse(content)
console.log('tree.length: ' + tree.length)
console.log('tree: ' + tree)
console.log(pretty(tree.topNode))
