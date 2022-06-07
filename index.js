require('v8-compile-cache');
const { BrowserWindow, app, session } = require('electron');
const { readFileSync, writeFileSync } = require('fs');
const { ElectronBlocker, fullLists } = require('@cliqz/adblocker-electron');
const fetch = require('cross-fetch');
const express = require('express')
const expressApp = express()

expressApp.get('/', function (req, res) {
	res.send('Hello World')
})
expressApp.listen(3000)

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
	mainWindow.webContents.executeJavaScript(`document.head.innerHTML += '<link rel="stylesheet" type="text/css" href="http:/localhost:3000/src/css/style.css">'`);
	mainWindow.loadURL("https://music.youtube.com/");

	mainWindow.once('ready-to-show', async () => {
		mainWindow.show();
	})
});