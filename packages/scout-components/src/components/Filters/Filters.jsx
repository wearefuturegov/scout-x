import React, { useState } from "react"
import { Outer, Inner, Button } from "./Filters.styles"

const Filters = ({ legend, options, children }) => {
  const [open, setOpen] = useState(false)

  return (
    <Outer>
      <Button
        onClick={() => setOpen(!open)}
        aria-expanded={open ? "true" : "false"}
      >
        {open ? "Hide filters" : "Show filters"}
      </Button>
      <Inner open={open}>{children}</Inner>
    </Outer>
  )
}

export default Filters
