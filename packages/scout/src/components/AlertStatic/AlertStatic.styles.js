import styled from "styled-components"

const Message = styled.div`
  font-size: 0.9rem;
  background: ${props => props.theme.styles.grey};
  color: ${props => props.theme.styles.white};
  padding: 20px;
  margin: 0;
`

export { Message }
