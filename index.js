require('v8-compile-cache');
const electron = require('electron');
const { ipcMain, Tray, Menu } = require('electron');

const app = electron.app;

app.on('ready', () => {
	const mainWindow = new electron.BrowserWindow({
		width: 1360,
		height: 630,
		minWidth: 1150,
		minHeight: 550,
		resizable: true,
		frame: false,
		show: false,
		title: 'Lazap',
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			backgroundThrottling: false,
			zoomFactor: 0.9,
		},
		icon: 'icon.ico',
	});

    mainWindow.loadFile("src/index.html");

    mainWindow.once('ready-to-show', async () => {
        mainWindow.show();
    })
});