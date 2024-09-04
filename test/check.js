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

// returns number failed
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
        console.log(path + ': error: ' + 'failed to parse')
        //throw 'parse failed'
      }
    }
  })

  return count
}

// returns number failed
export
function checkFile
(path) {
  let res

  res = parse(process.argv[2])
  if (check(res.tree)) {
    console.log(process.argv[2] + ': error: ' + 'failed to parse')
    return 1
  }
  return 0
}

export
function checkFileOrDir
(path, recursive) {
  let stats

  stats = Fs.statSync(path)
  if (stats.mode & (1 << 15))
    return checkFile(path)
  return checkDir(path)
}

export
function mainShow
() {
  let res

  if (process.argv.length < 3) {
    console.error('Pass a file as the first arg.')
    process.exitCode = 1
    return
  }

  res = parse(process.argv[2])
  console.log('tree.length: ' + res.tree.length)
  console.log('tree:')
  console.log(pretty(res.tree.topNode))
}

export
function mainChk
() {
  let count, recur

  if (process.argv.length < 3) {
    console.error('Pass a file or dir as the first arg.')
    process.exitCode = 1
    return
  }

  recur = 0
  if (process.argv.length > 3)
    recur = 1

  console.log('Checking ' + process.argv[2])
  count = checkFileOrDir(process.argv[2], recur)
  if (count) {
    console.log('\nFAILED: ' + count)
    process.exitCode = 2
  }
  else
    console.log('\nALL GOOD')
}
