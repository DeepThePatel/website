# Deep Patel — Portfolio Website

My portfolio website. It is a plain static site (HTML, CSS and vanilla JavaScript) styled like a code editor, with a sidebar file explorer, a terminal hero and a status bar.

There is no build step, framework or package manager.

## Features

- **Interactive terminal** on the home page. A typing animation plays on load, then you can click the terminal and run commands such as `help`, `ls`, `open <name|number>`, `about`, `experience`, `resume`, `theme <name>` and `clear`.
- **Command palette** (`Ctrl/Cmd + K`) on every page for jumping to pages, sections, social links, the resume and accent colors.
- **Accent colors** (teal, amber, violet, rose), saved in `localStorage` and applied before first paint to avoid a flash. The logo and social icons are CSS masks, so they recolor with the accent.
- **Expandable work experience**: each role on the home page is an accessible accordion (button with `aria-expanded`) that reveals a description and a "View full description" link to LinkedIn.
- **Project pages** with an outline rail that follows scroll position on wide screens, plus a click-to-zoom image lightbox (`img[data-zoom]`).
- **Responsive layout**: the sidebar collapses behind a menu button on small screens.
- **Reduced motion**: the typing animation and other animations are skipped when the visitor prefers reduced motion.

## Project structure

```
index.html            Home: terminal hero, about, work experience, project cards
achievements.html     Degrees and certifications
schedulerx.html       Project pages
ai.html
blackjack.html
camp-system.html
fantasy-rescue.html
580project.html
script.js             All behavior (themes, sidebar, palette, terminal, accordion, lightbox)
styles/styles.css     All styling, with theme variables at the top
images/               Screenshots, certificates, logo and social icons
favicon.png
DeepPatel_Resume.pdf  Linked from the sidebar "Resume" button
BA_Diploma.pdf, BSCS_Diploma.pdf, ai_report.pdf
```

## Running locally

Open `index.html` directly, or serve the folder for best results:

```sh
# any static server works, for example:
python -m http.server 8000
# then visit http://localhost:8000
```

Serving over HTTP is recommended. Chrome blocks CSS masks on `file://` pages, so the logo and social icons will not render if you open the files straight from disk.

## Common edits

| To change | Edit |
| --- | --- |
| Experience descriptions | The `exp-body` blocks in the `#experience` section of `index.html` |
| Add a project | Copy an existing project page, add a card in `index.html`, a sidebar link on every page, and an entry in the `PAGES` array in `script.js` (this feeds the palette and terminal) |
| Accent colors | `THEMES` in `script.js`, the `data-theme` variable blocks in `styles/styles.css`, and the swatch buttons in the sidebar |
| Social links | The `.side-foot .row` links on every page, and `EXT` in `script.js` |
| Resume file | The `.btn` link in the sidebar of every page. The `resume` terminal command and palette entry read that link |
| Terminal commands | The `COMMANDS` object in `script.js` |
| Sidebar width | `--side` in `styles/styles.css` |

The sidebar, top bar and status bar are repeated in each HTML file, so changes to them must be made on all pages.

## Browser support

Current versions of Chrome, Edge, Firefox and Safari. The accent recoloring uses CSS `mask` and `color-mix()`.
