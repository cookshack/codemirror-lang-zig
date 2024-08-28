import { check, parse, pretty } from './check.js'

import * as Fs from 'fs'
import * as Path from 'path'

if (process.argv.length < 3) {
  console.error('Pass a dir as the first arg.')
  process.exit()
}

Fs.readdir(process.argv[2], {}, (err, data) => {
  let count

  if (err) {
    console.error(err.message)
    process.exitCode = 1
    return
  }

  count = 0
  data.forEach(name => {
    if (name.endsWith('.zig')) {
      let tree, path

      path = Path.join(process.argv[2], name)
      tree = parse(path)
      console.log(path)
      if (check(tree)) {
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

  if (count)
    console.log('\nFAILED: ' + count)
  else
    console.log('\nALL GOOD')
})
