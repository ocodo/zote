# Nerd Font Codepoints for iconsets

Source of data: https://raw.githubusercontent.com/ryanoasis/nerd-fonts/refs/heads/master/glyphnames.json

### **Nerd Font Icon Glyph Sets**

1. **Seti-UI + Custom**: `e5fa` - `e6b7`
2. **Devicons**: `e700` - `e8ef`
3. **Font Awesome**: `ed00` - `f2ff` (with two gaps: `f200` - `f21f` and `f240` - `f25f`)
4. **Font Awesome Extension**: `e200` - `e2a9`
5. **Material Design Icons**: `f0001` - `f1af0`
6. **Weather**: `e300` - `e3e3`
7. **Octicons**: `f400` - `f533`, `2665`, `26A1`
8. **Powerline Symbols**: `e0a0` - `e0a2`, `e0b0` - `e0b3`
9. **Powerline Extra Symbols**: `e0a3`, `e0b4` - `e0c8`, `e0ca`, `e0cc` - `e0d7`
10. **IEC Power Symbols**: `23fb` - `23fe`, `2b58`
11. **Font Logos**: `f300` - `f381`
12. **Pomicons**: `e000` - `e00a`
13. **Codicons**: `ea60` - `ec1e`
14. **Heavy Angle Brackets**: `276c` - `2771`
15. **Box Drawing**: `2500` - `259f`
16. **Progress**: `ee00` - `ee0b`

### **Note on the Two Gaps in Font Awesome Code Point Range**

The **Font Awesome** code point range `ed00` - `f2ff` contains **two gaps** where icons are not assigned to any code points:

1. **Gap 1**: `f200` - `f21f`

   * This range is **unassigned** and does not contain any icons.
2. **Gap 2**: `f240` - `f25f`

   * This range is also **unassigned** and does not contain any icons.

These gaps in the code point range are reserved but not utilized, meaning that icons from **`f200` to `f21f`** and **`f240` to `f25f`** are not mapped to any glyphs. This is a common practice in icon sets to allow for future expansion or to avoid conflicts with other reserved or private use code points.

For example, to enumerate the range in JS:

```
const startRange = 0xed00;
const endRange = 0xf2ff;

// Define the two gaps
const gap1Start = 0xf200;
const gap1End = 0xf21f;
const gap2Start = 0xf240;
const gap2End = 0xf25f;

for (let codePoint = startRange; codePoint <= endRange; codePoint++) {
  // Skip the gaps
  if ((codePoint >= gap1Start && codePoint <= gap1End) || (codePoint >= gap2Start && codePoint <= gap2End)) {
    continue;
  }

  // Output the code point (in hex format)
  console.log(`0x${codePoint.toString(16).toUpperCase()}`);
}

```
### String.fromCodepoint

Generate a string from a unicode codepoint...

```
const codePoint = 0xf400;  // Unicode code point
const glyph = String.fromCodePoint(codePoint);
console.log(glyph); // will need to use a Nerd Font, it's the first Octicon glyph
```

To get the **code point** of a **glyph** (character) in a string, you can use **`charCodeAt()`** or **`codePointAt()`**, depending on whether you want to work with a **single code unit** or a **full code point** (for characters outside the Basic Multilingual Plane or emoji).

### **1. Using `charCodeAt()`**

The method `charCodeAt()` returns the **UTF-16 code unit** at a given position. This works for characters that are **within the BMP** (Unicode characters with code points between `0x0000` and `0xFFFF`).

```typescript
const str = "A";  // A single character string
const codeUnit = str.charCodeAt(0);  // Get the code unit of the first character
console.log(codeUnit.toString(16).toUpperCase());  // Output: 41 (A's code unit in hex)
```

#### **Note**:

* **`charCodeAt()`** returns a **16-bit value** (UTF-16 code unit).
* For characters outside the BMP (e.g., emoji), it may return **the high surrogate** (half of the surrogate pair).

### **2. Using `codePointAt()`**

If you're working with characters that may be **outside the BMP** (like emoji, or characters requiring surrogate pairs), you should use `codePointAt()`, which provides the **full code point**.

```typescript
const str = "😀";  // A character outside the BMP (emoji)
const codePoint = str.codePointAt(0);  // Get the full code point
console.log(codePoint.toString(16));  // Output: 1F600 (Unicode for "Grinning Face" emoji)
```

#### **Explanation**:

* **`codePointAt()`** returns the **full Unicode code point** (not just the code unit).
* It handles characters that are encoded using **surrogate pairs** in UTF-16, like emoji and some other special characters.

### **Difference between `charCodeAt()` and `codePointAt()`**:

* **`charCodeAt()`**: Returns a **16-bit code unit** (useful for BMP characters).
* **`codePointAt()`**: Returns a **32-bit Unicode code point** (useful for any character, including those outside the BMP).

### **Example: Using `codePointAt()` for a string with multiple characters**

```typescript
const str = "A😀";  // String with a BMP character and an emoji

// Get the code point of the first character
const firstGlyphCodePoint = str.codePointAt(0);
console.log(firstGlyphCodePoint.toString(16).toUpperCase());  // Output: 41 (A's code point)

// Get the code point of the second character (emoji)
const secondGlyphCodePoint = str.codePointAt(1);
console.log(secondGlyphCodePoint.toString(16).toUpperCase());  // Output: 1F600 (Grinning Face emoji code point)
```

### **Summary**

* Use **`charCodeAt()`** if you're only dealing with characters within the **Basic Multilingual Plane** (BMP) or when you're working with **16-bit code units**.
* Use **`codePointAt()`** for **all characters**, including those outside the BMP, such as **emoji** or **surrogate pairs**.

