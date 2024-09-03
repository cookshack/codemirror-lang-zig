import { checkDir } from './check.js'

let count, recur

if (process.argv.length < 3) {
  console.error('Pass a dir as the first arg.')
  process.exit()
}

recur = 0
if (process.argv.length > 3)
  recur = 1

count = checkDir(process.argv[2], recur)
if (count)
  console.log('\nFAILED: ' + count)
else
  console.log('\nALL GOOD')
