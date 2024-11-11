import React from "react"
import styled from "styled-components"

const Select = styled.select`
  font-size: 0.9rem;
  padding: 7px;
  border: 2px solid ${props => props.theme.styles.text};
  display: block;
  width: auto;
  &:focus {
    outline: 3px solid ${props => props.theme.styles.focus};
  }
  &::placeholder {
    opacity: 0.3;
  }
`

const ResultsPerPage = ({ perPage, setPerPage, setPage }) => {
  const handleChange = e => {
    setPerPage(e.target.value)
    setPage(1)
  }

  const options = [20, 50, 100]

  return (
    <Select onChange={handleChange} defaultValue={perPage}>
      {options.map(o => (
        <option key={o} value={o}>
          {o} results per page
        </option>
      ))}
    </Select>
  )
}

export default ResultsPerPage
