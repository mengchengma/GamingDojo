# Spec & hardware images

Drop product / station photos in this folder. They render inside the **Stations** section (`#stations`).

## Currently wired up

| File | Where it shows up |
|---|---|
| `pc-tower.jpg` | **Hero image** at the top of the Stations section (full-width, 21:9 on desktop) |

When you save the file, the placeholder card ("Drop pc-tower.jpg in /public/specs/") disappears automatically and the photo takes over.

## Recommended filenames (for future expansion)

If you want to add photos to the individual spec cards later, use these slugs and I can wire them up the same way:

| File | Card |
|---|---|
| `rtx-5070.jpg` | Primary loadout / GPU |
| `msi-276cxf.jpg` | Monitor |
| `g413-se.jpg` | Logitech G413 SE keyboard |
| `g502.jpg` | Logitech G502 mouse |
| `g432.jpg` | Logitech G432 headset |
| `g-xl.jpg` | Logitech G XL mousepad |
| `xbox-x.jpg` | Xbox Series X |
| `ps5.jpg` | PlayStation 5 |
| `switch.jpg` | Nintendo Switch |

## File specs

- **Format:** JPG or WebP (WebP is ~30% smaller at the same quality)
- **Hero image** (`pc-tower.jpg`): wide landscape — 1600×900 or larger. Will be cropped to 21:9 on desktop and 16:9 on mobile via `object-cover`.
- **Product shots** (peripherals, consoles, monitor): 800–1200 px wide minimum. 4:3 landscape works for most; square works for consoles.
- **Background:** keep the photo's background dark to blend with the navy section bg — or transparent PNG if you want the product to float.
- **Filenames:** lowercase, hyphenated. The component looks up exact filenames.

## Adding more wired-up images

If you want me to wire up additional spec cards (peripherals, monitor, consoles, GPU) once you have photos:

1. Save the file with the exact slug above
2. Ping me "wire up the {keyboard/monitor/etc.} image" and I'll add it to the card
