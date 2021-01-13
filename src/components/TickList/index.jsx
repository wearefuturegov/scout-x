import styled from "styled-components"
import tick from "./tick.svg"

export const TickList = styled.ul`
  list-style: none;
`

export const TickListItem = styled.li`
  position: relative;
  line-height: 1.5;
  padding-left: 30px;
  margin-bottom: 10px;
  &:before {
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
  &:last-of-type {
    margin-bottom: 0px;
  }
`
