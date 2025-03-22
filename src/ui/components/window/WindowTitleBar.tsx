import { useEffect } from 'react'
import { controlMenu } from '../../js/core.ts';

function getControls ({type}: {type:string}) {
    if (type === "popup") {
        return (
            <div id="ctrl-btn">
                <span id="closebtn">x</span>
            </div>
        );
    }
    return (
        <div id="ctrl-btn">
            <span id="minbtn">-</span>
            <span id="maxbtn">+</span>
            <span id="closebtn">x</span>
        </div>
    );
}

function WindowTitleBar ({title, type}:{title:string, type:string}){
    useEffect(() => {
        controlMenu();
    }, []);

    return (
        <div id="titleBar">
            <div id="appName">
                <span id="windowtitle">{title}</span>
            </div>
            {getControls({type})};
        </div>
    );
};

export default WindowTitleBar;
