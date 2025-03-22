import { ipcMain, BrowserWindow } from 'electron';
import { removeChildWindow } from '../utils/windowUtils.js';

function registerMainEvents() {
	ipcMain.on('show-window', (event):void => {
		const win = BrowserWindow.fromWebContents(event.sender);
		if (win) {
			win.show();
		}
	});

	ipcMain.on('hide-window', (event):void => {
		const win = BrowserWindow.fromWebContents(event.sender);
		if (win) {
			win.hide();
		}
	});

	ipcMain.on('close-window', (event):void => {
		const win = BrowserWindow.fromWebContents(event.sender);
		if (win) {
			win.close();
			removeChildWindow(win);
		}
	});

	ipcMain.on('minimize-window', (event):void => {
		const win = BrowserWindow.fromWebContents(event.sender);
		if (win) {
			win.minimize();
		}
	});

	ipcMain.on('maximize-window', (event):void => {
		const win = BrowserWindow.fromWebContents(event.sender);
		if (win) {
			if (win.isMaximized())
				win.unmaximize();
			else
				win.maximize();
		}
	});

	ipcMain.on('log-message', (event, message) => {
		console.log('[Renderer Log]', message);
	});

	ipcMain.on('forward-message', (event, targetWindowId, channel, ...args) => {
		const targetWindow = BrowserWindow.fromId(targetWindowId);
		if (targetWindow) {
			targetWindow.webContents.send(channel, ...args);
		}
	});
}

export { registerMainEvents };
