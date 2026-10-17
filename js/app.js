// app.js
// Registers the service worker so NextLevel can be installed and work offline.
 
async function registerServiceWorker() {
  // Checks if this browser supports service workers
  if (!("serviceWorker" in navigator)) {
    console.warn("NextLevel: this browser does not support service workers.");
    return;
  }
 
  // Tries to register sw.js
  try {
    const registration = await navigator.serviceWorker.register("sw.js");
    console.log("NextLevel: service worker registered. Scope:", registration.scope);
 
    // Waits until the service worker is active and ready
    await navigator.serviceWorker.ready;
    console.log("NextLevel: service worker is ready. The app can now work offline.");
  } catch (error) {
    // Handle registration errors
    console.error("NextLevel: service worker registration failed.", error);
  }
}
 
// Registers after the page finishes loading so it does not slow the page down
window.addEventListener("load", registerServiceWorker);
 
// Lets the user know in the console when the connection changes
window.addEventListener("online", () => console.log("NextLevel: you are back online."));
window.addEventListener("offline", () => console.log("NextLevel: you are offline. Saved pages will still load."));
 
