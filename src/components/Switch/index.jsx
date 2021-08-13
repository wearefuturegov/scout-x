import React from "react"
import styled from "styled-components"

import tick from "./tick.svg"

const Outer = styled.div`
  display: inline-block;
  &:focus-within label:after {
    box-shadow: 0px 0px 0px 3px ${props => props.theme.styles.focus};
  }
`

const Input = styled.input`
  position: absolute !important;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px 1px 1px 1px);
  clip: rect(1px, 1px, 1px, 1px);
  white-space: nowrap;
  &:checked + label {
    &:before {
      transform: translateX(19px);
      background-color: ${props => props.theme.styles.link};
    }
    &:after {
      background: ${props => props.theme.styles.linkBackground};
    }
  }
`

const Label = styled.label`
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 0.9rem;
  color: ${props => props.theme.styles.grey};
  &:after {
    content: "";
    display: block;
    margin-left: 10px;
    width: 45px;
    height: 25px;
    background: ${props => props.theme.styles.cardShadow};
    border-radius: 100px;
  }
  &:before {
    content: "";
    transition: 0.1s ease-out;
    display: block;
    position: absolute;
    top: 4px;
    right: 23px;
    width: 17px;
    height: 17px;
    background: ${props => props.theme.styles.white};
    border-radius: 100%;
    background-image: url(${tick});
    background-size: 10px;
    background-position: center;
    background-repeat: no-repeat;
  }
  &:hover:after {
    background: ${props => props.theme.styles.cardShadow};
  }
`

const Switch = ({ checked, onChange, id, label }) => (
  <Outer>
    <Input type="checkbox" onChange={onChange} checked={checked} id={id} />
    <Label htmlFor={id}>{label}</Label>
  </Outer>
)

export default Switch
