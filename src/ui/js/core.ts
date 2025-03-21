export const titleWithVersion = () => {
	window.appAPI.getVersion().then(version => {
		const title = 'Sky Music Guide';
		const ver = 'v{version}';

		const tt = document.getElementById("title");
		const vv = document.getElementById("version");

		if (tt) {
			tt.textContent = title;
		}
		if (vv) {
			vv.textContent = ver.replace("{version}", version);
		}
	});
}

export const nodeVer = () => {
	window.appAPI.getNodeVersion().then(version => {
		const nodeVer = document.getElementById("node-version");
		if (nodeVer) {
			nodeVer.textContent = version;
		}
	});
}

export const chromeVer = () => {
	window.appAPI.getChromeVersion().then(version => {
		const chromeVer = document.getElementById("chrome-version");
		if (chromeVer) {
			chromeVer.textContent = version;
		}
	});
}

export const electronVer = () => {
	window.appAPI.getElectronVersion().then(version => {
		const electronVer = document.getElementById("electron-version");
		if (electronVer) {
			electronVer.textContent = version;
		}
	});
}

export const openWindow = () => {
	const openWindowBtn = document.getElementById("openWindowBtn");
	if (openWindowBtn) {
		openWindowBtn.addEventListener('click', () => {
			window.electron.openNewWindow("xD");
			// const res = window.electron.openPopupWindow("LOL", "Close this window?");
			// res.then(r => console.log(r));
		});
	}
}

export const controlMenu = () => {
	// title
	const closebtn = document.getElementById("closebtn");
	if (closebtn) {
		closebtn.addEventListener('click', () => {
			window.electron.closeWindow();
		});
	}

	const minbtn = document.getElementById("minbtn");
	if (minbtn) {
		minbtn.addEventListener('click', () => {
			window.electron.minimizeWindow();
		});
	}

	const maxbtn = document.getElementById("maxbtn");
	if (maxbtn) {
		maxbtn.addEventListener('click', () => {
			window.electron.maximizeWindow();
		});
	}

}
