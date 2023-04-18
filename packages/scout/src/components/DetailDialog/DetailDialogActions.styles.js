import styled from "styled-components"

const Actions = styled.div`
  margin-bottom: 30px;
  a:first-of-type {
    margin-bottom: 25px;
  }
  @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 40px;
    a:first-of-type {
      margin-bottom: 0px;
      margin-right: 30px;
    }
  }
`
export { Actions }
