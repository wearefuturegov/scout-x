import styled from "styled-components"
const Outer = styled.div`
  background: ${props => props.theme.styles.white};
  padding: 10px ${props => props.theme.styles.outerSpacing};
`

const Inner = styled.div`
  max-width: ${props => props.theme.styles.maxWidth};
  margin-left: auto;
  margin-right: auto;
  padding: 20px 0;
`

const Message = styled.div`
  padding: 0 0 20px 0;

  a {
    text-decoration: none;
    color: ${props => props.theme.styles.link};
    text-decoration: underline;
    &:focus {
      outline: none;
      box-shadow: 0px 0px 0px 3px ${props => props.theme.styles.focus};
    }
    &:hover {
      color: ${props => props.theme.styles.linkHover};
      border-color: ${props => props.theme.styles.linkHover};
    }
    &:active {
      color: ${props => props.theme.styles.linkActive};
      border-color: ${props => props.theme.styles.linkActive};
    }
  }
`

export { Outer, Inner, Message }
