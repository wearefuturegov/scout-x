import React, { useRef, useEffect } from "react"

import { useGoogleState } from "./../../"
import { Input } from "./AutocompletePlaceInput.styles"

const AutocompletePlaceInput = ({
  name,
  id,
  placeholder,
  onChange,
  value,
  setLat,
  setLng,
}) => {
  let { mapReady } = useGoogleState()
  const inputRef = useRef(false)

  let autocomplete = null

  const handleEnterKey = e => {
    const selectedItem = document.getElementsByClassName("pac-item-selected")
    if (e.keyCode === 13 && selectedItem.length !== 0) {
      e.preventDefault()
    }
  }

  useEffect(() => {
    if (mapReady) {
      let input = inputRef.current

      // eslint-disable-next-line
      autocomplete = new window.google.maps.places.Autocomplete(
        inputRef.current,
        {
          types: ["geocode"],
        }
      )
      autocomplete.setComponentRestrictions({ country: ["gb"] })

      autocomplete.addListener("place_changed", handlePlaceChanged)
      input.addEventListener("keydown", handleEnterKey)

      return () => {
        autocomplete.removeListener("place_changed", handlePlaceChanged)
        input.removeEventListener(handleEnterKey)
      }
    }
  }, [mapReady])

  const handlePlaceChanged = () => {
    console.log("handle place change function running")
    const place = autocomplete.getPlace()
    if (place.geometry) {
      setLat(place.geometry.location.lat())
      setLng(place.geometry.location.lng())
      onChange(place.formatted_address)
    }
  }

  return (
    <Input
      ref={inputRef}
      name={name}
      value={value}
      onChange={e => {
        setLat("")
        setLng("")
        onChange(e.target.value)
      }}
      id={id}
      placeholder={placeholder}
    />
  )
}

export default AutocompletePlaceInput
