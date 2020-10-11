import { app, BrowserWindow } from "electron";
import Config from "./config";

function createWindow(): void {
    const window = new BrowserWindow({
        title: "Solaxia World",
        width: Config.width,
        height: Config.height,
        useContentSize: true,
        backgroundColor: "#000000"
    });
    window.removeMenu();
    window.on("will-resize", e => e.preventDefault());
    window.loadURL("http://localhost:8000/");
}

app.on("ready", () => {
    createWindow();
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
