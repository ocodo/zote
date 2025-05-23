import { NerdFontGlyphs } from '@/data/nerd-font-glyphs'

export const searchNerdFontGlyphNames = (name: string) => Object
  .keys(NerdFontGlyphs)
  .filter(
    (key) => key.includes(name)
  )

// Define types for Glyph data
interface Glyph {
  char: string;
  code: string;
}

// Define types for ranges as either a single codepoint or a start/end range
type Range = [string] | [string, string];

// Define the shape of the NerdFontGlyphs data
interface GlyphData {
  [key: string]: Glyph;
}

// Function to get glyph data from a set of ranges
export function getGlyphDataFromRanges(ranges: Range[], data: GlyphData = NerdFontGlyphs): { name: string, char: string, code: string }[] {
  const result: { name: string, char: string, code: string }[] = [];

  // Iterate over each range in the collection
  for (const range of ranges) {
    // Handle single codepoint
    if (range.length === 1) {
      const codepoint = range[0];
      const glyphName = findGlyphNameByCodepoint(data, codepoint);

      if (glyphName) {
        const glyph = data[glyphName];
        if (glyph) {
          result.push({
            name: glyphName,
            char: glyph.char,
            code: codepoint,  // Keep code as string
          });
        }
      }
    }
    // Handle range of codepoints
    else {
      const [start, end] = range;

      for (let codepoint = parseInt(start, 16); codepoint <= parseInt(end, 16); codepoint++) {
        const hexCode = codepoint.toString(16).padStart(4, '0'); // Convert codepoint to hex string
        const glyphName = findGlyphNameByCodepoint(data, hexCode);

        if (glyphName) {
          const glyph = data[glyphName];
          if (glyph) {
            result.push({
              name: glyphName,
              char: glyph.char,
              code: hexCode,  // Keep code as string
            });
          }
        }
      }
    }
  }

  return result;
}

// Helper function to find the name of the glyph by its codepoint
function findGlyphNameByCodepoint(data: GlyphData, codepoint: string): string | undefined {
  return Object.keys(data).find(name => data[name].code === codepoint);
}
