import React, { useState } from "react"

import search from "./search.svg"
import location from "./location.svg"
import clearIcon from "./clear.svg"

import { useAlertApi, Tooltip, Spinner, AutocompletePlaceInput } from "./../../"

import {
  Form,
  Field,
  Label,
  Input,
  GeolocateButton,
  Button,
} from "./SearchBar.styles"

const SearchBar = ({
  keywords,
  setKeywords,
  coverage,
  setCoverage,
  setLat,
  setLng,
  setPage,
}) => {
  const [finding, setFinding] = useState(false)

  const [localKeywords, setLocalKeywords] = useState(keywords)
  const [localCoverage, setLocalCoverage] = useState(coverage)
  const [localLat, setLocalLat] = useState("")
  const [localLng, setLocalLng] = useState("")

  const { triggerAlert } = useAlertApi()

  const clear = () => {
    setLocalKeywords("")
    setKeywords("")
  }

  const handleSubmit = e => {
    e && e.preventDefault()
    setKeywords(localKeywords)
    setCoverage(localCoverage)
    setLat(localLat)
    setLng(localLng)
    setFinding(false)
    setPage(1)
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
        setLocalCoverage(address.postcode)
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
          value={localKeywords}
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
        {/* // TODO */}
        {/* <AutocompletePlaceInput
          name="location"
          id="location"
          placeholder="Town or postcode"
          value={localCoverage}
          onChange={value => setLocalCoverage(value)}
          setLat={setLocalLat}
          setLng={setLocalLng}
        /> */}
        {navigator.geolocation && finding ? (
          <Spinner />
        ) : (
          <Tooltip label="Use current location">
            <GeolocateButton onClick={geolocate} type="button">
              <img src={location} alt="Use current location" />
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
