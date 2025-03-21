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
	openNewWindow: (title?: string, width?: number, height?: number, resizable?: boolean, maximizable?: boolean, frameless?: boolean) => void;
	openPopupWindow: (title?: string, message?: string) => Promise<string>;
	sendMessage: (channel: string, ...args: unknown[]) => void;
	receiveMessage: (channel: string, callback: (...args: unknown[]) => void) => void;
	removeListeners: (channel: string, callback: (...args: unknown[]) => void) => void;
};

interface Window {
	appAPI: appAPI;
	electron: electron;
}
