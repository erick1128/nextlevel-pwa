# NextLevel Outreach

## Application Name
NextLevel Outreach

## Description
NextLevel Outreach is a Progressive Web App that helps high school and junior college baseball players get their emails in front of the right college coaches. Players share their position, grad year, stats, GPA, and highlight video, then get a list of matched coaches and a custom email for each one. It is designed for baseball players and their parents who are going through college recruiting and do not know who to contact or what to say.

The app is built with HTML, CSS, JavaScript, and the Materialize CSS framework. It is responsive and works on phones, tablets, and desktops. All names, numbers, and testimonials in this prototype are made up.

## PWA Features
- **Web App Manifest** (`manifest.json`): app name, short name, ID, start URL, scope, standalone display mode, theme and background colors, and 192px and 512px icons, so the app can be installed on a phone or computer.
- **Service Worker Registration** (`js/app.js`): checks if the browser supports service workers, registers `sw.js` with async/await, handles errors with try...catch, and logs useful messages in the console.
- **App Shell Cache** (`sw.js`): the main page, CSS, JavaScript, fonts, images, icons, Materialize CSS, and the offline page are saved during the install event.
- **Cache First Strategy**: on a GET request, the service worker checks Cache Storage first, then uses the network if the file is not cached.
- **Offline Support** (`offline.html`): if a page cannot load with no internet, the user sees a friendly offline page instead of a browser error.
- **Cache Versioning**: the cache is named `nextlevel-shell-v5`. The version number goes up whenever the app shell changes.
- **Old Cache Cleanup**: the activate event deletes old cache versions so only the current one is kept.
- **Asynchronous JavaScript**: Promises, async, await, and try...catch are used in the registration code and in every service worker event.

## How to Run It
Service workers only work on localhost or https. In this folder run:

    python3 -m http.server 8000

Then open http://localhost:8000

To test offline mode, open DevTools (F12), go to the **Application** tab, check that the service worker is running, then go to the **Network** tab and set it to **Offline** and reload the page.

## GitHub
https://github.com/erick1128/nextlevel-pwa
