import styled from "styled-components"
import theme from "./_theme"

export default styled.a`
  color: ${theme.link};

  /* prevent long links from overflowing */
  word-wrap: anywhere;

  &:hover {
    text-decoration: none;
  }
  &:focus {
    background: ${theme.focus};
    outline: 3px solid ${theme.focus};
  }
  &:active {
    color: ${theme.text};
  }
`
