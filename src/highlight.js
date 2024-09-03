import { styleTags, tags as t } from '@lezer/highlight'

export const highlighting = styleTags({
  'fn var': t.definitionKeyword,
  'inline comptime const': t.modifier,
  'if else switch for while case return break continue try catch': t.controlKeyword,
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
