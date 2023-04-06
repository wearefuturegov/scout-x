import styled from "styled-components"

const Outer = styled.ul`
  list-style: none;
  color: ${props => props.theme.styles.text};
  margin-bottom: 25px;
  @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
    margin-bottom: 45px;
  }
`

const Crumb = styled.li`
  display: inline-block;
  margin-right: 10px;
  font-size: 0.9rem;
  &:after {
    margin-left: 10px;
    content: "/";
    opacity: 0.5;
  }
  &:last-of-type {
    margin-right: 0px;
    &:after {
      content: none;
    }
  }
  @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
    font-size: 1rem;
  }
`

const Link = styled.a`
  color: ${props => props.theme.styles.link};
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
  &:focus {
    outline: 3px solid ${props => props.theme.styles.focus};
    background: ${props => props.theme.styles.focus};
  }
  &:active {
    color: ${props => props.theme.styles.text};
  }
`

export { Outer, Crumb, Link }
