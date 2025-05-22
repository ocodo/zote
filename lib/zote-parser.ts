import { ZotePreset } from "@/data/zote-presets"

function matchRegex(line: string, regex: RegExp): RegExpExecArray | undefined {
  return line.match(regex) as RegExpExecArray | undefined
}

function removeEnclosingQuotes(str: string) {
  // Only proceed if the string starts and ends with matching quotes
  if (
    (str[0] === '"' && str[str.length - 1] === '"') ||
    (str[0] === "'" && str[str.length - 1] === "'")
  ) {
    // Remove the enclosing quotes without using slice or substring
    // Otherwise High Range Unicode is not handled correctly
    return str.replace(/^['"](.*)['"]$/, '$1');
  }

  return str;
}

function extractKeyValue(line: string, regex: RegExp): [string, string] | undefined {
  const match = line.match(regex)
  if (!match) return undefined

  const key = match[1]
  let value = match[2]

  value = removeEnclosingQuotes(value)

  return [key, value]
}

function extractColor(line: string): [string, string] | undefined {
  const regex = /^\s*(\w+_COLOR)=(.?#?[A-Fa-f0-9]{6}.?)/
  return extractKeyValue(line, regex)
}

function extractIcon(line: string): [string, string] | undefined {
  const regex = /(\w+_ICON)=(.*)$/
  return extractKeyValue(line, regex)
}

function extractSetting(line: string, settingsKeys: string[]): [string, string] | undefined {
  const regex = new RegExp(`^\\s*(${settingsKeys.join('|')})=(.*)$`)

  return extractKeyValue(line, regex)
}

export function parseZoteTheme(fileContents: string): ZotePreset {
  const colors: Record<string, string> = {}
  const icons: Record<string, string> = {}
  const settings: Record<string, string> = {}
  let themeName: string = "untitled"

  const settingsKeys = ["DIVIDER", "ZSH_PROMPT_WEEK_DAY"]
  const lines = fileContents.split('\n')

  for (const line of lines) {
    if (themeName === "untitled") {
      const nameMatch = matchRegex(line, /^# Theme name:? (.+)/)
      if (nameMatch) {
        themeName = nameMatch[1].trim()
        continue
      }
    }

    if (/^\s*#/.test(line)) {
      continue
    }

    const color = extractColor(line)
    if (color) {
      const [key, value] = color
      colors[key] = value
      continue
    }

    const icon = extractIcon(line)
    if (icon) {
      const [key, value] = icon
      icons[key] = value
      continue
    }

    const setting = extractSetting(line, settingsKeys)
    if (setting) {
      const [key, value] = setting
      settings[key] = value
      continue
    }
  }

  return {
    themeName,
    colors,
    icons,
    settings,
  }
}
