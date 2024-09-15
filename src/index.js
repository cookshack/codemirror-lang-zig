import * as Grammar from './syntax.grammar'
import { LRLanguage, LanguageSupport, indentNodeProp, continuedIndent, delimitedIndent, foldNodeProp, foldInside } from '@codemirror/language'
import { completeFromList, ifNotIn } from '@codemirror/autocomplete'

let props, data, parser, keywords, skipComplete, completionSource

keywords = [ 'addrspace', 'align', 'allowzero', 'and', 'anyframe', 'anytype', 'asm', 'async', 'await', 'break', 'c', 'callconv', 'catch',
             'comptime', 'const', 'continue', 'defer', 'else', 'enum', 'errdefer', 'error', 'export', 'extern', 'fn', 'for', 'if', 'inline',
             'linksection', 'noalias', 'noinline', 'nosuspend', 'opaque', 'or', 'orelse', 'packed', 'pub', 'resume', 'return', 'struct',
             'suspend', 'switch', 'test', 'threadlocal', 'try', 'union', 'unreachable', 'usingnamespace', 'var', 'volatile', 'while' ]

skipComplete = [ 'ContainerDocComment', 'DocComment', 'FieldAccess', 'LineComment', 'StringLiteral', 'StringLiteralSingle' ]

completionSource = ifNotIn(skipComplete,
                           completeFromList(keywords.map(kw => ({ label: kw, type: 'keyword' }))))

props = [ indentNodeProp.add({ 'InitList Block ErrBlock SwitchBlock ContainerBlock': delimitedIndent({ closing: '}' }),
                               'ParamDeclList FnCallArgs': delimitedIndent({ closing: ')',
                                                                             align: true }),
                               AsmParams: delimitedIndent({ closing: ')',
                                                            align: false }),
                               'AsmOutList AsmInList AsmClobList': context => context.baseIndent + 2, // ': '
                               SwitchProng: context => context.baseIndent + context.unit,
                               IfStatement: continuedIndent({ except: /^\s*({|else\b)/ }),
                               MultiStringLiteral: continuedIndent(),
                               WhileStatement: continuedIndent() }),
          foldNodeProp.add({ 'InitList Block ErrBlock SwitchBlock ContainerBlock ParamDeclList FnCallArgs AsmParams': foldInside }) ]

data = { commentTokens: { line: '//' },
         closeBrackets: { brackets: [ '(', '[', '{', "'", '"' ] },
         indentOnInput: /^\s*(?:\{|\})$/ }

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
  return new LanguageSupport(lr,
                             [ lr.data.of({ autocomplete: completionSource }) ])
}
