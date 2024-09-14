import * as Grammar from './syntax.grammar'
import { LRLanguage, LanguageSupport, indentNodeProp, continuedIndent, delimitedIndent, foldNodeProp, foldInside } from '@codemirror/language'

let props, data, parser

props = [ indentNodeProp.add({ "InitList Block ErrorSetDecl SwitchBlock ContainerBlock": delimitedIndent({ closing: '}' }),
                               'ParamDeclList FnCallArgs': delimitedIndent({ closing: ')',
                                                                             align: true }),
                               SwitchProng: context => context.baseIndent + context.unit,
                               IfStatement: continuedIndent({ except: /^\s*({|else\b)/ }),
                               WhileStatement: continuedIndent() }),
          foldNodeProp.add({ "InitList Block ErrorSetDecl SwitchExpr ContainerBlock ParamDeclList FnCallArgs": foldInside }) ]

data = { commentTokens: { line: "//" },
         closeBrackets: { brackets: ['(', '[', '{', "'", '"' ]}}

parser = Grammar.parser.configure({ props: props })

/// A language provider for Zig, including highlighting and indentation
/// information.
export
const lr = LRLanguage.define({ name: 'zig',
                               parser: parser,
                               languageData: data })

/// Language support for Zig.
export
function language
() {
  return new LanguageSupport(lr)
}
