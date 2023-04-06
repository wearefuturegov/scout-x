import { theme } from "./../../themes/theme_generator"

const ButtonStyles = `
    display: inline-block;
    text-decoration: none;
    color: ${theme.styles.link};
    padding: 15px 45px;
    text-align: center;
    border: 3px solid ${theme.styles.link};
    font-size: 1rem;
    background: none;
    font-weight: bold;
    cursor: pointer;
    width: 100%;
    &:focus{
        outline: 3px solid ${theme.styles.focus}
    }
    &:hover{
        color: ${theme.styles.linkHover};
        border-color: ${theme.styles.linkHover}
    }
    &:active{
        color: ${theme.styles.linkActive};
        border-color: ${theme.styles.linkActive}
    }
    @media screen and (min-width: ${theme.styles.breakpointM}){
        width: inherit;
    }
    &:disabled{
        background: ${theme.styles.text};
        pointer-events: none;
        border-color: ${theme.styles.text};
    }
`

export default ButtonStyles
