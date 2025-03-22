const { contextBridge, ipcRenderer } = require('electron');

// for handler
contextBridge.exposeInMainWorld('appAPI', {
	getVersion: () => ipcRenderer.invoke('get-version'),
	getNodeVersion: () => ipcRenderer.invoke('get-node-version'),
	getChromeVersion: () => ipcRenderer.invoke('get-chrome-version'),
	getElectronVersion: () => ipcRenderer.invoke('get-electron-version'),
	isDev: () => ipcRenderer.invoke('is-dev')
});

// for events
contextBridge.exposeInMainWorld('electron', {
	showWindow: () => ipcRenderer.send('show-window'),
	hideWindow: () => ipcRenderer.send('hide-window'),

	closeWindow: () => ipcRenderer.send('close-window'),
	minimizeWindow: () => ipcRenderer.send('minimize-window'),
	maximizeWindow: () => ipcRenderer.send('maximize-window'),

	logMessage: (message: string) => ipcRenderer.send('log-message', message),

	openNewWindow: (title = "Demo Window", content = "default", width = 400, height = 300,
		resizable=true, maximizable=true, frameless=true, devMode=false) => 
		ipcRenderer.invoke('open-new-window', title, content, width, height, resizable, maximizable, frameless, devMode),
	
	openPopupWindow: (title = "Demo Popup", message = "Test Message", devMode=false) => ipcRenderer.invoke('open-popup-window', title, message, devMode),

	sendMessage: (channel: string, ...args: unknown[]): void => {
		ipcRenderer.send(channel, ...args);
	},
	receiveMessage: (channel: string, callback: (...args: unknown[]) => void): void => {
		ipcRenderer.on(channel, (event: any, ...args: unknown[]) => callback(...args));
	},
	// Optional: Remove listener to avoid memory leaks
	removeListeners: (channel: string, callback: (...args: unknown[]) => void): void => {
		ipcRenderer.removeListener(channel, callback);
	},

	forwardMessage: (targetWindowId: number, channel: string, ...args: unknown[]): void => {
		ipcRenderer.send('forward-message', targetWindowId, channel, ...args);
	},
});