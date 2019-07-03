const electron = require('electron');
const app = electron.app;
const Window = electron.BrowserWindow;
require('electron-reload')(__dirname);

let win;

app.on('ready', () => {
    win = new Window({
        minWidth: 1024,
        minHeight: 768,
        webPreferences: {
            nodeIntegration: true
        },
    });

    win.loadFile('./app/index.html');

    // win.webContents.openDevTools();

    win.on('closed', () => {
        win = null;
    });

});

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin')
    {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
});