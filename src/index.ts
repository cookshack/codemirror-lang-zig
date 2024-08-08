import * as Grammar from './syntax.grammar'
import { LRLanguage, LanguageSupport, indentNodeProp, foldNodeProp, foldInside } from '@codemirror/language'

let props, data, parser

props = [ //indentNodeProp.add({ Rule: context => context.column(context.node.from) + context.unit }),
          foldNodeProp.add({ Rule: foldInside }),
        ]

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
