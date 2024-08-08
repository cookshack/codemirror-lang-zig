import { styleTags, tags as t } from '@lezer/highlight'

export const highlighting = styleTags({
  'fn Var': t.definitionKeyword,
  'inline Comptime Const': t.modifier,
  'If Else Switch For While Case Return Break Continue Try Catch': t.controlKeyword,
  'Null': t.null,
  'BlockLabel BreakLabel': t.labelName,
  'BuiltinIdentifier Identifier': t.variableName,
  AdditionOp: t.arithmeticOperator,
  MultiplyOp: t.arithmeticOperator,
  'And Or': t.logicOperator,
  BitwiseOp: t.bitwiseOperator,
  BitShiftOp: t.bitwiseOperator,
  CompareOp: t.compareOperator,
  AssignOp: t.definitionOperator,
  UpdateOp: t.updateOperator,
  LineComment: t.lineComment,
  Integer: t.number,
  StringLiteral: t.string,
  '( )': t.paren,
  '[ ]': t.squareBracket,
  '{ }': t.brace,
  '.*': t.derefOperator,
  ', ;': t.separator
})
