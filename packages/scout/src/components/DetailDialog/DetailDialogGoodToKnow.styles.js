import styled from "styled-components"

import { TickList } from "./../../components"

const TwoColumnTickList = styled(TickList)`
  margin-top: 25px;
  list-style: none;
  @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 35px;
  }
`
export { TwoColumnTickList }
