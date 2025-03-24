import { useEffect, useState } from "react";
import '../../css/app.css'
import WindowTitleBar from "./WindowTitleBar.tsx";
import OverlayTitleBar from "./OverlayTitleBar.tsx";
import InstrumentOverlay from "../musicplayer/InstrumentOverlay.tsx";

function getTitleBar(content: string, title: string) {
    if (content === "InstrumentOverlay") {
        return <OverlayTitleBar />
    }else {
        return <WindowTitleBar title={title} type={"normal"}/>
    }
}

function loadcontent(content: string) {
    console.log('Loading content:', content);
    switch(content) {
        case "InstrumentOverlay":
            return <InstrumentOverlay/>;
        default:
            return (
                <>
                    <br/>
                    <br/>
                    <br/>
                   <p> Default content </p>
                </>
            );
    }
}

function Normal() {
    const [title, setTitle] = useState("");
    const [windowContent, setWindowContent] = useState("");
    const [element, setElement] = useState(<></>);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const handleMessage = (res:args) => {
            console.log('Received from Electron:', res);
            const { title, windowContent } = res as { title: string, windowContent: string };
            setTitle(title);
            setWindowContent(windowContent);
			setElement(loadcontent(windowContent));
            setIsReady(true);
        };

        window.electron.receiveMessage('create-window-message', handleMessage);

        return () => {
            window.electron.removeListeners('create-window-message', handleMessage);
        };

    }, []);

    useEffect(() => {
        if (isReady) {
            console.log('title:', title);
            console.log('content:', windowContent);
            console.log('element:', element);
            window.electron.showWindow();
        }
    }, [element, isReady, title, windowContent]);

    return (
        <div id="borderarea">
            {getTitleBar(windowContent, title)}
            <div id = "displayarea">
                {element}
            </div>
        </div>
    );
}

export default Normal;