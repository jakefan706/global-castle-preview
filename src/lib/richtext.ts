type LooseObject = Record<string, unknown>

function isLooseObject(value: unknown): value is LooseObject {
  return typeof value === 'object' && value !== null
}

export function collectLexicalText(node: unknown): string[] {
  if (!isLooseObject(node)) {
    return []
  }

  const directText = typeof node.text === 'string' ? node.text : ''
  const childText = Array.isArray(node.children)
    ? node.children.flatMap((child) => collectLexicalText(child))
    : []

  return [directText, ...childText]
}

export function lexicalNodeToText(node: unknown) {
  return collectLexicalText(node)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Extract lines from a Lexical rich text node, supporting:
 * - paragraph nodes (split by linebreak children into separate lines)
 * - list/listitem nodes (each listitem becomes a line)
 * - nested structures
 */
function extractLinesFromNode(node: unknown): string[] {
  if (!isLooseObject(node)) return []

  const type = node.type as string | undefined

  // list node → recurse into children (listitem nodes)
  if (type === 'list' && Array.isArray(node.children)) {
    return node.children.flatMap((child) => extractLinesFromNode(child))
  }

  // listitem → collect all text children as one line
  if (type === 'listitem') {
    const text = lexicalNodeToText(node)
    return text ? [text] : []
  }

  // paragraph → split on linebreak children
  if (type === 'paragraph' && Array.isArray(node.children)) {
    const lines: string[] = []
    let currentParts: string[] = []

    for (const child of node.children) {
      if (isLooseObject(child) && (child.type as string) === 'linebreak') {
        const line = currentParts.join('').trim()
        if (line) lines.push(line)
        currentParts = []
      } else if (isLooseObject(child) && typeof child.text === 'string') {
        // Split on embedded \n as well (some content has literal newlines in text nodes)
        const parts = child.text.split('\n')
        if (parts.length > 1) {
          // first part joins current, rest start new lines
          currentParts.push(parts[0])
          const line = currentParts.join('').trim()
          if (line) lines.push(line)
          currentParts = []
          for (let i = 1; i < parts.length - 1; i++) {
            if (parts[i].trim()) lines.push(parts[i].trim())
          }
          currentParts = [parts[parts.length - 1]]
        } else {
          currentParts.push(child.text)
        }
      } else {
        // nested node – collect its text
        const text = lexicalNodeToText(child)
        if (text) currentParts.push(text)
      }
    }

    const remaining = currentParts.join('').trim()
    if (remaining) lines.push(remaining)

    return lines
  }

  // fallback – just extract all text
  const text = lexicalNodeToText(node)
  return text ? [text] : []
}

export function extractRichTextLines(value: unknown) {
  if (!isLooseObject(value) || !isLooseObject(value.root) || !Array.isArray(value.root.children)) {
    return []
  }

  return value.root.children.flatMap((node) => extractLinesFromNode(node)).filter(Boolean)
}

export function richTextToPlainText(value: unknown) {
  return extractRichTextLines(value).join('\n').trim()
}

export function createMetaDescriptionFromRichText(value: unknown, maxLength = 160) {
  const text = richTextToPlainText(value).replace(/\s+/g, ' ').trim()

  if (!text) {
    return ''
  }

  if (text.length <= maxLength) {
    return text
  }

  return `${text.slice(0, Math.max(0, maxLength - 1)).trimEnd()}…`
}
