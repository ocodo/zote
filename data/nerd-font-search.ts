import { nerdFontGlyphs } from "@/data/nerd-font-glyphs"
import { debounce } from "@/lib/debounce"
import { asterixMatch } from "@/data/asterix-search"

export type NerdFontGlyph = {
  code: string
  char: string
}

export type NerdFontGlyphs = {
  [key: string]: NerdFontGlyph
}

export type NerdFontHexRange = [string, string] | [string]

export type NerdFontIconGroupsType = {
  [group: string]: NerdFontHexRange[]
}

export type NerdFontSearchResult = {
  code: string
  char: string
  name: string
  group?: string
}

export const nerdFontIconGroups: NerdFontIconGroupsType = {
  "Seti-UI + Custom": [["e5fa", "e6b7"]],
  "Devicons": [["e700", "e8ef"]],
  "Font Awesome": [
    ["ed00", "f1ff"],
    ["f220", "f2ff"]
  ],
  "Font Awesome Extension": [["e200", "e2a9"]],
  "Material Design Icons": [["f0001", "f1af0"]],
  "Weather": [["e300", "e3e3"]],
  "Octicons": [
    ["f400", "f533"],
    ["2665"],
    ["26a1"]
  ],
  "Powerline Symbols": [
    ["e0a0", "e0a2"],
    ["e0b0", "e0b3"]
  ],
  "Powerline Extra Symbols": [
    ["e0a3"],
    ["e0b4", "e0c8"],
    ["e0ca"],
    ["e0cc", "e0d7"]
  ],
  "IEC Power Symbols": [
    ["23fb", "23fe"],
    ["2b58"]
  ],
  "Font Logos": [["f300", "f381"]],
  "Pomicons": [["e000", "e00a"]],
  "Codicons": [["ea60", "ec1e"]],
  "Heavy Angle Brackets": [["276c", "2771"]],
  "Box Drawing": [["2500", "259f"]],
  "Progress": [["ee00", "ee0b"]]
}

export const nerdFontIconGroupPrefixes = getPrefixGroupMap(nerdFontGlyphs, nerdFontIconGroups);

/**
 * Builds a lookup table from hex character code (lowercased) to group name.
 */
export function buildCodeToGroupMap(
  groups: NerdFontIconGroupsType
): Record<string, string> {
  const codeToGroup: Record<string, string> = {}

  for (const [groupName, ranges] of Object.entries(groups)) {
    for (const range of ranges) {
      if (range.length === 1) {
        codeToGroup[range[0].toLowerCase()] = groupName
      } else {
        const [start, end] = range
        const startInt = parseInt(start, 16)
        const endInt = parseInt(end, 16)
        const padLength = Math.max(start.length, end.length)

        for (let i = startInt; i <= endInt; i++) {
          const hex = i.toString(16).padStart(padLength, "0")
          codeToGroup[hex.toLowerCase()] = groupName
        }
      }
    }
  }

  return codeToGroup
}

/**
 * Extracts the prefix (before the first "-") from a glyph name, adding a trailing dash.
 */
export function extractGlyphPrefix(name: string): string {
  return name.includes("-") ? name.split("-")[0] + "-" : ""
}

/**
 * Returns a mapping of prefix strings (e.g., "ple-") to their group name
 * by comparing glyph codes with the provided icon group ranges.
 */
export function getPrefixGroupMap(
  glyphs: NerdFontGlyphs,
  groups: NerdFontIconGroupsType
): Record<string, string> {
  const codeToGroup = buildCodeToGroupMap(groups)
  const prefixToGroup: Record<string, string> = {}

  for (const [name, glyph] of Object.entries(glyphs) as [string, NerdFontGlyph][]) {
    const prefix = extractGlyphPrefix(name)
    const group = codeToGroup[glyph.code.toLowerCase()]
    if (group && !(prefix in prefixToGroup)) {
      prefixToGroup[prefix] = group
    }
  }

  return prefixToGroup
}

export type NerdFontSearchResults = NerdFontSearchResult[]

/**
 * Returns the Unicode hex ranges for a given Nerd Font icon group.
 * @param {string} groupName - The name of the icon group (e.g., "Font Awesome").
 * @returns {NerdFontHexRange[]} An array of hex ranges (start, end) for the specified group.
 */
export function getGlyphGroupRange(groupName: string): NerdFontHexRange[] {
  return nerdFontIconGroups[groupName] || []
}

/**
 * Searches for glyphs based on a Unicode hex code or a partial match query.
 * Optionally restricts the search to a specific group of glyphs.
 * @param {string} query - The query string (e.g., hex code or substring).
 * @param {NerdFontHexRange} [group] - The optional group of glyphs to limit the search to.
 * @param {NerdFontGlyphsType} [data] - The glyph data to search (defaults to NerdFontGlyphs).
 * @returns {NerdFontSearchResults} An array of matching glyph search results.
 */
export function searchNerdFontByName(
  query: string,
  group?: NerdFontHexRange,
  data: NerdFontGlyphs = nerdFontGlyphs
): NerdFontSearchResults {
  const results: NerdFontSearchResults = []

  for (const key in data) {
    if (query.length > 0 && asterixMatch(query, key)) {
      const glyph = data[key]

      if (group) {
        const [start, end] = group.length === 2 ? group : [group[0], group[0]]
        if (!(glyph.code >= start && glyph.code <= end)) {
          // Skip this glyph if it doesn't fall within the range
          continue
        }
      }

      results.push({
        name: key,
        code: glyph.code,
        char: glyph.char,
        group: getGlyphGroup(glyph.code)
      })
    }
  }

  return results
}

export const nerdSearchDebounced = debounce(
  (query, group, setter) => {
    if (group) {
      setter(searchNerdFontByName(query, group))
    } else {
      setter(searchNerdFontByName(query))
    }
  }
  , 400)

/**
 * Returns the name of the Nerd Font icon group to which the given Unicode hex code belongs.
 * If the code does not match any group, returns `undefined`.
 * @param {string} code - The Unicode hex code (e.g., "f400") to look up.
 * @returns {string | undefined} The name of the icon group or `undefined` if not found.
 */
export function getGlyphGroup(code: string): string | undefined {
  const hexCode = code.toLowerCase();

  for (const group in nerdFontIconGroups) {
    const ranges = nerdFontIconGroups[group];

    for (const range of ranges) {
      const [start, end] = range.length === 2 ? range : [range[0], range[0]];

      if (hexCode >= start && hexCode <= end) {
        return group;
      }
    }
  }

  return undefined;
}
