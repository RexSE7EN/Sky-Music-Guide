import { useEffect, useState } from "react";
import '../../css/app.css'
import ButtonOverlay from "./buttons/ButtonOverlay.tsx";

function InstrumentOverlay() {
    const [instrument, setInstrument] = useState("");
    const [songData, setSongData] = useState<{ song: string, artist: string, year: string }>({ song: "", artist: "", year: "" });
    const [isPlayingSong, setIsPlayingSong] = useState(false);

    useEffect(() => {
        const sss = (res:args) => {
            const { instrument, songData, isPlayingSong } = res as { instrument:string, songData:{ song: string, artist: string, year: string }, isPlayingSong:boolean };
            setInstrument(instrument);
            setSongData(songData);
            setIsPlayingSong(isPlayingSong);
        };

		window.electron.logMessage('Adding listener for music-info');

        window.electron.receiveMessage('music-info', sss);

        return () => {
            window.electron.removeListeners('music-info', sss);
        };

    }, []);


    return (
        <>
            <br/>
            <div className="overlayContainer">
                <ButtonOverlay type = "diamondcircle" active={false} />
                <ButtonOverlay type = "diamond"  active={false} />
                <ButtonOverlay type = "circle"  active={true} />
                <ButtonOverlay type = "diamond"  active={false} />
                <ButtonOverlay type = "circle"  active={true} />

                <ButtonOverlay type = "circle" />
                <ButtonOverlay type = "diamond" />
                <ButtonOverlay type = "diamondcircle" />
                <ButtonOverlay type = "diamond" />
                <ButtonOverlay type = "circle" />

                <ButtonOverlay type = "circle" />
                <ButtonOverlay type = "diamond" />
                <ButtonOverlay type = "circle" />
                <ButtonOverlay type = "diamond" />
                <ButtonOverlay type = "diamondcircle" />

            </div>
            {instrument}
        </>
    );
}

export default InstrumentOverlay;