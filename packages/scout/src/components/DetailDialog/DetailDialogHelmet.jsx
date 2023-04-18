import React from "react"

import { truncate } from "~/src/utils"
import { Helmet } from "react-helmet"

const DetailDialogHelmet = ({
  name,
  description,
  siteTitle,
  siteOrganisation,
}) => {
  return (
    <Helmet>
      <title>
        {name} | {siteTitle} | {siteOrganisation}
      </title>
      <meta
        property="twitter:title"
        content={`${name} | ${siteTitle} | ${siteOrganisation}`}
      />
      <meta
        property="og:title"
        content={`${name} | ${siteTitle} | ${siteOrganisation}`}
      />

      {description && (
        <meta
          name="description"
          content={truncate(description, 22).replace(/(\r\n|\n|\r)/gm, " ")}
        />
      )}
      {description && (
        <meta
          property="twitter:description"
          content={truncate(description, 22).replace(/(\r\n|\n|\r)/gm, " ")}
        />
      )}
      {description && (
        <meta
          property="og:description"
          content={truncate(description, 22).replace(/(\r\n|\n|\r)/gm, " ")}
        />
      )}
    </Helmet>
  )
}

export default DetailDialogHelmet
