import React from "react"

import { theme } from "./../../themes/theme_generator"
import {
  Outer,
  Inner,
  MastheadArea,
  LogoLink,
  ServiceNameArea,
  ServiceName,
} from "./Header.styles"
// @TODO cookie banner should be able to be placed anywhere make it part of the 'widgets' functionality
import CookieBanner from "./../CookieBanner"

const logo = theme.headerLogo

const Header = () => (
  <header>
    <CookieBanner />
    <Outer>
      <Inner>
        <MastheadArea>
          <LogoLink href={theme.organisationUrl}>
            <Logo src={logo} alt={theme.organisation} />
          </LogoLink>
        </MastheadArea>
        <ServiceNameArea>
          <ServiceName href={theme.serviceHomepageUrl}>
            {theme.title}
          </ServiceName>
          {theme.beta && <PhaseTag>Beta</PhaseTag>}
        </ServiceNameArea>
      </Inner>
    </Outer>
  </header>
)

export default Header
