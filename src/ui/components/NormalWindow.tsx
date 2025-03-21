import { useEffect, useState } from "react";
import '../css/app.css'
import WindowTitleBar from "./WindowTitleBar.tsx";

function Normal() {
    const [title, setTitle] = useState("");
    const [windowContent, setWindowContent] = useState("");

    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const handleMessage = (res: unknown) => {
            console.log('Received from Electron:', res);
            const { title, windowContent } = res as { title: string, windowContent: string };
            setTitle(title);
            setWindowContent(windowContent);
        };

        window.electron.receiveMessage('create-window-message', handleMessage);

        console.log('title:', title);
        console.log('content:', windowContent);

        setIsReady(true);

        return () => {
            window.electron.removeListeners('create-window-message', handleMessage);
        };

    }, []);

    useEffect(() => {
        if (isReady) {
            window.electron.showWindow();
        }
    }, [isReady]);

    return (
        <div id="borderarea">
            <WindowTitleBar title={title} type={"normal"}/>
            <div>
                <br/>
                <br/>
                <br/>
                {windowContent}
            </div>
        </div>
    );
}

export default Normal;