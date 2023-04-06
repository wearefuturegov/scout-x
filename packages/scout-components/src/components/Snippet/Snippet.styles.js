import styled from "styled-components"

const Outer = styled.div`
  margin-bottom: 15px;
  padding: 20px 25px;
  background-color: ${props => props.theme.styles.focus}1A;
  border: 2px solid ${props => props.theme.styles.focus};
  color: ${props => props.theme.styles.text};
  line-height: 1.4;
`

const Headline = styled.h3`
  margin-bottom: 10px;
`

export { Outer, Headline }
