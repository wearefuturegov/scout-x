import styled from "styled-components"

import ButtonStyles from "./Button.styles"

const Button = styled.button`
  ${ButtonStyles}
`

export default Button

// const solidStyle = `
//   background: ${theme.styles.link};
//   color: ${theme.styles.white};
//   &:hover {
//     color: ${theme.styles.white};
//     background: ${theme.styles.linkHover};
//   }
//   &:active {
//     color: ${theme.styles.white};
//     background: ${theme.styles.linkActive};
//   }
// `

// export const SolidButton = styled(Button)`
//   ${solidStyle}
// `

// export const ButtonLink = styled.a`
//   ${styles}
// `
// export const SolidButtonLink = styled(ButtonLink)`
//   ${solidStyle}
// `
