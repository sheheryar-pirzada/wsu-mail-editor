# WSU Newsletter Editor (V7)

A Flask-based web editor for composing email-safe HTML newsletters (Friday Focus and Graduate School Briefing). The editor renders live previews with robust, client-friendly HTML and email-safe inline styles.

## Features
- Friday Focus (FF) and Graduate School Briefing templates
- Sections and cards with rich text, events, resources, and CTA cards
- Generic submit section key `submit_request` (blank title) for both templates
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
```powershell
cd "C:\Python Projects\GS Slate Editor V7"
py -3.14 app.py
```
Open http://localhost:5000 (FF) or http://localhost:5000/?type=briefing (Briefing).

## Project Structure
```
GS Slate Editor V7/
├── app.py                  # Flask app, routes and APIs
├── config.py               # Defaults: brand, layout, CTA/button, footer, samples
├── email_templates.py      # HTML generation for masthead, sections, cards, CTA, footer
├── styles.py               # Email-safe CSS constants + responsive inlined CSS
├── templates/
│   └── editor.html         # Editor UI layout (left editor, right preview)
├── static/
│   ├── editor.css          # Editor UI styles
│   └── editor.js           # Editor logic (state, binding, preview, export/import)
├── .flake8                 # Flake8 rules (compatible with Black)
├── pyproject.toml          # Black configuration
├── .prettierrc.json        # Prettier configuration
├── .prettierignore         # Prettier ignore
└── .gitignore              # Git ignore
```

## Development
- Start: `py -3.14 app.py`
- Format Python: `py -m black --check .`
- Lint Python: `py -m flake8 .`
- Format frontend (no policy change):
  - `cmd /c npx prettier --write "static/**/*.{js,css}" "templates/**/*.html"`

## Key Concepts
- Templates: `ff` and `briefing` via `/?type=briefing`
- Sections: `updates`, `fiscal`, `closures`, `resources`, `submit_request` (generic submit)
- Cards: `standard`, `event`, `resource`, `cta`
- CTA alignment: text (title/body) alignment is independent from button alignment
- Import/Export: export embeds JSON as Base64 for safe round-trip

## APIs
- POST `/api/preview` → `{ html }`
- POST `/api/generate_plaintext` → `{ text }`
- POST `/api/export` → downloadable HTML (minify/strip options)
- POST `/api/import` → parse exported HTML
- GET `/api/defaults/<template>`
- POST `/api/validate`, POST `/api/stats`

## Configuration
- Edit `config.py` to change defaults (CTA button, layout, footer, resources).
- Important URLs:
  - FF submit: https://gradschool.wsu.edu/request-for-ff-promotion/
  - Briefing submit: https://gradschool.wsu.edu/listserv/
  - Current/archived updates: https://gradschool.wsu.edu/faculty-and-staff-updates/

## Troubleshooting
- Preview blank after following a link: click Refresh Preview (uses `iframe.srcdoc`).
- Port 5000 busy: `py -3.14 -c "import app; app.app.run(port=5050, debug=True)"`

## License
Internal/WSU use. Update as appropriate.
