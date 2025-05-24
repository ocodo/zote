import {
  getGlyphGroupRange,
  searchNerdFontByName,
  getGlyphGroup,
  NerdFontGlyphs,
  nerdSearchDebounced,
  NerdFontSearchResult
} from "@/data/nerd-font-search"
import { nerdFontGlyphs } from "@/data/nerd-font-glyphs"

describe("nerdSearchDebounced", () => {
  jest.useFakeTimers()
  let setterMock: jest.Mock

  beforeEach(() => {
    setterMock = jest.fn()
  })

  afterEach(() => {
    jest.clearAllTimers()
    jest.clearAllMocks()
  })

  it("calls setter with results after debounce delay (no group)", () => {
    nerdSearchDebounced("weather-day", undefined, setterMock)

    // Fast calls should not trigger yet
    expect(setterMock).not.toHaveBeenCalled()

    // Advance time past debounce delay
    jest.advanceTimersByTime(400)

    expect(setterMock).toHaveBeenCalledTimes(1)
    const results = setterMock.mock.calls[0][0]
    expect(Array.isArray(results)).toBe(true)
    expect(results.length).toBeGreaterThan(0)
    expect(results[0]).toHaveProperty("name")
    expect(results[0]).toHaveProperty("char")
  })

  it("calls setter with filtered results when group is specified", () => {
    const group: [string, string] = ["e300", "e3e3"] // Weather group

    nerdSearchDebounced("weather-", group, setterMock)
    jest.advanceTimersByTime(400)

    expect(setterMock).toHaveBeenCalledTimes(1)
    const results = setterMock.mock.calls[0][0]
    expect(results.length).toBeGreaterThan(0)
    results.forEach((r: NerdFontSearchResult) => {
      expect(r.code >= group[0] && r.code <= group[1]).toBe(true)
    })
  })

  it("does not call setter if called repeatedly before delay ends", () => {
    nerdSearchDebounced("fa-", undefined, setterMock)
    jest.advanceTimersByTime(200)
    nerdSearchDebounced("fa-user", undefined, setterMock)
    jest.advanceTimersByTime(200) // still not full 400ms since last call

    expect(setterMock).not.toHaveBeenCalled()

    jest.advanceTimersByTime(200) // now we pass 400ms after last call
    expect(setterMock).toHaveBeenCalledTimes(1)
  })
})

describe("nerd-font-search module", () => {
  describe("getGlyphGroupRange", () => {
    it("returns correct range for a known group", () => {
      const range = getGlyphGroupRange("Font Awesome")
      expect(Array.isArray(range)).toBe(true)
      expect(range.length).toBeGreaterThan(0)
      expect(range[0]).toEqual(expect.arrayContaining(["ed00", "f1ff"]))
    })

    it("returns an empty array for an unknown group", () => {
      const range = getGlyphGroupRange("Unknown Group")
      expect(range).toEqual([])
    })
  })

  describe("getGlyphGroup", () => {
    it("returns correct group name for a known code", () => {
      const result = getGlyphGroup("f400")
      expect(result).toBe("Octicons")
    })

    it("returns undefined for a code not in any range", () => {
      const result = getGlyphGroup("9999")
      expect(result).toBeUndefined()
    })
  })

  describe("searchNerdFontByName", () => {
    const mockGlyphs: NerdFontGlyphs = {
      "fa-user": { code: "f007", char: "" },
      "fa-car": { code: "f1b9", char: "" },
      "md-home": { code: "f1001", char: "󱀁" },
    }

    it("returns matches by name substring", () => {
      const results = searchNerdFontByName("user", undefined, mockGlyphs)
      expect(results).toHaveLength(1)
      expect(results[0]).toMatchObject({
        name: "fa-user",
        code: "f007",
        group: "Font Awesome"
      })
    })

    it("returns matches within specified group range", () => {
      const results = searchNerdFontByName("fa-", ["f000", "f200"], mockGlyphs)
      expect(results).toHaveLength(2)
      expect(results.every(r => r.name.startsWith("fa-"))).toBe(true)
    })

    it("excludes results outside the specified group range", () => {
      const results = searchNerdFontByName("md-", ["f000", "f0ff"], mockGlyphs)
      expect(results).toHaveLength(0)
    })
  })

  describe("integration with nerdFontGlyphs", () => {
    it("finds a known real glyph", () => {
      const results = searchNerdFontByName("weather-day_cloudy", undefined, nerdFontGlyphs)
      expect(results.length).toBeGreaterThan(0)
      expect(results[0].name).toContain("weather-day_cloudy")
    })

    it("returns correct group from real data", () => {
      const result = searchNerdFontByName("pl-", undefined, nerdFontGlyphs)
      expect(result.length).toBeGreaterThan(0)
      result.forEach(g => {
        expect(g.group).toMatch(/Powerline/)
      })
    })
  })
})
