# Gaming Dojo

Marketing site for **Gaming Dojo**, a gaming café in Flushing, NYC. Built as a single long-form landing page with sections for pricing, passes, stations, food, hours, events, and visit info.

> 36-29 Main St, Flushing, NY 11354 · 3 min from the 7 train

## Tech Stack

- [Next.js 15](https://nextjs.org/) (App Router) + React 19
- TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) for animation
- [lucide-react](https://lucide.dev/) for icons
- [Spline](https://spline.design/) for 3D embeds

## Getting Started

Requires Node.js 18.18+ (Node 20+ recommended).

```bash
npm install
npm run dev
```

The dev server runs on [http://localhost:4000](http://localhost:4000).

## Scripts

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Start the dev server on port 4000    |
| `npm run build` | Build the production bundle          |
| `npm run start` | Run the production build on port 4000 |

## Project Structure

```
app/
  page.tsx              # Home page — composes all sections
  layout.tsx
components/
  sections/             # Page sections (hero, pricing, passes, location, …)
  ui/                   # Reusable primitives (button, card, modal, …)
lib/
  utils.ts
public/                 # Static assets (logos, partner marks, game art)
```

Each section in [app/page.tsx](app/page.tsx) maps to one file under [components/sections/](components/sections/).

## Deployment

The site is configured to deploy on [Vercel](https://vercel.com/). Push to `main` and Vercel will build and deploy automatically.

## License

Private project. All rights reserved.
