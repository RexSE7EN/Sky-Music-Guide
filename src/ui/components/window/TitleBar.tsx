import { useEffect } from 'react'
import {controlMenu, titleWithVersion} from '../../js/core.ts';

const TitleBar = () => {
    useEffect(() => {
        titleWithVersion();
        controlMenu();
    }, []);

    return (
        <div id="titleBar">
            <div id="appName">
                <img id="appLogo" src="/assets/logo/appicon.png" className='w-[25px] h-[25px]'></img>
                <span id="title"></span>
                <span id="version"></span>
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
