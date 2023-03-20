import styled from "styled-components"

export const PrefooterContainer = styled.div`
  padding: 30px ${props => props.theme.styles.outerSpacing};
  background: ${props => props.theme.styles.text};
  color: ${props => props.theme.styles.white};
  @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
    padding: 60px ${props => props.theme.styles.outerSpacing};
  }
`

export const PrefooterInner = styled.div`
  max-width: ${props => props.theme.styles.maxWidth};
  margin-left: auto;
  margin-right: auto;
  @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
    display: flex;
    flex-direction: row;
  }
`

export const PrefooterColumn = styled.div`
  @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
    flex: 1;
    width: 50%;
  }
  &:not(:last-of-type) {
    margin-bottom: 35px;
    @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
      margin-bottom: 0px;
      padding-right: 20px;
      border-right: 1px solid ${props => props.theme.styles.grey2};
      margin-right: 20px;
    }
  }

  h2 {
    font-size: 1.2rem;
    margin-bottom: 15px;
  }

  p {
    margin-top: 15px;
    color: ${props => props.theme.styles.offwhite};
  }
`

export const PrefooterLink = styled.a`
  color: ${props => props.theme.styles.white};
  font-weight: bold;
  margin-top: 15px;
  display: inline-block;
  &:hover {
    text-decoration: none;
  }
  &:active {
    color: ${props => props.theme.styles.white};
  }
  &:focus {
    outline: 3px solid ${props => props.theme.styles.focus};
    background: ${props => props.theme.styles.focus};
    color: ${props => props.theme.styles.text};
  }
`
