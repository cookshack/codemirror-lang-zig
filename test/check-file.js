import { check, parse, pretty } from './check.js'

let res

if (process.argv.length < 3) {
  console.error('Pass a file as the first arg.')
  process.exit()
}

res = parse(process.argv[2])
if (check(res.tree)) {
  console.log('tree.length: ' + res.tree.length)
  console.log('tree: ' + res.tree)
  console.log(pretty(res.tree.topNode))
  process.exitCode = 1
}
