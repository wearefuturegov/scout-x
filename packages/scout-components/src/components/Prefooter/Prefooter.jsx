import React from "react"
import {
  PrefooterContainer,
  PrefooterInner,
  PrefooterColumn,
  PrefooterLink,
} from "./Prefooter.styles"
import { theme } from "./../../themes/theme_generator"

const Prefooter = ({ children }) => (
  <PrefooterContainer role="complementary">
    <PrefooterInner>
      {[!theme.contactPhone && !theme.contactEmail].includes(false) && (
        <PrefooterColumn>
          <h2>Get in touch</h2>
          <p>
            Contact us online for more information and advice from our
            supportive team:
          </p>
          {theme.contactEmail && (
            <PrefooterLink href={`mailto:${theme.contactEmail}`}>
              {theme.contactEmail}
            </PrefooterLink>
          )}
          {theme.contactPhone && <p>{theme.contactPhone}</p>}
        </PrefooterColumn>
      )}

      {theme.feedbackUrl && (
        <PrefooterColumn>
          <h2>Feedback</h2>
          <p>This is a brand new website. Your feedback helps us improve it.</p>
          <PrefooterLink href={theme.feedbackUrl}>Give feedback</PrefooterLink>
        </PrefooterColumn>
      )}

      {[!theme.outpostRegisterUrl && !theme.outpostLoginUrl].includes(
        false
      ) && (
        <PrefooterColumn>
          <h2>Add or update directory listings</h2>
          <p>
            Create an account to add your organisation, activity or event to our
            directory. If you already have an account, sign in to update a
            listing or add a new one
          </p>
          {theme.outpostRegisterUrl && (
            <>
              <PrefooterLink href={theme.outpostRegisterUrl}>
                Create an account
              </PrefooterLink>
              <br />
            </>
          )}
          {theme.outpostLoginUrl && (
            <PrefooterLink href={theme.outpostLoginUrl}>Sign in</PrefooterLink>
          )}
        </PrefooterColumn>
      )}
    </PrefooterInner>
  </PrefooterContainer>
)

export default Prefooter
