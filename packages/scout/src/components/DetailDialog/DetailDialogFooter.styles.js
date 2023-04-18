import styled from "styled-components"

import { DetailDialogStyles } from "./../../components"

const Footer = styled(DetailDialogStyles.Body)`
  text-align: center;
  padding: 25px;
  @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
    padding: 45px;
  }
  p {
    margin-bottom: 10px;
    &::last-of-type {
      margin-bottom: 0px;
    }
  }
`

const SuggestEditLink = styled.a`
  display: inline-block;
  text-decoration: none;
  color: ${props => props.theme.styles.link};
  padding: 7px 25px;
  text-align: center;
  border: 3px solid ${props => props.theme.styles.link};
  font-size: 1rem;
  background: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 200px;
  margin-bottom: 20px;
  &:focus {
    outline: none;
    box-shadow: 0px 0px 0px 3px ${props => props.theme.styles.focus};
  }
  &:hover {
    color: ${props => props.theme.styles.linkHover};
    border-color: ${props => props.theme.styles.linkHover};
  }
  &:active {
    color: ${props => props.theme.styles.linkActive};
    border-color: ${props => props.theme.styles.linkActive};
  }
`

export { Footer, SuggestEditLink }
