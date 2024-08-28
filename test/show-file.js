import { lr } from '../dist/index.js'
import { parse, pretty } from './check.js'

import * as fs from 'fs'

let tree

if (process.argv.length < 3) {
  console.error('Pass a file as the first arg.')
  process.exit()
}

tree = parse(process.argv[2])
console.log('tree.length: ' + tree.length)
console.log('tree: ' + tree)
console.log(pretty(tree.topNode))
