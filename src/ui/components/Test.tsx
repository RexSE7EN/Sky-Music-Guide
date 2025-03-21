import { useEffect, useState } from "react";
import '../css/app.css'
import WindowTitleBar from "./WindowTitleBar.tsx";

function Popup() {
    const [message, setMessage] = useState("No message provided");

    useEffect(() => {
        // Extract hash fragment and query params
        const hash = window.location.hash;
        const queryString = hash.includes("?") ? hash.split("?")[1] : "";
        const params = new URLSearchParams(queryString);

        // Update state with extracted values
        const newMessage = params.get("message") || "No message provided";

        setMessage(decodeURIComponent(newMessage));
    }, []);

    return (
        <div id="borderarea">
            <WindowTitleBar/>
            <div>
                <p id="popupmessage">{message}</p>
            </div>
        </div>
    );
}

export default Popup;