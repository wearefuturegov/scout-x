import React, { useState } from "react"

import search from "./search.svg"
import locationImage from "./location.svg"
import clearIcon from "./clear.svg"

import {
  useAlertApi,
  Tooltip,
  Spinner,
  AutocompletePlaceInput,
  useAppState,
  useAppStateApi,
} from "./../../"

import {
  Form,
  Field,
  Label,
  Input,
  GeolocateButton,
  Button,
} from "./SearchBar.styles"

const SearchBar = ({ useAppStateApi, useAppState }) => {
  const { setKeywords, setPage, setLocation, setLat, setLng } = useAppStateApi()
  const { keywords, location, lat, lng } = useAppState()

  const [finding, setFinding] = useState(false)

  const [localKeywords, setLocalKeywords] = useState(keywords)
  const [localLocation, setLocalLocation] = useState(location)
  const [localLat, setLocalLat] = useState(lat)
  const [localLng, setLocalLng] = useState(lng)

  const { triggerAlert } = useAlertApi()

  const clear = () => {
    setLocalKeywords("")
    setKeywords("")
  }

  const handleSubmit = e => {
    e && e.preventDefault()
    setKeywords(localKeywords)
    setLocation(localLocation)
    setLat(localLat)
    setLng(localLng)
    setFinding(false)
    setPage(1)
  }

  const geolocate = () => {
    setFinding(true)
    // @TODO fix
    navigator.geolocation.getCurrentPosition(
      async position => {
        let { latitude, longitude } = position.coords
        let res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        )
        let { address } = await res.json()
        setLocalLocation(address.postcode)
        setLocalLat(latitude)
        setLocalLng(longitude)
        setFinding(false)
      },
      error => {
        triggerAlert(
          "Couldn't find your current location. Please enter it another way."
        )
        setFinding(false)
      }
    )
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Field>
        <Label htmlFor="query">Search</Label>
        <Input
          name="query"
          id="query"
          placeholder="Enter a search.."
          value={localKeywords ? localKeywords : ""}
          onChange={e => setLocalKeywords(e.target.value)}
        />
        {localKeywords && (
          <Tooltip label="Clear your search">
            <GeolocateButton type="button" onClick={clear}>
              <img src={clearIcon} alt="Clear your search" />
            </GeolocateButton>
          </Tooltip>
        )}
      </Field>
      <Field>
        <Label htmlFor="location">Where</Label>
        <AutocompletePlaceInput
          name="location"
          id="location"
          placeholder="Town or postcode"
          value={localLocation}
          onChange={value => setLocalLocation(value)}
          setLat={setLocalLat}
          setLng={setLocalLng}
        />
        {navigator.geolocation && finding ? (
          <Spinner />
        ) : (
          <Tooltip label="Use current location">
            <GeolocateButton onClick={geolocate} type="button">
              <img src={locationImage} alt="Use current location" />
            </GeolocateButton>
          </Tooltip>
        )}
      </Field>
      <Button type="submit">
        <img src={search} alt="search" />
      </Button>
    </Form>
  )
}

export default SearchBar
