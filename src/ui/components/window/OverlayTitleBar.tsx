import { useEffect } from 'react'
import { controlMenu } from '../../js/core.ts';

function OverlayTitleBar (){
    useEffect(() => {
        controlMenu();
    }, []);

    return (
        <div id="otitleBar">
            <div id="ctrl-btn">
                <span id="closebtn">x</span>
            </div>
        </div>
    );
};

export default OverlayTitleBar;
