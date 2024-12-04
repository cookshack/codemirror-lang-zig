Zig language support for CodeMirror 6.

## Credits

Based on [tree-sitter-zig](https://github.com/ziglibs/tree-sitter-zig), [lang-cpp](https://github.com/codemirror/lang-cpp)
and the [Zig language spec](https://github.com/ziglang/zig-spec).

## Build from source

```
$ npm i # only needed first time
$ npm run prepare && npm test
```

## Check parser

Test the parser against all files in a dir, recursively:

```sh
./bin/chk -e zig -r ~/src/zig/src
```
