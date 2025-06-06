import { searchStrings } from "@/data/asterix-search"

describe(`AsteriskSearch: searchStrings Function`, () => {
  describe(`Valid Patterns`, () => {
    const strings = ["apple", "banana", "cherry", "date", "elderberry"]

    it(`should match single asterisk patterns correctly`, () => {
      expect(searchStrings("*", strings)).toEqual(strings)
    })

    it(`should match prefix with asterisk pattern correctly`, () => {
      expect(searchStrings("*ple", ["apple"])).toHaveLength(1)
      expect(searchStrings("*banana", ["banana"])).toHaveLength(1)
    })

    it(`should match infix with multiple wildcards correctly`, () => {
      const result = searchStrings("a*e", strings)
      expect(result).toContainEqual("apple")
      expect(result).not.toContain("banana")
      expect(result).not.toContain("cherry")
    })

    it(`should match suffix with asterisk pattern correctly`, () => {
      const result = searchStrings("*erry", ["cherry"])
      expect(result).toHaveLength(1)
    })
  })
})
