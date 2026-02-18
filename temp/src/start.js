import { loadConfiguration } from "./lib/configuration.js";
import { Display } from "./lib/display.js";
import { setNotFoundRoute, setRoute, showRoute } from "./lib/router.js";
import { showErrorView } from "./views/error.js";
import { showVideoCallView } from "./views/videocall/videocall.js";
/**./views/home/summary.js
 * When the dynamic URL changes loads
 * the correspoding view from the URL
 */
window.addEventListener("hashchange", start);
/**
 * When the window is loaded load
 * the app state to show
 */
window.onload = async function () {
    await loadConfiguration("gtdf.config.json");
    Display.checkType();
    // await loadIcons("material", `${getConfiguration("path")["icons"]}/materialicons.json`);
    // await loadIcons("social", `${getConfiguration("path")["icons"]}/socialicons.json`);
    await start();
};
window.onresize = async function () {
    Display.checkType();
};
/** Start the web app     */
async function start() {
    setRoute("", showVideoCallView);
    setNotFoundRoute(showErrorView);
    showRoute(window.location.hash.slice(1).toLowerCase(), document.body);
}
