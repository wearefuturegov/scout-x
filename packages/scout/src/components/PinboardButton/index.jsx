import React, { useState, useEffect } from "react"
import useHover from "../../hooks/useHover"
import styled from "styled-components"

import add from "./add.svg"
import remove from "./remove.svg"
import tick from "./tick.svg"
import { PinboardContextConsumer } from "../../contexts/pinboardContext"
import { AlertContextConsumer } from "../../contexts/alertContext"

const BaseButton = styled.button`
  display: flex;
  text-align: center;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  font-weight: bold;
  color: ${props => props.theme.styles.link};
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  &:before {
    margin-right: 10px;
    display: block;
    content: "";
    height: 15px;
    width: 15px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
  &:hover {
    /* color: ${props => props.theme.styles.linkHover}; */
    text-decoration: underline;
  }
  &:active {
    color: ${props => props.theme.styles.text};
  }
  &:focus {
    background: ${props => props.theme.styles.focus};
    outline: 3px solid ${props => props.theme.styles.focus};
  }
  @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
    width: inherit;
  }
`

const AddButton = styled(BaseButton)`
  &:before {
    background-image: url(${add});
  }
`

const RemoveButton = styled(BaseButton)`
  &:before {
    background-image: url(${tick});
  }
  &:hover:before {
    background-image: url(${props => (props.justPinned ? tick : remove)});
  }
`

const PinboardButton = ({
  service,
  location,
  isInPinboard,
  addToPinboard,
  removeFromPinboard,
  triggerAlert,
}) => {
  const isPinned = isInPinboard(service.id)
  const [justPinned, setJustPinned] = useState(false)
  const [ref, isHovered] = useHover()

  const handleMouseOut = () => setJustPinned(false)

  useEffect(() => {
    let node = ref.current
    if (node) {
      node.addEventListener("mouseout", handleMouseOut)
      return () => {
        node.removeEventListener("mouseout", handleMouseOut)
      }
    }
  }, [ref])

  return (
    <div aria-live="polite" ref={ref}>
      {isPinned ? (
        <RemoveButton
          justPinned={justPinned}
          onClick={() => removeFromPinboard(service.id)}
        >
          {!justPinned && isHovered ? "Remove?" : "Added"}
        </RemoveButton>
      ) : (
        <AddButton
          onClick={() => {
            setJustPinned(true)
            addToPinboard(service)
            triggerAlert("Added to pinned services", {
              linkText: "See pinboard",
              link: `/pinboard${location.search}`,
            })
          }}
        >
          Add to pins
        </AddButton>
      )}
    </div>
  )
}

export default props => (
  <AlertContextConsumer>
    {alertContext => (
      <PinboardContextConsumer>
        {pinContext => (
          <PinboardButton {...pinContext} {...alertContext} {...props} />
        )}
      </PinboardContextConsumer>
    )}
  </AlertContextConsumer>
)
