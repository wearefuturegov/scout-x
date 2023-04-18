import React from "react"

import { DetailDialogStyles } from "./../../components"

const DetailDialogFooter = ({ SuggestEditLinkUrl }) => {
  const { Footer, SuggestEditLink } = DetailDialogStyles
  return (
    <Footer>
      {SuggestEditLinkUrl && (
        <>
          <SuggestEditLink target="blank" href={SuggestEditLinkUrl}>
            Suggest an edit
          </SuggestEditLink>
          <p>
            If anything here is out of date or missing, please suggest an edit.
          </p>
        </>
      )}

      <p>
        We regularly check and update these community services, but can’t
        guarantee that they will always be accurate.
      </p>
      <p>
        You may need a referral for some activities and groups. Contact the
        organiser if unsure.
      </p>
    </Footer>
  )
}

export default DetailDialogFooter
