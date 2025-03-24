import { useEffect, useState } from "react";
import '../../css/app.css'

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
            This is the Instrument Overlay
            <br/>
            {instrument} <br/>
            {songData.song} <br/>
            {songData.artist} <br/>
            {songData.year} <br/>
            {isPlayingSong} <br/>
        </>
    );
}

export default InstrumentOverlay;