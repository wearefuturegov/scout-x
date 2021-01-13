import styled from "styled-components"
import theme from "../_theme"
import downArrow from "./down-arrow.svg"
import upArrow from "./up-arrow.svg"

export const Outer = styled.fieldset`
  border: none;
  margin-bottom: 0px;
`

export const Header = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const UnfoldButton = styled.button`
  width: 100%;
  padding: 20px 0px;
  border: none;
  border-bottom: 1px solid ${theme.cardShadow};
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
    outline: 3px solid ${theme.focus};
  }
`

export const Legend = styled.legend`
  font-weight: bold;
  color: ${theme.text};
`

export const Content = styled.div`
  padding: 25px 0px;
  border-bottom: 1px solid ${theme.cardShadow};
`

export const Field = styled.div`
  position: relative;
  margin-bottom: 10px;
  padding: 4.5px 0px 4.5px 40px;
  &:focus-within label:before {
    outline: 3px solid ${theme.focus};
  }
`

export const Label = styled.label`
  color: ${theme.text};
  cursor: pointer;
  &:before {
    content: "";
    display: inline-block;
    background: ${theme.white};
    border: 2px solid ${theme.text};
    width: 25px;
    height: 25px;
    position: absolute;
    left: 0px;
    top: 0px;
  }
`
