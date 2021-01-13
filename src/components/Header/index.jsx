import React from "react"
import styled from "styled-components"
import theme from "../_theme"
import logo from "./logo.svg"

const Outer = styled.header`
  background: ${theme.link};
  color: ${theme.white};
  padding: 10px ${theme.outerSpacing};
`

const Inner = styled.div`
  max-width: ${theme.maxWidth};
  margin-left: auto;
  margin-right: auto;
  @media screen and (min-width: ${theme.breakpointM}) {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`

const MastheadArea = styled.div`
  margin-bottom: 10px;
  @media screen and (min-width: ${theme.breakpointM}) {
    width: 33%;
    display: inline-block;
    margin-bottom: 0px;
  }
`

const LogoLink = styled.a`
  outline: none;
  &:focus-within img {
    outline: 3px solid ${theme.focus};
  }
`

const Logo = styled.img`
  height: 40px;
  @media screen and (min-width: ${theme.breakpointM}) {
    height: 45px;
  }
`

const ServiceNameArea = styled.nav`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
  @media screen and (min-width: ${theme.breakpointM}) {
    margin-bottom: 0px;
  }
`

const ServiceName = styled.a`
  font-weight: bold;
  font-size: 1.1rem;
  color: ${theme.white};
  text-decoration: none;
  @media screen and (min-width: ${theme.breakpointM}) {
    font-size: 1.5rem;
  }
  &:hover {
    text-decoration: underline;
  }
  &:focus {
    outline: 3px solid ${theme.focus};
    background: ${theme.focus};
    color: ${theme.text};
  }
`

const PhaseTag = styled.strong`
  color: ${theme.text};
  background: ${theme.focus};
  text-transform: uppercase;
  font-weight: bold;
  padding: 2px 5px;
  margin-left: 10px;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  text-decoration: none !important;
`

const Header = () => (
  <Outer>
    <Inner>
      <MastheadArea>
        <LogoLink href="https://www.buckinghamshire.gov.uk/">
          <Logo src={logo} alt="Buckinghamshire Council" />
        </LogoLink>
      </MastheadArea>
      <ServiceNameArea>
        <ServiceName href="#">Family information service</ServiceName>
        <PhaseTag>Beta</PhaseTag>
      </ServiceNameArea>
    </Inner>
  </Outer>
)

export default Header
