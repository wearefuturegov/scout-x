import React, { useState } from "react"

import styled from "styled-components"
import search from "./search.svg"
import location from "./location.svg"
import clearIcon from "./clear.svg"

import AutocompletePlaceInput from "../AutocompletePlaceInput"
import { Spinner } from "@outpost-platform/scout-components"
import { AlertContextConsumer } from "../../contexts/Alert"
import { Tooltip } from "@outpost-platform/scout-components"

const Form = styled.form`
  @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    width: 100%;
  }
`

const Field = styled.div`
  margin-bottom: 15px;
  position: relative;
  @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
    margin-bottom: 0px;
    margin-right: 20px;
    flex: 1;
  }
`

const Label = styled.label`
  margin-bottom: 5px;
  display: inline-block;
`

const GeolocateButton = styled.button`
  position: absolute;
  right: 2px;
  bottom: 2px;
  background: none;
  height: 41px;
  width: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
  img {
    height: 20px;
  }
  &:hover {
    background: ${props => props.theme.styles.pale};
  }
  &:focus {
    outline: 3px solid ${props => props.theme.styles.focus};
  }
`

const Button = styled.button`
  background: ${props => props.theme.styles.link};
  border: none;
  text-align: center;
  width: 100%;
  padding: 10px 20px;
  cursor: pointer;
  height: 45px;
  &:hover {
    background: ${props => props.theme.styles.linkHover};
  }
  &:focus {
    outline: 3px solid ${props => props.theme.styles.focus};
  }
  &:active {
    background: ${props => props.theme.styles.linkActive};
  }
  @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
    width: 100px;
  }
`

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
    color: rgb(33, 33, 33, 0.3);
  }
`

const SearchBar = ({
  keywords,
  setKeywords,
  coverage,
  setCoverage,
  setLat,
  setLng,
  setPage,
  triggerAlert,
}) => {
  const [finding, setFinding] = useState(false)

  const [localKeywords, setLocalKeywords] = useState(keywords)
  const [localCoverage, setLocalCoverage] = useState(coverage)
  const [localLat, setLocalLat] = useState("")
  const [localLng, setLocalLng] = useState("")

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
        <AutocompletePlaceInput
          name="location"
          id="location"
          placeholder="Town or postcode"
          value={localCoverage}
          onChange={value => setLocalCoverage(value)}
          setLat={setLocalLat}
          setLng={setLocalLng}
        />
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

const WrappedInput = props => (
  <AlertContextConsumer>
    {context => <SearchBar triggerAlert={context.triggerAlert} {...props} />}
  </AlertContextConsumer>
)

export default WrappedInput
