import styled from "styled-components"

import downArrow from "./down-arrow.svg"
import upArrow from "./up-arrow.svg"

import { TickList } from "./../../"

const Outer = styled.div`
  margin-top: 30px;
  @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
    margin-top: 40px;
  }
`

const Crosshead = styled.h2`
  margin-bottom: 5px;
  color: ${props => props.theme.styles.text};
`

const Button = styled.button`
  position: relative;
  display: block;
  width: 100%;
  border: none;
  text-align: left;
  border-bottom: 1px solid ${props => props.theme.styles.cardShadow};
  font-size: 1rem;
  background: none;
  padding: 15px 0px;
  padding-right: 30px;
  color: ${props => props.theme.styles.text};
  cursor: pointer;
  &:focus {
    outline: 3px solid ${props => props.theme.styles.focus};
  }
  &:after {
    content: "";
    display: inline-block;
    width: 18px;
    height: 18px;
    background-image: url(${downArrow});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    position: absolute;
    right: 0px;
    top: 20px;
  }
  &[aria-expanded="true"] {
    &:after {
      background-image: url(${upArrow});
    }
  }
`

const Panel = styled.div`
  padding: 20px 0px;
  div:first-child {
    margin-bottom: 25px;
  }
  &[hidden] {
    display: none;
  }
  @supports (display: grid) {
    @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 35px;
      div:first-child {
        margin-bottom: 0px;
      }
    }
  }
`

const MapContainer = styled.section`
  height: 200px;
  width: 100%;
  background: ${props => props.theme.styles.pale};
  .map {
    height: 100%;
  }
`

const StaticMapContainer = styled.section`
  height: 200px;
  width: 100%;
  background: ${props => props.theme.styles.pale};
  .map {
    height: 100%;
  }
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    flex-shrink: 0;
    min-width: 100%;
    min-height: 100%;
  }
`

// @TODO
// const TickListWithTopMargin = styled(TickList)`
const TickListWithTopMargin = styled.ul`
  list-style: none;
  margin-top: 25px;
`

export {
  Outer,
  Crosshead,
  Button,
  Panel,
  TickListWithTopMargin,
  MapContainer,
  StaticMapContainer,
}
