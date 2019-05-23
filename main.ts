const { app, BrowserWindow } = require('electron');
let win;
function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({show: false});
  win.maximize();
  win.show();
  win.removeMenu(); // <-- Hide menu bar on top
  // and load the index.html of the app.
  win.loadFile('./dist/Sierra-Gorda/index.html');
  // Open the DevTools.
  // win.webContents.openDevTools();

  // Emitted when the window is closed.
  win.on('closed', () => {
    win = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if ( process.platform !== 'darwin' ) {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
