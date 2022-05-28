require('v8-compile-cache');
const electron = require('electron');
const { ipcMain, Tray, Menu } = require('electron');

const app = electron.app;

app.on('ready', () => {
	const mainWindow = new electron.BrowserWindow({
		width: 1300,
		height: 720,
		minWidth: 1150,
		minHeight: 550,
		resizable: true,
		frame: false,
		show: false,
		title: 'Zetic',
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			backgroundThrottling: false
		},
		icon: 'icon.ico',
	});

    mainWindow.loadFile("src/index.html");

    mainWindow.once('ready-to-show', async () => {
        mainWindow.show();
    })
});