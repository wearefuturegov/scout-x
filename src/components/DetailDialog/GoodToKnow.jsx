import React from "react"
import styled from "styled-components"
import theme from "../_theme"
import tick from "./tick.svg"
import { 
    daysSince, 
    openWeekends, 
    wheelchairAccessible, 
    openAfterSix 
} from "../../lib/utils"

const List = styled.ul`
    margin-top: 25px;
    list-style: none;
    @media screen and (min-width: ${theme.breakpointM}) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 35px;
    }
`

const Item = styled.li`
    position: relative;
    line-height: 1.5;
    padding-left: 30px;
    margin-bottom: 10px;
    &:before{
        content: "";
        display: inline-block;
        width: 15px;
        height: 12px;
        background-image: url(${tick});
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        position: absolute;
        left: 0px;
        top: 5px;
    }
    &:last-of-type{
        margin-bottom: 0px;
    }
`

export const A = styled.a`
    color: ${theme.link};
    &:hover{
        text-decoration: none;
    }
    &:focus{
        background: ${theme.focus};
        outline: 3px solid ${theme.focus};
    }
    &:active{
        color: ${theme.text};
    }
`

const GoodToKnow = ({
    pick_up_drop_off_service,
    needs_referral,
    referral_url,
    local_offer,
    current_vacancies,
    free,
    locations,
    regular_schedules,
    updated_at
}) => 
    <List>
        {local_offer && <Item>Part of the Buckinghamshire local offer for SEND</Item>}
        {pick_up_drop_off_service && <Item>Offers pick-up/drop-off service from nearby schools</Item>}
        {needs_referral && 
            <Item>
                Needs a referral<br/>
                {referral_url && <A href={referral_url}>Details</A>}
            </Item>
        }
        {wheelchairAccessible(locations) && <Item>Wheelchair accessible</Item>}
        {current_vacancies && <Item>Spaces for new children</Item>}
        {free && <Item>Free</Item>}
        {(daysSince(updated_at) < 30) && <Item>Recently updated</Item>}
        {openWeekends(regular_schedules) && <Item>Open weekends</Item>}
        {openAfterSix(regular_schedules) && <Item>Open after 6pm</Item>}
    </List>

export default GoodToKnow