import React from "react"
import { PinboardContextConsumer } from "../../contexts/pinboardContext"

const Pinboard = ({
    pinboard,
    addToPinboard,
    removeFromPinboard
}) => pinboard.length > 0 ?
    <button>Pinned items ({pinboard.length})</button>
    :
    null

export default props =>
    <PinboardContextConsumer>
        {pinContext => 
            <Pinboard
                {...pinContext} 
                {...props}
            />
        }
    </PinboardContextConsumer>