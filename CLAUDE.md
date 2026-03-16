# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static site for Times Up Bike Co-Op, built with Astro 5. The site promotes pedal-powered mutual aid and provides information about the bike co-op's schedule, location, events, and parts catalog.

## Development Commands

```bash
# Development server (http://localhost:4321)
npm run dev

# Development server but allow access for other devices on network
npm run dev -- --host

# Production build (outputs to dist/)
npm run build

# Preview production build locally
npm run preview
```

## Architecture

### Tech Stack
- **Framework**: Astro 5 with MDX support
- **Styling**: Tailwind CSS 4 (via @tailwindcss/vite)
- **CMS**: TinaCMS for content management
- **Deployment**: Git-based deployment via git-gateway backend

### Content Management

Content is managed through TinaCMS and stored as JSON files in `src/content/`:
- `home.json` - Hero, schedule, overview, location, join, and contact sections
- `pics.json` - Photo gallery for the pics page
- `spoke_cards.json` - Spoke cards, stickers, and zines gallery
- `tools.json` - Tools locator with descriptions and locations
- `events.json` - Events listing.  Currently not used.
- `parts.json` - Parts catalog.  Currently not used.
- `about.json` - About page content.  Currently not used.

The CMS is configured in `tina/config.ts` and accessible at `/admin` when running the dev server.

### Project Structure

```
src/
├── components/     # Astro components (Home.astro, Pics.astro, SpokeCards.astro, Tools.astro, etc.)
├── content/        # JSON content files managed by Decap CMS
├── layouts/        # Layout.astro - shared header/footer/navigation
├── pages/          # Route pages (index, pics, spoke_cards, tools)
└── styles/         # global.css

public/
├── admin/          # TinaCMS admin UI (generated)
├── llms.txt        # LLM-readable site summary
└── robots.txt      # Search engine directives
```

### Key Patterns

**Content-Component Pattern**: Each page has a corresponding component (e.g., `Home.astro`) that imports and renders its JSON content file. Pages in `src/pages/` are minimal wrappers around these components.

**Text Linkification**: The `Home.astro` component includes a `linkifyText()` function that automatically converts email addresses and specific keywords (like "Membership Page") into clickable links when rendering content.

**Layout**: All pages use `Layout.astro` which provides:
- Sticky header with logo and navigation
- Main content slot
- Footer with social links and organization description

**Styling**: Component styles are scoped within `<style>` blocks in `.astro` files. Global styles and CSS custom properties (like `--site-gradient`) are defined in `Layout.astro`.

## Content Editing

To edit content, run the dev server and navigate to `http://localhost:4321/admin`. Changes made through TinaCMS are saved to JSON files in `src/content/`. The TinaCMS schema is defined in `tina/config.ts`.

Email addresses in content are automatically linked when rendered on the site.
