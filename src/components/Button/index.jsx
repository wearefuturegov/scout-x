import styled from "styled-components"

let styles = `
    display: inline-block;
    text-decoration: none;
    color: ${props => props.theme.styles.link};
    padding: 15px 45px;
    text-align: center;
    border: 3px solid ${props => props.theme.styles.link};
    font-size: 1rem;
    background: none;
    font-weight: bold;
    cursor: pointer;
    width: 100%;
    &:focus{
        outline: 3px solid ${props => props.theme.styles.focus}
    }
    &:hover{
        color: ${props => props.theme.styles.linkHover};
        border-color: ${props => props.theme.styles.linkHover}
    }
    &:active{
        color: ${props => props.theme.styles.linkActive};
        border-color: ${props => props.theme.styles.linkActive}
    }
    @media screen and (min-width: ${props => props.theme.styles.breakpointM}){
        width: inherit;
    }
    &:disabled{
        background: ${props => props.theme.styles.text};
        pointer-events: none;
        border-color: ${props => props.theme.styles.text};
    }
`

const Button = styled.button`
  ${styles}
`

export default Button

export const SolidButton = styled(Button)`
  background: ${props => props.theme.styles.link};
  color: ${props => props.theme.styles.white};
  &:hover {
    color: ${props => props.theme.styles.white};
    background: ${props => props.theme.styles.linkHover};
  }
  &:active {
    color: ${props => props.theme.styles.white};
    background: ${props => props.theme.styles.linkActive};
  }
`

export const ButtonLink = styled.a`
  ${styles}
`
