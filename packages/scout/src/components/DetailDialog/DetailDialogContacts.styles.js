import styled from "styled-components"

const ContactName = styled.h3`
  line-height: 1.5;
  color: ${props => props.theme.styles.text};
`

const ContactRole = styled.p`
  margin-bottom: 5px;
  font-style: italic;
`

export { ContactName, ContactRole }
