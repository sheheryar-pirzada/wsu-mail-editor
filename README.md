# WSU Newsletter Editor (V7)

A Flask-based web editor for composing email-safe HTML newsletters (Friday Focus and Graduate School Briefing). The editor renders live previews with robust, client-friendly HTML and email-safe inline styles.

## Features
- Friday Focus (FF) and Graduate School Briefing templates
- Sections and cards with rich text, events, resources, and CTA cards
- Generic submit section key submit_request (blank title) for both templates
  - FF CTA links to https://gradschool.wsu.edu/request-for-ff-promotion/
  - Briefing CTA links to https://gradschool.wsu.edu/listserv/ and includes a link to current/archived updates
- Accessibility checks and content stats
- Export HTML with embedded Base64 newsletter data; import from exported HTML
- Auto-save draft to localStorage and undo/redo
- Formatters and linters: Black, Flake8, Prettier

## Requirements
- Python 3.14 (recommended) or 3.13+
- Node.js (for Prettier; optional)

## Quick Start
`powershell
cd "C:\Python Projects\GS Slate Editor V7"
py -3.14 app.py
`
Open http://localhost:5000 (FF) or http://localhost:5000/?type=briefing (Briefing).

## Project Structure
`
GS Slate Editor V7/
â”œâ”€â”€ app.py                  # Flask app, routes and APIs
â”œâ”€â”€ config.py               # Defaults: brand, layout, CTA/button, footer, samples
â”œâ”€â”€ email_templates.py      # HTML generation for masthead, sections, cards, CTA, footer
â”œâ”€â”€ styles.py               # Email-safe CSS constants + responsive inlined CSS
â”œâ”€â”€ templates/
â”‚   â””â”€â”€ editor.html         # Editor UI layout (left editor, right preview)
â”œâ”€â”€ static/
â”‚   â”œâ”€â”€ editor.css          # Editor UI styles
â”‚   â””â”€â”€ editor.js           # Editor logic (state, binding, preview, export/import)
â”œâ”€â”€ .flake8                 # Flake8 rules (compatible with Black)
â”œâ”€â”€ pyproject.toml          # Black configuration
â”œâ”€â”€ .prettierrc.json        # Prettier configuration
â”œâ”€â”€ .prettierignore         # Prettier ignore
â””â”€â”€ .gitignore              # Git ignore
`

## Development
- Start: py -3.14 app.py
- Format Python: py -m black --check .
- Lint Python: py -m flake8 .
- Format frontend (no policy change):
  - cmd /c npx prettier --write "static/**/*.{js,css}" "templates/**/*.html"

## Key Concepts
- Templates: f and riefing via /?type=briefing
- Sections: updates, iscal, closures, esources, submit_request (generic submit)
- Cards: standard, event, esource, cta
- CTA alignment: text (title/body) alignment is independent from button alignment
- Import/Export: export embeds JSON as Base64 for safe round-trip

## APIs
- POST /api/preview â†’ { html }
- POST /api/generate_plaintext â†’ { text }
- POST /api/export â†’ downloadable HTML (minify/strip options)
- POST /api/import â†’ parse exported HTML
- GET /api/defaults/<template>
- POST /api/validate, POST /api/stats

## Configuration
- Edit config.py to change defaults (CTA button, layout, footer, resources).
- Important URLs:
  - FF submit: https://gradschool.wsu.edu/request-for-ff-promotion/
  - Briefing submit: https://gradschool.wsu.edu/listserv/
  - Current/archived updates: https://gradschool.wsu.edu/faculty-and-staff-updates/

## Troubleshooting
- Preview blank after following a link: click Refresh Preview (uses iframe.srcdoc).
- Port 5000 busy: py -3.14 -c "import app; app.app.run(port=5050, debug=True)"

## License
Internal/WSU use. Update as appropriate.
