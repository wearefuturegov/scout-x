import React from "react"
import * as Styles from "./Prefooter.styles"
import { theme } from "./../../themes/theme_generator"

const Prefooter = ({ children }) => (
  <Styles.PrefooterContainer role="complementary">
    <Styles.PrefooterInner>
      {[!theme.contactPhone && !theme.contactEmail].includes(false) && (
        <Styles.PrefooterColumn>
          <h2>Get in touch</h2>
          <p>
            Contact us online for more information and advice from our
            supportive team:
          </p>
          {theme.contactEmail && (
            <Styles.PrefooterLink href={`mailto:${theme.contactEmail}`}>
              {theme.contactEmail}
            </Styles.PrefooterLink>
          )}
          {theme.contactPhone && <p>{theme.contactPhone}</p>}
        </Styles.PrefooterColumn>
      )}

      {theme.feedbackUrl && (
        <Styles.PrefooterColumn>
          <h2>Feedback</h2>
          <p>This is a brand new website. Your feedback helps us improve it.</p>
          <Styles.PrefooterLink href={theme.feedbackUrl}>
            Give feedback
          </Styles.PrefooterLink>
        </Styles.PrefooterColumn>
      )}

      {[!theme.outpostRegisterUrl && !theme.outpostLoginUrl].includes(
        false
      ) && (
        <Styles.PrefooterColumn>
          <h2>Add or update directory listings</h2>
          <p>
            Create an account to add your organisation, activity or event to our
            directory. If you already have an account, sign in to update a
            listing or add a new one
          </p>
          {theme.outpostRegisterUrl && (
            <>
              <Styles.PrefooterLink href={theme.outpostRegisterUrl}>
                Create an account
              </Styles.PrefooterLink>
              <br />
            </>
          )}
          {theme.outpostLoginUrl && (
            <Styles.PrefooterLink href={theme.outpostLoginUrl}>
              Sign in
            </Styles.PrefooterLink>
          )}
        </Styles.PrefooterColumn>
      )}
    </Styles.PrefooterInner>
  </Styles.PrefooterContainer>
)

export default Prefooter
