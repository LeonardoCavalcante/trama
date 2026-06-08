# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Static institutional website for the TRAMA laboratory. Plain HTML + CSS + vanilla JS — no build step, no package manager, no framework. Content is in Portuguese (pt-BR).

## Running locally

Open `index.html` directly in a browser, or serve the directory with any static server (e.g. VS Code Live Server). There are no build, lint, or test commands.

## Architecture

- `index.html` — landing page. Each section under `pages/` is its own standalone HTML file (`sobre.html`, `projetos.html`, `pessoas.html`, `parceiros.html`, `publicacoes.html`, `infraestrutura.html`, `planejamento.html`, `blog.html`). Cross-page navigation is hardcoded `<a href="pages/...">` — no router.
- `assets/css/` is loaded in a fixed order across every page: `reset.css` → `variables.css` → `style.css` → `responsive.css`. Global design tokens (colors, radii, shadow, container width) live only in `variables.css`; prefer adding/adjusting tokens there over hardcoding values. The current palette uses `--brand` (green) and `--rose` (pink accent).
- `assets/js/main.js` is a single script attached to every page. It handles: mobile nav toggle + dropdown sync (with a 980px media-query breakpoint), the blog category filter, and the blog "destaque da semana" feature. There is no module system — everything runs at top level guarded by `if (element)` null-checks so the same script is safe to include on pages that lack those elements.

## Blog system (no backend)

The blog is driven entirely by HTML data attributes that `assets/js/main.js` reads:

- Posts are individual HTML files in `pages/blog/posts/` (kebab-case filenames). Cards for them live in `pages/blog.html` inside `.blog-grid`.
- **Filter**: add a button under `.blog-tags` with `data-filter="<slug>"`, and tag matching cards with `data-category="<slug>"`. Allowed category slugs: `mobilidade-urbana`, `pavimentacao`, `logistica`, `qualidade-do-ar`, `extensao`.
- **Featured post of the week**: add `data-featured="true"` to a single card in `.blog-grid`. The JS finds it and renders it into the featured area. Removing the attribute reverts it to a normal card.
- `templates/blog-publicacao-template.md` is the editorial template the team fills in before producing the final post HTML — it is not consumed by any build process.

## Conventions

- Content language is Portuguese; preserve pt-BR copy and accents when editing.
- Keep changes consistent with the no-build, no-dependency model — do not introduce bundlers, frameworks, or package managers unless explicitly requested.
- Responsive rules live in `responsive.css`; the mobile breakpoint used by the nav JS is `980px`.

## Additional docs

- `README.md` — publication workflow and checklists for the blog.
- `docs/guia-manutencao-repositorio.md` — repository maintenance / collaboration guide (git workflow for non-developers).
