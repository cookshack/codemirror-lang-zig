import { lr } from '../dist/index.js'
import { parse, pretty } from './check.js'

import * as fs from 'fs'

let res

if (process.argv.length < 3) {
  console.error('Pass a file as the first arg.')
  process.exit()
}

res = parse(process.argv[2])
console.log('tree.length: ' + res.tree.length)
console.log('tree: ' + res.tree)
console.log(pretty(res.tree.topNode))
