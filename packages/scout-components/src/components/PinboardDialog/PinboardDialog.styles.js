import styled from "styled-components"

const Body = styled.ul`
  padding: 25px;
  list-style: none;
  background: ${props => props.theme.styles.pale};
  @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
    padding: 45px;
  }
  li:last-child {
    margin-bottom: 0px;
  }
`

const PrintLink = styled.a`
  margin-top: 25px;
  display: block;
  text-align: center;
  padding: 10px 25px;
  background: ${props => props.theme.styles.link};
  color: ${props => props.theme.styles.white};
  font-weight: bold;
  text-decoration: none;
  border: 3px solid ${props => props.theme.styles.link};
  &:hover {
    background: ${props => props.theme.styles.linkHover};
    border-color: ${props => props.theme.styles.linkHover};
  }
  &:active {
    background: ${props => props.theme.styles.linkActive};
    border-color: ${props => props.theme.styles.linkActive};
  }
  &:focus {
    outline: 3px solid ${props => props.theme.styles.focus};
  }
  @media screen and (min-width: ${props => props.theme.styles.breakpointS}) {
    display: inline-block;
    margin-right: 15px;
  }
`

const EmailButton = styled.button`
  margin-top: 15px;
  display: block;
  width: 100%;
  text-align: center;
  padding: 10px 25px;
  background: ${props => props.theme.styles.white};
  font-size: 1rem;
  cursor: pointer;
  color: ${props => props.theme.styles.link};
  font-weight: bold;
  text-decoration: none;
  border: 3px solid ${props => props.theme.styles.link};
  &:hover {
    color: ${props => props.theme.styles.linkHover};
    border-color: ${props => props.theme.styles.linkHover};
  }
  &:active {
    color: ${props => props.theme.styles.linkActive};
    border-color: ${props => props.theme.styles.linkActive};
  }
  &:focus {
    outline: 3px solid ${props => props.theme.styles.focus};
  }
  @media screen and (min-width: ${props => props.theme.styles.breakpointS}) {
    display: inline-block;
    margin-right: 15px;
    width: inherit;
  }
`

const Count = styled.span`
  font-weight: normal;
`

export { Body, PrintLink, EmailButton, Count }
