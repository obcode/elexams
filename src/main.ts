import * as path from "path";
import * as url from "url";
import { app, BrowserWindow, Menu } from "electron";

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win: BrowserWindow | null;

const mode = process.env.NODE_ENV;

function reloadOnChange(win: BrowserWindow) {
  if (mode !== "development") return { close: () => {} };

  const watcher = require("chokidar").watch(path.join(__dirname, "**"), {
    ignoreInitial: true
  });

  watcher.on("change", () => {
    win.reload();
  });

  return watcher;
}

function launch() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 600,
    backgroundColor: "white",
    titleBarStyle: "hidden",
    webPreferences: {
      scrollBounce: true
    }
  });

  const shell = require("electron").shell;

  const menu = Menu.buildFromTemplate([
    {
      label: "Menu",
      submenu: [
        {
          label: "ZPA",
          click() {
            shell.openExternal(
              "https://w3-o.cs.hm.edu:8000/regulations/imexport/"
            );
          },
          accelerator: "CmdOrCtrl+E"
        },
        { type: "separator" },
        {
          label: "Beenden",
          click() {
            app.quit();
          },
          accelerator: "CmdOrCtrl+Q"
        }
      ]
    },
    {
      label: "Edit",
      submenu: [
        {
          role: "undo"
        },
        {
          role: "redo"
        },
        {
          type: "separator"
        },
        {
          role: "cut"
        },
        {
          role: "copy"
        },
        {
          role: "paste"
        },
        {
          role: "pasteandmatchstyle"
        },
        {
          role: "delete"
        },
        {
          role: "selectall"
        }
      ]
    },
    {
      label: "View",
      submenu: [
        {
          label: "Reload",
          accelerator: "CmdOrCtrl+R",
          click(item, focusedWindow) {
            if (focusedWindow) focusedWindow.reload();
          }
        },
        {
          label: "Toggle Developer Tools",
          accelerator:
            process.platform === "darwin" ? "Alt+Command+I" : "Ctrl+Shift+I",
          click(item, focusedWindow) {
            if (focusedWindow) focusedWindow.webContents.toggleDevTools();
          }
        },
        {
          type: "separator"
        },
        {
          role: "resetzoom"
        },
        {
          role: "zoomin"
        },
        {
          role: "zoomout"
        },
        {
          type: "separator"
        },
        {
          role: "togglefullscreen"
        }
      ]
    }
  ]);
  Menu.setApplicationMenu(menu);

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "../static/index.html"),
      protocol: "file:",
      slashes: true
    })
  );

  const watcher = reloadOnChange(win);

  win.on("closed", function() {
    win = null;
    watcher.close();
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", launch);

// Quit when all windows are closed.
app.on("window-all-closed", function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    launch();
  }
});
