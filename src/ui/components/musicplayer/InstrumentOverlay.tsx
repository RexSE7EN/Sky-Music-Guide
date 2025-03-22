import { useEffect, useState } from "react";
import '../../css/app.css'

function InstrumentOverlay() {
    const [instrument, setInstrument] = useState("");
    const [song, setSong] = useState("");
    const [songData, setSongData] = useState({});
    const [isPlayingSong, setIsPlayingSong] = useState(false);

    useEffect(() => {
        const sss = (res:args) => {
            const { instrument, song, songData, isPlayingSong } = res as { instrument:string, song:string, songData:object, isPlayingSong:boolean };
            setInstrument(instrument);
            setSong(song);
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
            This is the Instrument Overlay
            <br/>
            {instrument} <br/>
            {song} <br/>
            {songData} <br/>
            {isPlayingSong} <br/>
        </>
    );
}

export default InstrumentOverlay;