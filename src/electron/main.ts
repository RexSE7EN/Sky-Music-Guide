import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'node:path';
import { registerMainEvents } from './events/MainEvents.js';
import {registerCreatePopupWindow, registerCreateSubWindow} from "./events/WindowEvents.js";
import { registerInfoHandle } from './handlers/MainHandlers.js';
import { getAllWindows } from './utils/windowUtils.js';
import { getPreloadPath, isDev } from './utils/infoUtils.js';

let mainWindow: BrowserWindow;

// Create the main window
const createWindow = () => {
	mainWindow = new BrowserWindow({
		title: `Sky Music Guide v${app.getVersion()}`,
		width: isDev() ? 1500 : 800,
		height: 600,
		frame: false,
		webPreferences: {
			preload: getPreloadPath(),
		}
	});
	mainWindow.removeMenu();

	// Open dev tools in development mode
	if (isDev()) {
		mainWindow.webContents.openDevTools();
		mainWindow.loadURL("http://localhost:2325");
	} else {
		mainWindow.loadFile(path.join(app.getAppPath(), '/dist-react/index.html'));
	}


	// Close all child windows when the main window is closed
	mainWindow.on('closed', () => {
		getAllWindows().forEach(window => {
			window.close();
		});
		app.quit();
	});
}

// App event listeners
app.on('ready', () => {
	createWindow();
	registerMainEvents();
	registerInfoHandle();
	registerCreateSubWindow();
	registerCreatePopupWindow();

	console.log(`Sky Music Guide v${app.getVersion()}`);
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
})

ipcMain.handle('get-main-window', ():BrowserWindow => {
	return mainWindow;
})

