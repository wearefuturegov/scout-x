import React from "react"
import styled from "styled-components"
import theme from "../_theme"
import ogl from "./ogl.svg"

const Outer = styled.footer`
  background: ${theme.text};
  padding: 30px ${theme.outerSpacing} 50px ${theme.outerSpacing};
  @media screen and (min-width: ${theme.breakpointM}) {
    padding: 30px ${theme.outerSpacing} 60px ${theme.outerSpacing};
    font-size: 0.85rem;
  }

  * {
    color: ${theme.white};
  }

  a {
    text-decoration: underline;
    &:hover {
      text-decoration: none;
    }
    &:focus {
      outline: 3px solid ${theme.focus};
      background: ${theme.focus};
      color: ${theme.text};
    }
    &:active {
      color: ${theme.text};
    }
  }
`

const Inner = styled.div`
  max-width: ${theme.maxWidth};
  margin-left: auto;
  margin-right: auto;
`

const Nav = styled.nav`
  line-height: 2;
`

const NavLink = styled.a`
  display: inline-block;
  margin-right: 15px;
`

const License = styled.p`
  margin: 40px 0px;
  img {
    display: block;
    margin-bottom: 10px;
  }
`

const Copyright = styled.p``

const Footer = ({ children }) => (
  <Outer>
    <Inner>
      <Nav>
        <NavLink href="https://familyinfo.buckinghamshire.gov.uk/about/">
          About the Buckinghamshire Family Information Service
        </NavLink>
        <NavLink href="https://familyinfo.buckinghamshire.gov.uk/accessibility-statement-/">
          Accessibility statement
        </NavLink>
        <NavLink href="https://familyinfo.buckinghamshire.gov.uk/privacy-policy/">
          Privacy policy
        </NavLink>
        <NavLink href="https://www.buckinghamshire.gov.uk/about/cookies/">
          Cookies
        </NavLink>
        <NavLink href="https://familyinfo.buckinghamshire.gov.uk/publiccustomer-disclaimer/">
          Public and customer disclaimer
        </NavLink>
      </Nav>
      <License>
        <img src={ogl} alt="Open Government License" />
        All content is available under the{" "}
        <a href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/">
          Open Government Licence v3.0
        </a>
        , except where otherwise stated
      </License>
      <Copyright>
        © {new Date().getFullYear()} Buckinghamshire Council
      </Copyright>
    </Inner>
  </Outer>
)

export default Footer
