import { theme } from "./../../themes/theme_generator"
const ButtonSolidStyles = `
    background: ${theme.styles.link};
    color: ${theme.styles.white};
    &:hover {
        color: ${theme.styles.white};
        background: ${theme.styles.linkHover};
    }
    &:active {
        color: ${theme.styles.white};
        background: ${theme.styles.linkActive};
    }
`

export default ButtonSolidStyles
