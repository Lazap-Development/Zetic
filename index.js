require('v8-compile-cache');
const { BrowserWindow, app, session } = require('electron');
const { readFileSync, writeFileSync } = require('fs');
const { ElectronBlocker, fullLists } = require('@cliqz/adblocker-electron');
const fetch = require('cross-fetch');
const path = require('path');
const url = require('url');


app.on('ready', async () => {
	const mainWindow = new BrowserWindow({
		width: 1500,
		height: 800,
		minWidth: 1150,
		minHeight: 550,
		resizable: true,
		frame: false,
		show: false,
		title: 'Zetic',
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			nodeIntegrationInSubFrames: true,
			webviewTag: true
		},
		icon: 'icon.ico',
	});

	const blocker = await ElectronBlocker.fromLists(
		fetch,
		fullLists,
		{
			enableCompression: true,
		},
		{
			path: 'engine.bin',
			read: async (...args) => readFileSync(...args),
			write: async (...args) => writeFileSync(...args),
		},
	);
	blocker.enableBlockingInSession(mainWindow.webContents.session);
	
	mainWindow.setBackgroundColor('#9a7ecc')
	mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'src/index.html'),
        protocol: 'file:',
        slashes: true
    }))

	mainWindow.once('ready-to-show', async () => {
		mainWindow.show();
	})
});