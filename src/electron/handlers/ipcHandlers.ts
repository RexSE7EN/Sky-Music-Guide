import { app, ipcMain } from 'electron';
import { isDev } from '../utils/infoUtils.js';

function registerInfoHandle() {
	ipcMain.handle('get-version', ():any => app.getVersion());
	ipcMain.handle('get-node-version', ():any => process.versions.node);
	ipcMain.handle('get-chrome-version', ():any => process.versions.chrome);
	ipcMain.handle('get-electron-version', ():any => process.versions.electron);
	ipcMain.handle('get-platform', ():any => process.platform);
	ipcMain.handle('is-dev', isDev);
}

export { registerInfoHandle };