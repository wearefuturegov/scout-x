import styled from "styled-components"

const Outer = styled.div`
  background: ${props => props.theme.styles.link};
  color: ${props => props.theme.styles.white};
  padding: 10px ${props => props.theme.styles.outerSpacing};
`

const Inner = styled.div`
  max-width: ${props => props.theme.styles.maxWidth};
  margin-left: auto;
  margin-right: auto;
  @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`

const MastheadArea = styled.div`
  margin-bottom: 10px;
  @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
    width: ${props => props.theme.styles.logoAreaWidth};
    display: inline-block;
    margin-bottom: 0px;
  }
`

const LogoLink = styled.a`
  outline: none;
  &:focus-within img {
    outline: 3px solid ${props => props.theme.styles.focus};
  }
`

const Logo = styled.img`
  height: ${props => props.theme.styles.logoHeightMobile};
  @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
    height: ${props => props.theme.styles.logoHeight};
  }
`

const ServiceNameArea = styled.div`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
  @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
    margin-bottom: 0px;
  }
`

const ServiceName = styled.a`
  font-weight: bold;
  font-size: 1.1rem;
  color: ${props => props.theme.styles.white};
  text-decoration: none;
  @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
    font-size: 1.5rem;
  }
  &:hover {
    text-decoration: underline;
  }
  &:focus {
    outline: 3px solid ${props => props.theme.styles.focus};
    background: ${props => props.theme.styles.focus};
    color: ${props => props.theme.styles.text};
  }
`

const PhaseTag = styled.strong`
  color: ${props => props.theme.styles.text};
  background: ${props => props.theme.styles.focus};
  text-transform: uppercase;
  font-weight: bold;
  padding: 2px 5px;
  margin-left: 10px;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  text-decoration: none !important;
`

export {
  Outer,
  Inner,
  MastheadArea,
  Logo,
  LogoLink,
  ServiceNameArea,
  ServiceName,
  PhaseTag,
}
