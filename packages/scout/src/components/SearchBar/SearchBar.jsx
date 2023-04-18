import React, { useState } from "react"

import search from "./search.svg"
import locationImage from "./location.svg"
import clearIcon from "./clear.svg"

import { useAlertApi } from "~/src/contexts"

import { Tooltip, Spinner, AutocompletePlaceInput } from "~/src/components"

import {
  Form,
  Field,
  Label,
  Input,
  GeolocateButton,
  Button,
} from "./SearchBar.styles"

const SearchBar = ({
  searchKeywords,
  searchLocation,
  setAppStateFromObject,
}) => {
  const [finding, setFinding] = useState(false)

  const [localKeywords, setLocalKeywords] = useState(searchKeywords)
  const [localLocation, setLocalLocation] = useState(searchLocation)
  const [localLat, setLocalLat] = useState("")
  const [localLng, setLocalLng] = useState("")

  const { triggerAlert } = useAlertApi()

  const clear = () => {
    setLocalKeywords("")
    // setSearchKeywords("")
    setAppStateFromObject({
      keywords: "",
    })
  }

  const handleSubmit = e => {
    e && e.preventDefault()
    let searchData = {
      keywords: localKeywords,
      location: localLocation,
      lat: localLat,
      lng: localLng,
      page: 1,
    }
    setAppStateFromObject(searchData)
  }

  const geolocate = () => {
    setFinding(true)
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
        FIX THIS
        {/* <AutocompletePlaceInput
          name="location"
          id="location"
          placeholder="Town or postcode"
          value={localLocation}
          onChange={value => setLocalLocation(value)}
          setLat={setLocalLat}
          setLng={setLocalLng}
        /> */}
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
