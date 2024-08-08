import * as Grammar from './syntax.grammar'
import { LRLanguage, LanguageSupport, indentNodeProp, foldNodeProp, foldInside } from '@codemirror/language'
import { styleTags, tags } from '@lezer/highlight'

let props, data, parser

props = [ //indentNodeProp.add({ Rule: context => context.column(context.node.from) + context.unit }),
          foldNodeProp.add({ Rule: foldInside }),
        ]

data = {} // commentTokens: { line: "//" },

parser = Grammar.parser.configure({ props: props })

export
const lr = LRLanguage.define({ name: 'zig',
                               parser: parser,
                               languageData: data })

export
function language
() {
  return new LanguageSupport(lr)
}
