# Lessons Learned

## 2026-03-15 External Agent Repos

- When the user points to an external agent repository and asks to use those agents, do not approximate from the hosted files if local installation is feasible.
- Install the referenced agent repo locally first, then use the local agent definitions as the operating source of truth for the task.

## 2026-03-11 Brand Direction Corrections

- When a user provides a visual reference asset, inspect that asset before making or extending a styling pass.
- For brand-sensitive UI work, treat concrete imagery in `brand_resources/` as higher priority than inferred aesthetic direction from copy or repo themes.

## 2026-03-11 Product Style Source Priority

- When the user asks to match the style of an existing product, inspect that product's real UI implementation before styling the destination site.
- For ecosystem consistency, production app styles outrank moodboard-like brand references unless the user explicitly says otherwise.

## 2026-03-12 Portfolio Restraint

- For personal or portfolio landing pages, do not equate "more interactive" with more simultaneous widgets, filters, and motion.
- Increase interaction density only when it sharpens comprehension; if the page starts competing with its own content, simplify the hierarchy first.

## 2026-03-12 TUI Requests

- When the user asks for a TUI-style website, treat it as an application-shell request, not just a visual-theme request.
- A convincing web TUI needs pane-based navigation, session/status framing, keyboard-aware interactions, and terminal-style information density.

## 2026-03-12 TUI Palette Assumptions

- A TUI request does not imply a green phosphor palette by default.
- Separate the shell architecture from the color decision: keep the terminal framing, then choose a palette that fits the product brand unless the user explicitly asks for retro terminal green.

## 2026-03-12 Exact Reference Requests

- When the user says a site should be exactly like a specific reference, match the reference architecture first, not just its aesthetic category.
- For a reference-driven frontend rebuild, inspect the target site’s actual interaction model before implementing: layout, command flow, prompt behavior, and content reveal pattern all matter.

## 2026-03-12 Visual Parity Claims

- Do not assume a reference match is finished after the first rebuild. Run a literal visual parity pass against the source and close the concrete gaps that remain.
- For terminal-style reference sites, small details like legal-link wording, startup status lines, disclosure arrows, command-search states, and mobile fallback behavior materially affect whether the design feels like-for-like.

## 2026-03-12 Identity Surfaces

- When a reference-driven rebuild includes top-level legal or identity surfaces, replace borrowed labels and placeholder pages with owned content before considering the design stable.
- Shared palette work should be done at the token level first; that keeps the shell intact while making the site feel distinct immediately across both the main page and auxiliary pages.

## 2026-03-12 Mobile Fallbacks

- A reference-style mobile blocker is not acceptable once the user expects the site to work on phones; mobile notes should guide, not prevent use.
- For terminal-style sites, fix mobile by preserving the shell and reducing friction, not by gating the whole interface behind an overlay.
