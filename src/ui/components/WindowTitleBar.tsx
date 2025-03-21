import { useEffect } from 'react'
import {xD} from '../js/core.js';

const TitleBar = () => {
    useEffect(() => {
        xD();
    }, []);

    return (
        <div id="titleBar">
            <div id="appName">
                <span id="windowtitle"></span>
            </div>
            <div id="ctrl-btn">
                <span id="minbtn">-</span>
                <span id="maxbtn">+</span>
                <span id="closebtn">x</span>
            </div>
        </div>
    );
};

export default TitleBar;
