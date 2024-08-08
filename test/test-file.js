import { lr } from '../dist/index.js'

import * as fs from 'fs'

let content, tree

if (process.argv.length < 3) {
  console.error('Pass a file as the first arg.')
  process.exit()
}

content = fs.readFileSync(process.argv[2], 'utf8')
//console.log(content)
tree = lr.parser.parse(content)
console.log('tree.length: ' + tree.length)
