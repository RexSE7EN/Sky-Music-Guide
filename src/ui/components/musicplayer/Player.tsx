import { useEffect, useState } from "react";
import '../../css/app.css'

function Player() {
    const [song, setSong] = useState("");
    const [songData, setSongData] = useState({});
    const [isPlayingSong, setIsPlayingSong] = useState(false);
    const [instrument, setInstrument] = useState("");

	const [winID, setWinID] = useState(-1);
    // const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        setSong("Test Song");
        setSongData({song: "Test Song", artist: "Test Artist", year: "2021"});
        setInstrument("Test Instrument");
    }, []);

    useEffect(() => {
		if (isPlayingSong) {
			console.log("isPlayingSong:", isPlayingSong);
			console.log("Instrument:", instrument);
			console.log("Song:", song);
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
				<button onClick={async () => {
						const windowId = await window.electron.openNewWindow("Music Player", "InstrumentOverlay", 800, 500, true, true, true);
						setWinID(windowId);
						console.log("New window ID:", windowId);
					}
				}>Launch Player</button> <br/>
                <button onClick={() => {
                        
						setTimeout(() => {
                            const data:args = {
                                instrument,
                                song,
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