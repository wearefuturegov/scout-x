import styled from "styled-components"

import tick from "./tick.svg"

import { theme } from "./../../themes/theme_generator"

const smallSwitch = {
  label: {
    after: {
      width: "45px",
      height: "25px",
    },
    before: {
      right: "23px",
      width: "17px",
      height: "17px",
    },
  },
  checked: "19px",
  tickSize: "10px",
}

const largeSwitch = {
  label: {
    after: {
      width: "85px",
      height: "45px",
    },
    before: {
      right: "43px",
      width: "37px",
      height: "37px",
    },
  },
  checked: "39px",
  tickSize: "20px",
}

const switchSize = theme.mapSwitchSmall ? smallSwitch : largeSwitch

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
      transform: translateX(${switchSize.checked});
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
  font-weight: bold;
  &:after {
    content: "";
    display: block;
    margin-left: 10px;
    width: ${switchSize.label.after.width};
    height: ${switchSize.label.after.height};
    background: ${props => props.theme.styles.toggleColor};
    border-radius: 100px;
  }
  &:before {
    content: "";
    transition: 0.1s ease-out;
    display: block;
    position: absolute;
    top: 4px;
    right: ${switchSize.label.before.right};
    width: ${switchSize.label.before.width};
    height: ${switchSize.label.before.height};
    background: ${props => props.theme.styles.white};
    border-radius: 100%;
    background-image: url(${tick});
    background-size: ${switchSize.tickSize};
    background-position: center;
    background-repeat: no-repeat;
  }
  &:hover:after {
    background: ${props => props.theme.styles.toggleColor};
  }
`

export { Outer, Input, Label }
