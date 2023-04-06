import styled from "styled-components"

import upArrow from "./up-arrow.svg"
import downArrow from "./down-arrow.svg"
import { A, TickList } from "./../../"

const Outer = styled.article`
  color: ${props => props.theme.styles.text};
  p {
    line-height: 1.4;
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0px;
    }
  }
`

const Link = styled(A)`
  font-weight: bold;
`

const Button = styled.button`
  color: ${props => props.theme.styles.link};
  font-size: 1rem;
  font-weight: bold;
  border: none;
  background: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  &:active {
    color: ${props => props.theme.styles.text};
  }
  &:focus {
    background: ${props => props.theme.styles.focus};
    outline: 3px solid ${props => props.theme.styles.focus};
  }
  &:after {
    content: "";
    margin-left: 5px;
    display: inline-block;
    width: 12px;
    height: 9px;
    background-image: url(${downArrow});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
  &[aria-expanded="true"]:after {
    background-image: url(${upArrow});
  }
`

const Panel = styled.div`
  margin-bottom: 25px;
`

const Subheading = styled.h3`
  margin-top: 30px;
  margin-bottom: 15px;
  color: ${props => props.theme.styles.text};
  @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
    margin-top: 45px;
  }
`

const List = styled(TickList)`
  margin-top: 0px;
  margin-bottom: 25px;
  list-style: none;
  @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 35px;
  }
`

const Response = styled.div`
  margin-bottom: 25px;
  p {
    margin-bottom: 5px;
  }
`

export { Outer, Link, Subheading, List, Response, Panel, Button }
