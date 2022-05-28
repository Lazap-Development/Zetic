require('v8-compile-cache');
const { BrowserWindow, app, session } = require('electron');
const { readFileSync, writeFileSync } = require('fs');
const { ElectronBlocker, fullLists } = require('@cliqz/adblocker-electron');
const fetch = require('cross-fetch');

app.on('ready', async () => {
	const mainWindow = new BrowserWindow({
		width: 1300,
		height: 720,
		minWidth: 1150,
		minHeight: 550,
		resizable: true,
		frame: false,
		show: false,
		title: 'Zetic',
		webPreferences: {
			nodeIntegration: false,
			contextIsolation: false,
			nodeIntegrationInSubFrames: true,
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
	
	mainWindow.loadURL("https://music.youtube.com/");

	mainWindow.once('ready-to-show', async () => {
		mainWindow.show();
	})
});