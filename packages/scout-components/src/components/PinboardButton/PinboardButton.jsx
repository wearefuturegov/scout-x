import React, { useState, useEffect, useContext } from "react"
import { AddButton, RemoveButton } from "./PinboardButton.styles"
import useHover from "./useHover"
import { useAlertApi, usePinboardApi, useSettingsState } from "./../../"

const PinboardButton = ({ service, location }) => {
  const { settings } = useSettingsState()
  const { triggerAlert } = useAlertApi()
  const { addToPinboard, isInPinboard, removeFromPinboard } = usePinboardApi()
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
              link: `${settings.basePath || ""}/pinboard${location.search}`,
            })
          }}
        >
          Add to pins
        </AddButton>
      )}
    </div>
  )
}

export default PinboardButton
