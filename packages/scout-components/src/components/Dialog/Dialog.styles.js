import styled from "styled-components"
import "@reach/dialog/styles.css"

const Icon = styled.img`
  width: 30px;
  height: 30px;
`

const CloseButton = styled.button`
  position: absolute;
  right: 5px;
  top: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  &:hover {
    background: ${props => props.theme.styles.pale};
  }
  &:focus {
    outline: 3px solid ${props => props.theme.styles.focus};
  }
`

const Header = styled.header`
  padding: 25px;
  @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
    padding: 45px;
  }
`

const Body = styled.div`
  padding: 25px;
  @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
    padding: 45px;
  }
  &:nth-of-type(even) {
    background: ${props => props.theme.styles.pale};
  }
`

const Title = styled.h1`
  color: ${props => props.theme.styles.text};
  margin-bottom: 0px;
  font-size: 1.5rem;
  @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
    font-size: 2rem;
  }
`

export { Icon, CloseButton, Header, Body, Title }
