import { styleTags, tags as t } from '@lezer/highlight'

export const highlighting = styleTags({
  'asm enum fn struct test union var': t.definitionKeyword,
  'async comptime const continue defer errdefer export extern inline noalias noinline nosuspend pub resume suspend': t.modifier,
  'addrspace align allowzero anyframe anytype callconv error linksection packed threadlocal unreachable usingnamespace volatile': t.modifier,
  'opaque': t.modifier,
  'if else switch for while case return break continue try': t.controlKeyword,
  'BlockLabel BreakLabel': t.labelName,
  'BuiltinIdentifier Identifier': t.variableName,
  AdditionOp: t.arithmeticOperator,
  MultiplyOp: t.arithmeticOperator,
  'and or': t.logicOperator,
  BitwiseOp: t.bitwiseOperator,
  BitShiftOp: t.bitwiseOperator,
  CompareOp: t.compareOperator,
  AssignOp: t.definitionOperator,
  UpdateOp: t.updateOperator,
  ContainerDocComment: t.lineComment,
  DocComment: t.lineComment,
  LineComment: t.lineComment,
  Integer: t.number,
  StringLiteral: t.string,
  '( )': t.paren,
  '[ ]': t.squareBracket,
  '{ }': t.brace,
  '.*': t.derefOperator,
  ', ;': t.separator
})
