import { useEffect, useState } from "react";
import '../../css/app.css'

function Player() {
    const [songData, setSongData] = useState({});
    const [isPlayingSong, setIsPlayingSong] = useState(false);
    const [instrument, setInstrument] = useState("");

    const [playerOverlay, setPlayerOverlay] = useState(false);
	const [winID, setWinID] = useState(-1);

    // const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (winID > -1) {
            if (window.electron.windowExists(winID)) { setPlayerOverlay(true); return; }
        }
        setPlayerOverlay(false);
    }, [winID]);

    useEffect(() => {
        setSongData({song: "Test Song", artist: "Test Artist", year: "2021"});
        setInstrument("Test Instrument");

        const playerHookUpdate = (res:args) => {
            const { winID } = res as { winID:number };
            setWinID(winID);
        };

        window.electron.receiveMessage('player-overlay-update', playerHookUpdate);

        return () => {
            window.electron.removeListeners('player-overlay-update', playerHookUpdate);
        };

    }, []);

    useEffect(() => {
		if (isPlayingSong) {
			console.log("isPlayingSong:", isPlayingSong);
			console.log("Instrument:", instrument);
			console.log("Song Data:", songData);
		}
    }, [isPlayingSong]);

    return (
        <>
        {/* <div id="borderarea">*/}
        {/*     <div id = "displayarea">*/}
                <br/>
                {instrument}
            <br/>
                {playerOverlay.toString()}
            <br/>
                {winID}
                <br/>
				<button onClick={async () => {
						const windowId = await window.electron.openNewWindow("Music Player", "InstrumentOverlay", 800, 500, true, false, true, false);
						setWinID(windowId);
						console.log("New window ID:", windowId);
					}
				}>Launch Player</button> <br/>
                <button onClick={() => {
                        
						setTimeout(() => {
                            const data:args = {
                                instrument,
                                songData,
                                isPlayingSong
                            };

							window.electron.forwardMessage(winID, 'music-info', data);
                            console.log("Sent music info");
                        }, 250);

                        setIsPlayingSong(!isPlayingSong);
                        console.log("Playing song");
                    }
                }>Play</button>
        {/*     </div>*/}
        {/* </div>*/}
        </>
    );
}

export default Player;