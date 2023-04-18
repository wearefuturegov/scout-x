import upArrow from "./up-arrow.svg"
import downArrow from "./down-arrow.svg"

import styled from "styled-components"

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

export { Outer, Button }
