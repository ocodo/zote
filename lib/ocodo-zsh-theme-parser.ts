import { ZotePreset } from "@/data/zote-presets"

function matchRegex(line: string, regex: RegExp): RegExpExecArray | undefined {
  return line.match(regex) as RegExpExecArray | undefined
}

function extractColor(line: string): [string, string] | undefined {
  const match = matchRegex(line, /(\w+_COLOR)="#?([A-Fa-f0-9]{6})"/)
  if (match) {
    return [match[1], `#${match[2]}`]
  }
  return undefined
}

function extractIcon(line: string): [string, string] | undefined {
  const match = matchRegex(line, /(\w+_ICON)="(\w+)"/)
  if (match) {
    return [match[1], match[2]]
  }
  return undefined
}

function extractSetting(line: string, settingsKeys: string[]): [string, string] | undefined {
  const regex = new RegExp(`^\\s*(${settingsKeys.join('|')})="(\\w+)"`)
  const match = matchRegex(line, regex)
  if (match) {
    return [match[1], match[2]]
  }
  return undefined
}

export function parseOcodoZshTheme(fileContents: string): ZotePreset {
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
