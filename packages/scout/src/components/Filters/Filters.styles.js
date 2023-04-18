import styled from "styled-components"

import downArrow from "./down-arrow.svg"
import upArrow from "./up-arrow.svg"

const Outer = styled.section`
  margin-bottom: 25px;

  fieldset:first-of-type {
    margin-top: 20px;
    @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
      margin-top: 0px;
    }
  }

  @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
    margin-bottom: 0px;
  }
`

const Inner = styled.div`
  display: ${props => (props.open ? "block" : "none")};
  @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
    display: block;
  }
`

const Button = styled.button`
  width: 100%;
  padding: 10px 0px;
  text-align: left;
  color: ${props => props.theme.styles.text};
  font-size: 1.1rem;
  margin-top: 0px;
  border: none;
  background: none;
  border-bottom: 4px solid ${props => props.theme.styles.text};
  font-weight: bold;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  &:focus {
    outline: 3px solid ${props => props.theme.styles.focus};
  }
  &:active {
    color: ${props => props.theme.styles.text};
  }
  &:after {
    content: "";
    display: inline-block;
    width: 18px;
    height: 18px;
    background-image: url(${upArrow});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
  &[aria-expanded="true"]:after {
    background-image: url(${downArrow});
  }
  @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
    display: none;
  }
`

export { Outer, Inner, Button }
