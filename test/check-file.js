import { check, parse, pretty } from './check.js'

let tree

if (process.argv.length < 3) {
  console.error('Pass a file as the first arg.')
  process.exit()
}

tree = parse(process.argv[2])
if (check(tree)) {
  console.log('tree.length: ' + tree.length)
  console.log('tree: ' + tree)
  console.log(pretty(tree.topNode))
  process.exitCode = 1
}
