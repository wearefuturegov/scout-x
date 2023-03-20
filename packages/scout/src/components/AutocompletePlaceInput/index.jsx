import React, { useRef, useEffect } from "react"
import styled from "styled-components"

import { GoogleContextConsumer } from "../../contexts/googleContext"

const Input = styled.input`
  font-size: 1rem;
  padding: 10px;
  border: 2px solid ${props => props.theme.styles.text};
  display: block;
  width: 100%;
  height: 45px;
  padding-right: 45px;
  &:focus {
    outline: 3px solid ${props => props.theme.styles.focus};
  }
  &::placeholder {
    opacity: 0.3;
  }
`

const AutocompletePlacesInput = ({
  name,
  id,
  placeholder,
  onChange,
  value,
  isLoaded,
  setLat,
  setLng,
}) => {
  const inputRef = useRef(false)

  let autocomplete = null

  const handleEnterKey = e => {
    const selectedItem = document.getElementsByClassName("pac-item-selected")
    if (e.keyCode === 13 && selectedItem.length !== 0) {
      e.preventDefault()
    }
  }

  useEffect(() => {
    if (isLoaded) {
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
  }, [isLoaded])

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

const WrappedInput = props => (
  <GoogleContextConsumer>
    {context => (
      <AutocompletePlacesInput isLoaded={context.isLoaded} {...props} />
    )}
  </GoogleContextConsumer>
)

export default WrappedInput
