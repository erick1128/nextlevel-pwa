# NextLevel Outreach (PWA prototype)

A one page Progressive Web App prototype for a baseball recruiting tool.
Built with HTML and CSS, using the Materialize CSS framework. Navy, red, and white with a varsity style heading font. All text is made up.

## What is on the page
- Menu that scrolls to each section
- Sign up popups opened by the Get started and plan buttons (pure CSS, no JavaScript)
- Testimonials, pricing, and a short note about installing the app, all dummy text

## PWA parts
- manifest.json: app name, icons, colors
- sw.js: service worker that saves the page so it works offline
- offline.html: page shown if something was not saved yet

## Run it
Service workers need localhost or https. In this folder run:

    python3 -m http.server 8000

Then open http://localhost:8000

## GitHub
https://github.com/erick1128/nextlevel-pwa
