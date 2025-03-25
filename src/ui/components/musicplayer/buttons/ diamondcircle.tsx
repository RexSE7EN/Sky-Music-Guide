import {GoCircle, GoDiamond} from "react-icons/go";

function DiamondCircle() {
    return (
        <div className="overlayIcons">
            <GoDiamond className="size-[100px]" />
            <GoCircle className="absolute size-[70px]" />
        </div>
    )
}

export default DiamondCircle
