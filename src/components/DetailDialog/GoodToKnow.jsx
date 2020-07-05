import React from "react"
import styled from "styled-components"
import theme from "../_theme"
import A from "../A"
import { 
    daysSince, 
    openWeekends, 
    wheelchairAccessible, 
    openAfterSix 
} from "../../lib/utils"
import { 
    TickList, 
    TickListItem as Item 
} from "../TickList"

const List = styled(TickList)`
    margin-top: 25px;
    list-style: none;
    @media screen and (min-width: ${theme.breakpointM}) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 35px;
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