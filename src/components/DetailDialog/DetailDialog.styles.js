import styled from "styled-components"

export const Crosshead = styled.h2`
  margin-bottom: 15px;
  color: ${props => props.theme.styles.text};
`

export const CrossheadSub = styled.h3`
  margin-bottom: 15px;
  color: ${props => props.theme.styles.text};
`

export const Columns = styled.div`
  margin-bottom: 30px;
  &:last-of-type {
    margin-bottom: 0px;
  }
  div {
    margin-bottom: 20px;
    &:last-of-type {
      margin-bottom: 0px;
    }
  }
  @supports (display: grid) {
    @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 35px;
      row-gap: 25px;
      div {
        margin-bottom: 0px;
      }
    }
  }
`

export const Table = styled.table`
  width: 100%;
  color: ${props => props.theme.styles.text};
  td {
    width: 50%;
  }
  tr:not(:last-child) td {
    padding-bottom: 10px;
  }
`
