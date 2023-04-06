import React, { useState } from "react"
import { ColumnContent, Field, LabelWithMargin, Input } from "./AgeFilter.syles"
import { FilterStyles } from "./../"

const { Outer, Legend, Header, UnfoldButton } = FilterStyles

const AgeFilter = ({
  legend,
  minAge,
  setMinAge,
  maxAge,
  setMaxAge,
  setPage,
  foldable,
}) => {
  const [unfolded, setUnfolded] = useState(maxAge || minAge)

  return (
    <Outer>
      <Header>
        {foldable ? (
          <UnfoldButton
            type="button"
            aria-expanded={unfolded ? "true" : "false"}
            onClick={() => setUnfolded(!unfolded)}
          >
            <Legend>{legend}</Legend>
          </UnfoldButton>
        ) : (
          <Legend>{legend}</Legend>
        )}
      </Header>
      {(!foldable || unfolded) && (
        <ColumnContent>
          <Field>
            <LabelWithMargin htmlFor="min_age">Minimum</LabelWithMargin>
            <Input
              id="min_age"
              value={minAge}
              onChange={e => setMinAge(e.target.value)}
              type="number"
              min="0"
              max="120"
            />
          </Field>
          <Field>
            <LabelWithMargin htmlFor="max_age">Maximum</LabelWithMargin>
            <Input
              id="max_age"
              value={maxAge}
              onChange={e => setMaxAge(e.target.value)}
              type="number"
              min="0"
              max="120"
            />
          </Field>
        </ColumnContent>
      )}
    </Outer>
  )
}

export default AgeFilter
