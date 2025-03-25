import { useState } from "react";

import Circle from "./circle.tsx";
import Diamond from "./diamond.tsx";
import DiamondCircle from "./ diamondcircle.tsx";


const getComponent = (type:string) => {
    switch (type) {
        case "circle":
            return <Circle />;
        case "diamond":
            return <Diamond />;
        case "diamondcircle":
            return <DiamondCircle />;
        default:
            return "???";
    }
}

function ButtonOverlay( {type, active}:{type:string, active:boolean } ) {
    const [isActive, setIsActive] = useState(false);

    return (
        <div className={`w-25 h-25 ${isActive ? 'bg-blue-500' : '' }`}>
            {getComponent(type)};
        </div>
    )
}

export default ButtonOverlay
