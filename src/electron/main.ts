import { app, BrowserWindow } from 'electron';
import path from 'node:path';
// import { createSubWindow, createPopupWindow } from './events/createSubWindow.js';
import { registerMainEvents } from './events/ipcEvents.js';
import { registerInfoHandle } from './handlers/ipcHandlers.js';
import { getAllWindows } from './utils/windowUtils.js';
import { getPreloadPath, isDev } from './utils/infoUtils.js';

// Create the main window
const createWindow = () => {
	var title = 'Sky Music Guide v{version}';
	const mainWindow = new BrowserWindow({
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
	/*createSubWindow();
	createPopupWindow();*/

	console.log(`Sky Music Guide v${app.getVersion()}`);
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
})