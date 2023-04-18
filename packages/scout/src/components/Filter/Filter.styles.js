import styled from "styled-components"

import tick from "./tick.svg"
import downArrow from "./down-arrow.svg"
import upArrow from "./up-arrow.svg"

const Input = styled.input`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 29px;
  height: 29px;
  opacity: 0;
  &:checked + label:after {
    position: absolute;
    content: "";
    display: block;
    height: 19px;
    width: 19px;
    left: 5px;
    top: 5px;
    background-image: url(${tick});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
`

const Outer = styled.fieldset`
  border: none;
  margin-bottom: 0px;
`

const Legend = styled.legend`
  font-weight: bold;
  color: ${props => props.theme.styles.text};
`

const Label = styled.label`
  color: ${props => props.theme.styles.text};
  cursor: pointer;
  &:before {
    content: "";
    display: inline-block;
    background: ${props => props.theme.styles.white};
    border: 2px solid ${props => props.theme.styles.text};
    width: 25px;
    height: 25px;
    position: absolute;
    left: 0px;
    top: 0px;
  }
`

const Field = styled.div`
  position: relative;
  margin-bottom: 10px;
  padding: 4.5px 0px 4.5px 40px;
  &:focus-within label:before {
    outline: 3px solid ${props => props.theme.styles.focus};
  }
`

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const UnfoldButton = styled.button`
  width: 100%;
  padding: 20px 0px;
  border: none;
  border-bottom: 1px solid ${props => props.theme.styles.cardShadow};
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  background: none;
  cursor: pointer;
  &:after {
    content: "";
    display: inline-block;
    height: 10px;
    width: 15px;
    margin-left: 10px;
    background-image: url(${upArrow});
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
  &[aria-expanded="true"]:after {
    background-image: url(${downArrow});
  }
  &:focus {
    outline: 3px solid ${props => props.theme.styles.focus};
  }
`

const Content = styled.div`
  padding: 25px 0px;
  border-bottom: 1px solid ${props => props.theme.styles.cardShadow};
`

export { Input, Outer, Legend, Label, Field, Header, UnfoldButton, Content }
