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
	openNewWindow: (title = "Demo Window", width = 400, height = 300,
		resizable=true, maximizable=true, frameless=true) => {
		ipcRenderer.send('open-new-window', title, width, height, resizable, maximizable, frameless);
	},
	closeWindow: () => ipcRenderer.send('close-window'),
	minimizeWindow: () => ipcRenderer.send('minimize-window'),
	maximizeWindow: () => ipcRenderer.send('maximize-window'),
	openPopupWindow: (title = "Demo Popup", message = "Test Message") => ipcRenderer.invoke('open-popup-window', title, message),
	send: (channel:string, ...args: any) => ipcRenderer.send(channel, ...args) // Add this line
});