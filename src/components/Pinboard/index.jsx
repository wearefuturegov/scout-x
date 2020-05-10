import React from "react"
import styled from "styled-components"
import theme from "../_theme"
import { Link } from "@reach/router"
import { PinboardContextConsumer } from "../../contexts/pinboardContext"

const StyledLink = styled(Link)`
    display: block;
    text-align: center;
    padding: 10px;
    background: ${theme.cardShadow};
    margin-bottom: 25px;
    color: ${theme.text};
    font-weight: bold;
    text-decoration: none;
    &:focus{
        outline: 3px solid ${theme.focus};
    }
`

const Count = styled.span`
    margin-left: 5px;
    font-weight: normal;
`

const Pinboard = ({
    pinboard
}) => pinboard.length > 0 ?
    <StyledLink to="/pinboard">
        See pinned services
        <Count>({pinboard.length})</Count>
    </StyledLink>
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