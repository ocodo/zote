import { nerdFontGlyphs } from "@/data/nerd-font-glyphs"
import {
  nerdFontIconGroupPrefixes,
  nerdFontIconGroups,
  extractGlyphPrefix
} from "@/data/nerd-font-search"

describe("nerdFontIconGroupPrefixes", () => {
  it("should report unmapped glyph prefixes for developer awareness", () => {
    const allPrefixes = new Set(
      Object.keys(nerdFontGlyphs)
        .map(extractGlyphPrefix)
        .filter(Boolean)
    )

    const mappedPrefixes = new Set(Object.keys(nerdFontIconGroupPrefixes))
    const unmappedPrefixes = [...allPrefixes].filter(p => !mappedPrefixes.has(p))

    if (unmappedPrefixes.length > 0) {
      console.warn(
        `⚠️ ${unmappedPrefixes.length} unmapped glyph prefixes:\n`,
        unmappedPrefixes.join(", ")
      )
    }

    expect(Array.isArray(unmappedPrefixes)).toBe(true)
  })

  it("should map prefix strings to valid Nerd Font icon groups", () => {
    expect(typeof nerdFontIconGroupPrefixes).toBe("object")

    for (const [prefix, group] of Object.entries(nerdFontIconGroupPrefixes)) {
      expect(typeof prefix).toBe("string")
      expect(typeof group).toBe("string")
      expect(Object.keys(nerdFontIconGroups)).toContain(group)
    }
  })

  it("should include expected known prefixes", () => {
    const expected: Record<string, string> = {
      "fa-": "Font Awesome",
      "dev-": "Devicons",
      "md-": "Material Design Icons",
      "oct-": "Octicons"
    }

    for (const [prefix, expectedGroup] of Object.entries(expected)) {
      expect(nerdFontIconGroupPrefixes[prefix]).toBe(expectedGroup)
    }
  })

  it("should cover at least one prefix for each defined icon group", () => {
    // The Nerd Font maintainers do not have complete access / time
    // so there are some documented errors to work around,
    // and gather information for project feedback.
    const knownExclusions = [
      "Heavy Angle Brackets",
      "Box Drawing"
    ]

    const coveredGroups = new Set(Object.values(nerdFontIconGroupPrefixes).sort())

    for (const group of Object.keys(nerdFontIconGroups)) {
      if (!knownExclusions.includes(group)) {
        expect(coveredGroups.has(group)).toBe(true)
      }
    }
  })
})
