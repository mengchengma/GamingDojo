# Game cover art

Drop game cover images in this folder, then reference them from
[`components/sections/games.tsx`](../../components/sections/games.tsx) by adding
an `image` field to the matching entry in `ROW_1` or `ROW_2`.

## Example

1. Save a cover image as `public/games/valorant.jpg`
2. In `games.tsx`, update the Valorant entry:

```ts
{ title: "Valorant", genre: "Tactical FPS", platforms: ["PC"], hot: true,
  image: "/games/valorant.jpg" },
```

That's it. The marquee will use the real image instead of the placeholder
gradient.

## Recommended specs

- **Aspect ratio:** roughly 4:5 (portrait) — matches the card frame, so no
  awkward cropping
- **Resolution:** at least 480×600 px (1080×1350 ideal for retina)
- **Format:** `.jpg` for photos / `.webp` for smaller file size / `.png` if
  the art has transparency you want to keep
- **Filename:** lowercase, hyphenated — e.g. `super-smash-bros.jpg`,
  `gta-v.jpg`, `baldurs-gate-3.jpg`

## What's the placeholder?

Until you add images, each card renders a colored gradient + the game's first
letter + a controller icon. The gradient cycles through 6 flavors so adjacent
cards look distinct. It's intentional that they look like "placeholder cards"
so it's obvious they need real art.

## Where the images appear

The Games section renders **two rows** scrolling in opposite directions. The
images live inside the rotating cards — hover any row to pause it.
