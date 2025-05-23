# Get Nerd Font glyph database

```
#!/bin/bash

curl -s https://raw.githubusercontent.com/ryanoasis/nerd-fonts/refs/heads/master/glyphnames.json \
  | jq -r 'to_entries | map(select(.key != "METADATA")) | .[] | "\"\(.key)\": \(.value | @json),"' \
  | sed 's/^/  /' \
  | awk 'BEGIN {print "export const NerdFontGlyphs = {"} {print} END {print "}"}' \
  > nerd-font-glyphs.js
```

Make this a script if it's needed often
