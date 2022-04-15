import prism from 'prismjs'
// import loadLanguages from 'prismjs/components'
// loadLanguages(['yaml'])
import 'prismjs-components-importer/esm/prism-yaml.js'

// converts prism token format to range objects in a flat array
function * tokensToRanges (tokens, inheritTypes = []) {
  for (const token of tokens) {
    if (typeof token === 'string') {
      yield { text: token, types: inheritTypes }
    } else if (token instanceof prism.Token) {
      const content = Array.isArray(token.content) ? token.content : [token.content]
      yield * tokensToRanges(content, [...inheritTypes, token.type])
    }
  }
}

export const newline = Symbol('newline')
function * splitRangesOnLines (ranges) {
  for (const range of ranges) {
    if (range.text.includes('\n')) {
      const sections = range.text.split('\n')
      yield { text: sections.shift(), types: range.types }
      while (sections.length > 0) {
        yield newline
        yield { text: sections.shift(), types: range.types }
      }
    } else {
      yield range
    }
  }
}

// yield an array of all the tokens between each newline symbol
function * arrayify (ranges) {
  let accumulator = []
  for (const range of ranges) {
    if (range === newline) {
      yield accumulator
      accumulator = []
    } else {
      accumulator.push(range)
    }
  }
  if (accumulator.length > 0) {
    yield accumulator
  }
}

// when two tokens are butted up against each other, and of exactly the same type, combine them
function * stripRedundant (lines) {
  for (const line of lines) {
    if (line.length === 0) {
      yield line
    } else {
      const out = line.slice(0, 1)
      for (const piece of line.slice(1)) {
        if (piece.types.join(' ') === out[out.length - 1].types.join(' ')) {
          out[out.length - 1].text += piece.text
        } else {
          out.push(piece)
        }
      }
      yield out
    }
  }
}

function * simplify (lines) {
  for (const line of lines) {
    const out = []
    for (const token of line) {
      if (token.text.match(/^[ \t\r\n]*$/)) {
        out.push({ text: token.text, types: [] }) // simplify markup for whitespace content
      } else {
        out.push(token)
      }
    }
    yield out
  }
}

/** formats and nicely displays javascript/json code with highlighting and line numbers */
export function codeToLines (code: string, language: string = 'json') {
  if (typeof code !== 'string') code = JSON.stringify(code, null, 2)

  // syntax highlighting
  const grammars = {
    json: prism.languages.json5,
    jsonl: prism.languages.json,
    javascript: prism.languages.js,
    yaml: prism.languages.yaml,
    xml: prism.languages.xml,
    html: prism.languages.html,
    markdown: prism.languages.markdown
  }

  const grammar = grammars[language]
  const tokens = grammar ? prism.tokenize(code, grammar) : [code]
  let lines = [...simplify(stripRedundant(arrayify(splitRangesOnLines(tokensToRanges(tokens)))))]
  // remove any empty ranges
  lines = lines.map(ranges => ranges.filter(({ text }) => text.length > 0))

  return {
    gutterDigits: lines.length.toString().length,
    lines
  }
}

// inlineSourceCode (code, ...args) {
//   if (typeof code !== 'string') code = JSON.stringify(code)
//   const options = getAttribs(args)

//   // syntax highlighting
//   const language = options.data && options.data.language ? options.data.language : 'javascript'
//   const grammars = {
//     json: prism.languages.json5,
//     jsonl: prism.languages.json,
//     javascript: prism.languages.js,
//     yaml: prism.languages.yaml,
//     xml: prism.languages.xml,
//     html: prism.languages.html,
//     ruby: prism.languages.ruby,
//     python: prism.languages.python,
//     markdown: prism.languages.markdown
//   }

//   const grammar = grammars[language]
//   const tokens = grammar ? prism.tokenize(code, grammar) : [code]

//   // converts prism token format to range objects in a flat array
//   function * tokensToRanges (tokens, inheritTypes = []) {
//     for (const token of tokens) {
//       if (typeof token === 'string') {
//         yield { text: token, types: inheritTypes }
//       } else if (token instanceof prism.Token) {
//         const content = Array.isArray(token.content) ? token.content : [token.content]
//         yield * tokensToRanges(content, [...inheritTypes, token.type])
//       }
//     }
//   }

//   appendClass(options, 'inline-source-code')
//   options.data = {
//     ...(options.data || {}),
//     language
//   }

//   this.code(options, v => {
//     for (const { text, types } of tokensToRanges(tokens)) {
//       if (text.length > 0) {
//         if (types.length > 0) {
//           v.tag('p-t', { class: types }, text)
//         } else {
//           v.text(text)
//         }
//       }
//     }
//   })
// }