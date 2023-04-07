import styled from "styled-components"

// TODO this shouldn't be like this
import { DialogStyles } from "../Dialog"

const { Body: InheritedBody } = DialogStyles

const Body = styled(InheritedBody)`
  &:first-of-type {
    padding-top: 0px;
  }
`

const Crosshead = styled.h2`
  margin-bottom: 15px;
  color: ${props => props.theme.styles.text};
`

const Columns = styled.div`
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

const Table = styled.table`
  width: 100%;
  color: ${props => props.theme.styles.text};
  td {
    width: 50%;
  }
  tr:not(:last-child) td {
    padding-bottom: 10px;
  }
`

export { Columns, Crosshead, Table, Body }
