import styled from "styled-components"

const PageHeader = styled.div`
  padding: 30px ${props => props.theme.styles.outerSpacing};
  @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
    padding: 40px ${props => props.theme.styles.outerSpacing};
  }
`

const PageHeaderInner = styled.div`
  max-width: ${props => props.theme.styles.maxWidth};
  margin-left: auto;
  margin-right: auto;
`

const PageTitle = styled.h1`
  color: ${props => props.theme.styles.text};
  font-size: 1.75rem;
  margin-bottom: 30px;
  @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
    font-size: 2.625rem;
    margin-bottom: 40px;
    max-width: 60%;
  }
`

export { PageHeader, PageHeaderInner, PageTitle }
