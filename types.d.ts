type appAPI = {
	getVersion: () => Promise<string>;
	getNodeVersion: () => Promise<string>;
	getChromeVersion: () => Promise<string>;
	getElectronVersion: () => Promise<string>;
	isDev: () => Promise<boolean>;
};
type electron = {
	openNewWindow: (title?: string, width?: number, height?: number, resizable?: boolean, maximizable?: boolean, frameless?: boolean) => void;
	closeWindow: () => void;
	minimizeWindow: () => void;
	maximizeWindow: () => void;
	openPopupWindow: (title?: string, message?: string) => Promise<string>;
	send: (channel: string, ...args: any) => void;
};

interface Window {
	appAPI: appAPI;
	electron: electron;
}
