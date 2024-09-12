import * as Grammar from './syntax.grammar'
import { LRLanguage, LanguageSupport, indentNodeProp, foldNodeProp, foldInside } from '@codemirror/language'

let props, data, parser

function foldCDA
(tree) {
  let two, last

  two = tree.firstChild?.nextSibling
  last = tree.lastChild
  if (two == last)
    return null
  if (two && (two.to < last.from))
    return { from: two.to,
             to: last.type.isError ? tree.to : last.from }
  return null
}

props = [ //indentNodeProp.add({ Rule: context => context.column(context.node.from) + context.unit }),
          foldNodeProp.add({ "InitList Block ErrorSetDecl SwitchExpr": foldInside,
                             ContainerDeclAuto: foldCDA }) ]

data = {} // commentTokens: { line: "//" },

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
