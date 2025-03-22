type args = {
	[key: string]: string | number | boolean | object | (string | number | boolean | object)[];
};

type appAPI = {
	getVersion: () => Promise<string>;
	getNodeVersion: () => Promise<string>;
	getChromeVersion: () => Promise<string>;
	getElectronVersion: () => Promise<string>;
	isDev: () => Promise<boolean>;
};

type electron = {
	showWindow: () => void;
	hideWindow: () => void;
	closeWindow: () => void;
	minimizeWindow: () => void;
	maximizeWindow: () => void;
	logMessage: (message: string) => void;
	openNewWindow: (title?: string, content?: string, width?: number, height?: number, resizable?: boolean, maximizable?: boolean, frameless?: boolean, devMode?: boolean) => number;
	openPopupWindow: (title?: string, message?: string, devMode?: boolean) => Promise<string>;

	sendMessage: (channel: string, args: (args)) => void;
	receiveMessage: (channel: string, callback: (args: args) => void) => void;
	forwardMessage: (targetWindowId: number, channel: string, args: (args)) => void;
	removeListeners: (channel: string, callback: (args: args) => void) => void;
};

interface Window {
	appAPI: appAPI;
	electron: electron;
}
