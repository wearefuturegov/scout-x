import React from "react"
import styled from "styled-components"
import theme from "../_theme"
import { Link } from "@reach/router"
import { PinboardContextConsumer } from "../../contexts/pinboardContext"

const StyledLink = styled(Link)`
    display: block;
    text-align: center;
    padding: 10px;
    /* background: ${theme.cardShadow}; */
    border: 2px solid ${theme.link};
    margin-bottom: 25px;
    color: ${theme.link};
    font-weight: bold;
    text-decoration: none;
    &:hover{
        color: ${theme.linkHover};
        border-color: ${theme.linkHover};
    }
    &:active{
        color: ${theme.linkActive};
        border-color: ${theme.linkActive};
    }
    &:focus{
        outline: 3px solid ${theme.focus};
    }
`

const Count = styled.span`
    margin-left: 5px;
    font-weight: normal;
`

const PinboardLink = ({
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
            <PinboardLink
                {...pinContext} 
                {...props}
            />
        }
    </PinboardContextConsumer>