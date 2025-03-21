export const xD = () => {
	// title
	window.appAPI.getVersion().then(version => {	
		const title = 'Sky Music Guide';
		const ver = 'v{version}';

		const tt = document.getElementById("title");
		const vv = document.getElementById("version");

		if (tt && vv) {
			tt.textContent = title;
			vv.textContent = ver.replace("{version}", version);
		}
	});

	// window.appAPI.getVersion().then(version => {
	// 	const urlParams = new URLSearchParams(window.location.search);
	// 	const title = (urlParams.has('title')) ? urlParams.get('title') : 'Sky Music Guide v{version}';
	// 	const tt = document.getElementById("title");
	// 	if (tt && title) tt.textContent = title.replace("{version}", version);
	// });

	window.appAPI.getNodeVersion().then(version => {
		const nodeVer = document.getElementById("node-version");
		if (nodeVer) {
			nodeVer.textContent = version;
		}
	});

	window.appAPI.getChromeVersion().then(version => {
		const chromeVer = document.getElementById("chrome-version");
		if (chromeVer) {
			chromeVer.textContent = version;
		}
	});

	window.appAPI.getElectronVersion().then(version => {
		const electronVer = document.getElementById("electron-version");
		if (electronVer) {
			electronVer.textContent = version;
		}
	});

	const openWindowBtn = document.getElementById("openWindowBtn");
	if (openWindowBtn) {
		openWindowBtn.addEventListener('click', () => {
			// window.electron.openNewWindow("xD");
			const res = window.electron.openPopupWindow("LOL", "Close this window?");
			res.then(r => console.log(r));
		});
	}

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

	const w_title = document.getElementById("windowtitle");
	if (w_title) {
		// Extract query params from the URL
		const hash = window.location.hash;
		const queryString = hash.includes("?") ? hash.split("?")[1] : "";
		const params = new URLSearchParams(queryString);

		// Get the title parameter and update the state
		const newTitle = params.get("title") || "Default Title";
		w_title.textContent = decodeURIComponent(newTitle);
	}
}
