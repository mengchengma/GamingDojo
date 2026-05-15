# Partner / sponsor logos

Drop transparent partner logos in this folder, then reference them from the
`PARTNERS` array in [`components/sections/partners.tsx`](../../components/sections/partners.tsx)
by adding an `image` field to the matching entry.

## Example

1. Save a transparent logo as `public/partners/red-bull.svg` (or `.png`)
2. In `partners.tsx`, update the Red Bull entry:

```ts
{ name: "Red Bull", tagline: "Wings on tap", accent: "#cc1e2f",
  image: "/partners/red-bull.svg" },
```

That's it. The marquee will replace the stylized "RED BULL" text placeholder
with the real logo.

## Recommended specs

- **Format:** SVG ideal (scales perfectly). PNG with transparent background
  also works.
- **Aspect ratio:** roughly 4:3 (landscape) — fits the card frame without
  awkward letterboxing
- **Resolution:** SVG = any. PNG = at least 800×600 px for retina
- **Background:** transparent — the card has a dark navy bg (light theme:
  cream) that the logo should blend into
- **Color:** prefer a single-color logo in white or cream — that way it
  works on both light and dark themes. If the brand requires its full-color
  logo, that's fine too.
- **Filename:** lowercase, hyphenated — e.g. `red-bull.svg`,
  `monster-energy.svg`, `c4-energy.svg`, `logitech-g.svg`

## How the placeholder works

Until you add images, each card renders:
- A **brand-color accent stripe** at the top (uses the `accent` hex from the
  partner entry)
- A **soft brand-color halo** glowing behind the logo area
- The **brand name in stylized display type** as a stand-in for the logo

It's intentional that the placeholder shows the brand name — so the section
is fully functional and on-brand even before any logo files arrive.

## Adding / removing partners

Just edit the `PARTNERS` array in `partners.tsx`:

```ts
const PARTNERS: Partner[] = [
  { name: "Red Bull", tagline: "Wings on tap", accent: "#cc1e2f" },
  // add, remove, reorder freely — the marquee adapts.
];
```

If you add many more (10+), the marquee will get crowded. Either:
- Bump the `duration={50}` prop higher to slow it down, or
- Add a second `<MarqueeRow>` with `reverse` (same pattern as the Games
  section, see `games.tsx` for reference)
