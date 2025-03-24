import {app, BrowserWindow, ipcMain} from 'electron';
import { isDev } from '../utils/infoUtils.js';

function registerInfoHandle() {
	ipcMain.handle('get-version', ():string => app.getVersion());
	ipcMain.handle('get-node-version', ():string => process.versions.node);
	ipcMain.handle('get-chrome-version', ():string => process.versions.chrome);
	ipcMain.handle('get-electron-version', ():string => process.versions.electron);
	ipcMain.handle('get-platform', ():string => process.platform);
	ipcMain.handle('is-dev', isDev);
	ipcMain.handle('window-exists', (event, winID:number):boolean => {
		const win = BrowserWindow.fromId(winID);
		return !!win;
	})
}

export { registerInfoHandle };