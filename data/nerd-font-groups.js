export const NerdFontIconGroups = {
  "Seti-UI + Custom": [["e5fa", "e6b7"]],
  "Devicons": [["e700", "e8ef"]],
  "Font Awesome": [
    // First valid range from ed00 to f1ff
    ["ed00", "f1ff"],
    // Second valid range from f220 to f2ff (skipping gaps)
    ["f220", "f2ff"]
  ],
  "Font Awesome Extension": [["e200", "e2a9"]],
  "Material Design Icons": [["f0001", "f1af0"]],
  "Weather": [["e300", "e3e3"]],
  "Octicons": [
    // Range from f400 to f533
    ["f400", "f533"],
    // Single code points 2665 and 26a1
    ["2665"], // Single-point as an array
    ["26a1"]  // Single-point as an array
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
};


export function getGlyphGroup(code) {
  const hexCode = code.toLowerCase();  // Ensure it's in lowercase

  // Loop through each group in the NerdFontIconGroups table
  for (const group in NerdFontIconGroups) {
    const ranges = NerdFontIconGroups[group];

    // Check each range for the group
    for (const range of ranges) {
      const [start, end] = range.length === 2 ? range : [range[0], range[0]]; // Handle single-point range

      // Check if the hexCode falls within the range or if it's a single-point match
      if (hexCode >= start && hexCode <= end) {
        return group; // Return the group when the code is in the range or matches the single-point
      }
    }
  }

  return "Unknown"; // Return "Unknown" if no group is found
}
