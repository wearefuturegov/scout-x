import React from "react"
import { Outer, Input, Label } from "./Switch.styles"

const Switch = ({ checked, onChange, id, label }) => (
  <Outer>
    <Input type="checkbox" onChange={onChange} checked={checked} id={id} />
    <Label htmlFor={id}>{label}</Label>
  </Outer>
)

export default Switch
