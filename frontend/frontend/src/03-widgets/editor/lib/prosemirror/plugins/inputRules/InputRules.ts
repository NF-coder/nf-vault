import {inputRules, wrappingInputRule, textblockTypeInputRule, InputRule,
        smartQuotes, emDash, ellipsis} from "prosemirror-inputrules"
import { NodeType, Schema} from "prosemirror-model"
import { markInputRule } from "./utils/MarkInputRule"
import { markInputRuleWithMarker } from "./utils/MarkInputRuleWithMarker"

const blockQuoteRule = (nodeType: NodeType) => {
  return wrappingInputRule(
    /^\s*>\s$/,
    nodeType
  )
}

const orderedListRule = (nodeType: NodeType) => {
  return wrappingInputRule(
    /^(\d+)\.\s$/, 
    nodeType, 
    match => ({order: +match[1]}),
    (match, node) => node.childCount + node.attrs.order == +match[1]
  )
}

const bulletListRule = (nodeType: NodeType) => {
  return wrappingInputRule(/^\s*([-+*])\s$/, nodeType)
}

const headingRule = (nodeType: NodeType, maxLevel: number) => {
  return textblockTypeInputRule(
    new RegExp("^(#{1," + maxLevel + "})\\s$"),
    nodeType,
    match => ({level: match[1].length})
  )
}

const strongRule_star = (schema: Schema) => {
  return markInputRule({
    rule: {open: '**', close: '**'},
    markType: schema.marks.strong
  })
}
const strongRule_underscore = (schema: Schema) => {
  return markInputRule({
    rule: {open: '__', close: '__'},
    markType: schema.marks.strong,
    //markerType: schema.nodes.marker
  })
}

const emRule_star = (schema: Schema) => {
  return markInputRule({
    rule: {open: '*', close: '*'},
    markType: schema.marks.em,
    //markerType: schema.nodes.marker
  })
}
const emRule_underscore = (schema: Schema) => {
  return markInputRule({
    rule: {open: '_', close: '_'},
    markType: schema.marks.em,
  })
}

export const buildInputRules = (schema: Schema) => {
  let rules = smartQuotes.concat(ellipsis, emDash), type

  if (type = schema.nodes.blockquote) rules.push(blockQuoteRule(type))
  if (type = schema.nodes.ordered_list) rules.push(orderedListRule(type))
  if (type = schema.nodes.bullet_list) rules.push(bulletListRule(type))
  if (type = schema.nodes.heading) rules.push(headingRule(type, 6))

  rules.push(emRule_star(schema))
  rules.push(strongRule_underscore(schema))
  //rules.push(emRule_underscore(schema))
  //rules.push(strongRule_star(schema))

  return inputRules({rules})
}