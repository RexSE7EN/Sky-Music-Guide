import { ipcMain, BrowserWindow } from 'electron';
import { app } from 'electron';
import path from 'node:path';
import {getPreloadPath, isDev} from '../utils/infoUtils.js';
import { addChildWindow, removeChildWindow } from '../utils/windowUtils.js';

let popupWindow:BrowserWindow;

type Options = {
	title: string;
	width: number;
	height: number;
	frameless: boolean;
	maximizable: boolean;
	resizable: boolean;
	alwaysOnTop: boolean;
	level: number;
	enableDevMode: boolean;
	url: string;
	message?: string; // Optional property
	isPopup?: boolean; // Optional property
};

const createWindow = (options: Options) => {
	const newWindow = new BrowserWindow({
		width: options.width,
		height: options.height,
		frame: !options.frameless,
		maximizable: options.maximizable,
		resizable: options.resizable,
		title: options.title,
		webPreferences: {
			preload: getPreloadPath()
		}
	});

	newWindow.removeMenu();
	newWindow.setAlwaysOnTop(options.alwaysOnTop, 'screen-saver', options.level);

	if (isDev() && options.enableDevMode) newWindow.webContents.openDevTools();

	addChildWindow(newWindow);

	newWindow.on('closed', () => {
		removeChildWindow(newWindow);
	});

	const base = app.getAppPath();
	console.log(base);

	const query = `?title=${encodeURIComponent(options.title)}${options.message ? `&message=${encodeURIComponent(options.message)}` : ""}`;

	if (isDev()) {
		newWindow.webContents.openDevTools();
		newWindow.loadURL("http://localhost:2325/#/" + options.url + query);
	} else {
		newWindow.loadFile(path.join(app.getAppPath(), '/dist-react/index.html'), {
			hash: `${options.url}${query}`,
		});
	}

	//newWindow.loadURL(`file://${path.join('"'+base+'"', options.url)}?title=${encodeURIComponent(options.title)}${options.message ? `&message=${encodeURIComponent(options.message)}` : ''}`);

	return newWindow;
};

const registerCreateSubWindow = () => {
	ipcMain.on('open-new-window', (event, title, width, height, resizable, maximizable, frameless) => {
		const opt = {
			title,
			width,
			height,
			resizable,
			maximizable,
			frameless,
			alwaysOnTop: true,
			level: 0,
			enableDevMode: true,
			url: 'normalwindow'
		}

		createWindow(opt);
	});
};

const registerCreatePopupWindow = () => {
	ipcMain.handle('open-popup-window', async (event, title, message) => {
		if (popupWindow) {
			popupWindow.focus();
			return;
		}

		return new Promise((resolve) => {
			const opt = {
				width: 600, //300
				height: 400, // 200
				resizable: true,
				maximizable: false,
				frameless: true,
				title,
				alwaysOnTop: true,
				level: 1,
				url: 'popupwindow',
				message,
				isPopup: true,
				enableDevMode: false
			}

			popupWindow = createWindow(opt);

			ipcMain.once('popup-response', (event, response) => {
				resolve(response);
				popupWindow.close();
			});
		});
	});
};

export { registerCreateSubWindow, registerCreatePopupWindow };
