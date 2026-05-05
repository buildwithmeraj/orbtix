# Orbtix Landing Page

A responsive, simple and modern landing page for **Orbtix** built with HTML, CSS, and JavaScript.

## Live Demo

- https://buildwithmeraj.github.io/orbtix/

## Features

- Responsive layout (mobile, tablet, desktop)
- Light/Dark theme toggle with `localStorage` persistence
- Animated hero section and scroll reveal effects
- Dynamic services section loaded from JSON
- Contact form with basic client-side validation
- Improved footer with quick links and social icons

## Project Structure

```text
.
├── index.html
├── assets
│   ├── stylesheets/main.css
│   ├── javascripts/main.js
│   └── images/
└── data/services.json
```

## Run Locally

Open `index.html` directly in your browser.

For best experience (and to avoid fetch issues in some browsers), serve with a local server:

```bash
npx serve .
```

Then open the local URL shown in terminal.

## Notes

- Services are fetched in JavaScript (currently from a GitHub raw URL).
- Theme is controlled via `<html data-theme="light|dark">`.
