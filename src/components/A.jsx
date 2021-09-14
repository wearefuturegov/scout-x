import styled from "styled-components"

export default styled.a`
  color: ${props => props.theme.styles.link};

  /* prevent long links from overflowing */
  word-wrap: anywhere;

  &:hover {
    text-decoration: none;
  }
  &:focus {
    background: ${props => props.theme.styles.focus};
    outline: 3px solid ${props => props.theme.styles.focus};
  }
  &:active {
    color: ${props => props.theme.styles.text};
  }
`
