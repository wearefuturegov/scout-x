import styled from "styled-components"

export const Outer = styled.footer`
  background: ${props => props.theme.styles.text};
  padding: 30px ${props => props.theme.styles.outerSpacing} 50px
    ${props => props.theme.styles.outerSpacing};
  @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
    padding: 30px ${props => props.theme.styles.outerSpacing} 60px
      ${props => props.theme.styles.outerSpacing};
    font-size: 0.85rem;
  }

  * {
    color: ${props => props.theme.styles.white};
  }

  a {
    text-decoration: underline;
    &:hover {
      text-decoration: none;
    }
    &:focus {
      outline: 3px solid ${props => props.theme.styles.focus};
      background: ${props => props.theme.styles.focus};
      color: ${props => props.theme.styles.text};
    }
    &:active {
      color: ${props => props.theme.styles.text};
    }
  }
`

export const Inner = styled.div`
  max-width: ${props => props.theme.styles.maxWidth};
  margin-left: auto;
  margin-right: auto;
`

export const Nav = styled.nav`
  line-height: 2;
`

export const NavLink = styled.a`
  display: inline-block;
  margin-right: 15px;
`

export const License = styled.p`
  margin: 40px 0px;
  img {
    display: block;
    margin-bottom: 10px;
  }
`

export const Copyright = styled.p``
