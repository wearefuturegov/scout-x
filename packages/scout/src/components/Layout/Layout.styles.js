import styled, { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Helvetica Neue, Arial, Helvetica, sans-serif;
  }

  *::-moz-focus-inner {
    border: 0 !important;

  }

  *::-moz-focusring {
    border: 0 !important;
  }

  p{
    line-height: 1.5;
    color: ${props => props.theme.styles.text};
  }
`

const ResultsArea = styled.div`
  padding: 30px ${props => props.theme.styles.outerSpacing};
  background: ${props => props.theme.styles.pale};
  @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
    padding: 60px ${props => props.theme.styles.outerSpacing};
  }
`

const ResultsAreaInner = styled.div`
  max-width: ${props => props.theme.styles.maxWidth};
  margin-left: auto;
  margin-right: auto;
  @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
    display: flex;
    flex-direction: row;
  }
`

const Sidebar = styled.aside`
  position: relative;
  @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
    width: 300px;
    margin-right: 40px;
  }
  @media screen and (min-width: ${props => props.theme.styles.breakpointL}) {
    margin-right: 60px;
  }
`

const MainArea = styled.main`
  flex: 1;
`

export { GlobalStyle, ResultsArea, ResultsAreaInner, Sidebar, MainArea }
