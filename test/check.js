import { lr } from '../dist/index.js'

import * as Fs from 'fs'
import * as Path from 'path'

export
function parse
(file) {
  let tree, content
  content = Fs.readFileSync(file, 'utf8')
  //console.log(content)
  tree = lr.parser.parse(content)
  return { tree: tree, content: content }
}

export
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

export
function check
(tree) {
  let fail
  fail = 0
  tree.iterate({enter: node => {
    if (node.type.isError) {
      fail = 1
      return 0
    }
    return 1
  }})
  return fail
}

export
function checkDir
(dir, recursive) {
  let data, count

  data = Fs.readdirSync(dir, { recursive: recursive ? true : false })

  count = 0
  data.forEach(name => {
    if (name.endsWith('.zig')) {
      let res, path

      path = Path.join(process.argv[2], name)
      res = parse(path)
      console.log(path + ' ' + res.content.length)
      if (check(res.tree)) {
        count++
        console.log('  ^==== parse failed')
        //console.log('tree.length: ' + tree.length)
        //console.log('tree: ' + tree)
        //console.log(pretty(tree.topNode))
        process.exitCode = 1
        //throw 'parse failed'
      }
    }
  })

  return count
}
