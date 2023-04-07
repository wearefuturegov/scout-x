import styled from "styled-components"

const ResultsHeader = styled.div`
  margin-bottom: 25px;
  *:first-child {
    margin-bottom: 15px;
  }
  @media screen and (min-width: ${props => props.theme.styles.breakpointS}) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    *:first-child {
      margin-bottom: 0px;
    }
  }
`

export { ResultsHeader }
