import { theme } from "~/src/themes"
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

export { ButtonSolidStyles }
