import { BrowserWindow } from "electron";

let childWindows: Array<BrowserWindow> = [];

function getAllWindows() {
	return childWindows;
}

function addChildWindow(window: BrowserWindow) {
	childWindows.push(window);
}

function removeChildWindow(window: BrowserWindow) {
	childWindows = childWindows.filter(w => w !== window);
}

export { getAllWindows, addChildWindow, removeChildWindow };
