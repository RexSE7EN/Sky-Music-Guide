import path from "path";
import { app } from 'electron';

const isDev = ():boolean => process.env.NODE_ENV !== 'production';

function getPreloadPath():string {
	return path.join(
		app.getAppPath(),
		isDev() ? '.' : '..',
		'/dist-electron/preload/preload.cjs'
	);
}

export { isDev , getPreloadPath };
