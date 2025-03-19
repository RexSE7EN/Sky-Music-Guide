import { ipcMain, BrowserWindow } from 'electron';
import path from 'node:path';
import { isDev } from '../../utils/infoUtils.js';
import { addChildWindow, removeChildWindow } from '../../utils/windowUtils.js';

let popupWindow = null;

const createWindow = (options) => {
	const newWindow = new BrowserWindow({
		width: options.width,
		height: options.height,
		frame: options.frameless,
		maximizable: options.maximizable,
		resizable: options.resizable,
		title: options.title,
		webPreferences: {
			preload: path.join(__dirname, '../../preload/preload.js')
		}
	});

	newWindow.removeMenu();
	newWindow.setAlwaysOnTop(options.alwaysOnTop, 'screen-saver', options.level);

	if (isDev && options.enableDevMode) newWindow.webContents.openDevTools();

	addChildWindow(newWindow);

	newWindow.on('closed', () => {
		removeChildWindow(newWindow);
		if (options.isPopup) {
			popupWindow = null;
		}
	});

	newWindow.loadURL(`file://${path.join(__dirname, options.url)}?title=${encodeURIComponent(options.title)}${options.message ? `&message=${encodeURIComponent(options.message)}` : ''}`);

	return newWindow;
};

const createSubWindow = () => {
	ipcMain.on('open-new-window', (event, title, width, height, resizable, maximizable, frameless) => {
		createWindow({
			width,
			height,
			resizable,
			maximizable,
			frameless,
			title,
			alwaysOnTop: true,
			level: 0,
			enableDevMode: true,
			url: '../../renderer/html/normalwindow.html'
		});
	});
};

const createPopupWindow = () => {
	ipcMain.handle('open-popup-window', async (event, title, message) => {
		if (popupWindow) {
			popupWindow.focus();
			return;
		}

		return new Promise((resolve) => {
			popupWindow = createWindow({
				width: 300,
				height: 200,
				resizable: false,
				maximizable: false,
				frameless: true,
				title,
				alwaysOnTop: true,
				level: 1,
				url: '../../renderer/html/popupwindow.html',
				message,
				isPopup: true,
				enableDevMode: false
			});

			ipcMain.once('popup-response', (event, response) => {
				resolve(response);
				popupWindow.close();
			});
		});
	});
};

export { createSubWindow, createPopupWindow };
