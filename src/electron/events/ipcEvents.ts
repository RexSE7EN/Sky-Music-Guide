import { ipcMain, BrowserWindow } from 'electron';
import { removeChildWindow } from '../utils/windowUtils.js';

function registerMainEvents() {
	ipcMain.on('close-window', (event):any => {
		const closedWindow = BrowserWindow.fromWebContents(event.sender);
		if (closedWindow) {
			closedWindow.close();
			removeChildWindow(closedWindow);
		}
	});

	ipcMain.on('minimize-window', (event):any => {
		const win = BrowserWindow.fromWebContents(event.sender);
		if (win) {
			win.minimize();
		}
	});

	ipcMain.on('maximize-window', (event):any => {
		const win = BrowserWindow.fromWebContents(event.sender);
		if (win) {
			if (win.isMaximized())
				win.unmaximize();
			else
				win.maximize();
		}
	});
}

export { registerMainEvents };
