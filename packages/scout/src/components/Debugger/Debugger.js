import {
  Button,
  useSettingsState,
  Switch,
  SearchBar,
  Filter,
} from "@outpost-platform/scout-components"
import React from "react"
import styled from "styled-components"
import { useAppState, useAppStateApi } from "../../contexts/AppState"
// import { useServiceDataState } from "../../contexts/ServiceData"

import { useLocation } from "react-router-dom"
const Prebug = styled.div`
  margin: 1rem;
  display: flex;
  flex-direction: row;
`

const PrebugSection = styled.div`
  padding: 1rem;
  margin: 1rem;
  border: 1px solid #ccc;
  background-color: #f1f1f1;
  flex: 1;
  word-wrap: break-word;

  ul {
    padding-left: 1rem;
  }
`

const SmolButton = styled(Button)`
  padding: 0.2rem 0.5rem;
  margin: 0.2rem;
`

const Debugger = () => {
  let location = useLocation()

  // App settings
  const { settings } = useSettingsState()

  // // App state
  // const {
  //   page,
  //   mapVisible,
  //   keywords,
  //   coverage,
  //   lat,
  //   lng,
  //   collection,
  //   categories,
  //   ages,
  //   needs,
  //   accessibilities,
  //   suitabilities,
  //   days,
  //   minAge,
  //   maxAge,
  //   only,
  // } = useAppState()
  // const {
  //   setPage,
  //   setNextPage,
  //   setPreviousPage,
  //   setMapVisible,
  // } = useAppStateApi()
  // const locationNavigate = LocationNavigate()
  // const locationSearch = LocationSearch()

  // Service data from Outpost API
  // const { isLoading, pagination, results, error } = useServiceDataState()
  // console.dir(settings)

  const { setSlider, setMapVisible, setPage, setFilterOnly } = useAppStateApi()
  const { slider, mapVisible, filterOnly } = useAppState()

  const onlyOptions = [
    {
      label: "Free",
      slug: "free",
    },
    {
      label: "Fun",
      slug: "fun",
    },
  ]

  // console.log(filtersCollection)

  const handleChange = e => {
    console.log("handleChange")
    let value = e.target.value
    setSlider(value)
  }

  return (
    <Prebug>
      <PrebugSection>
        <h1>App Settings</h1>
        <pre>
          {Object.entries(settings).map(sett => {
            let [key, value] = sett
            return (
              <span key={key}>
                <strong>{key}:</strong>{" "}
                {!["shadowRoot", "styleSlot"].includes(key) && value}
                <br />
              </span>
            )
          })}
        </pre>
      </PrebugSection>
      <PrebugSection>
        <h1>App State</h1>

        <Filter
          key="onlyShow"
          legend="Only show"
          options={onlyOptions}
          selection={filterOnly}
          setSelection={setFilterOnly}
          setPage={setPage}
          foldable
        />
        <Switch
          id="map-toggle"
          checked={mapVisible}
          onChange={e => setMapVisible(e.target.checked)}
          label="Show map?"
        />
        <SearchBar useAppState={useAppState} useAppStateApi={useAppStateApi} />
        <div>
          <label htmlFor="volume">Slider {slider}</label>
          <input
            type="range"
            min="0"
            max="100"
            value={slider}
            onChange={value => handleChange(value)}
          />
        </div>
        {/* <pre>
          <strong>locationSearch:</strong> {locationSearch} <br />
          <strong>page:</strong> {page}
          <br />
          <strong>mapVisible:</strong> {mapVisible}
          <br />
          <strong>keywords:</strong> {keywords}
          <br />
          <strong>coverage:</strong> {coverage}
          <br />
          <strong>lat:</strong> {lat}
          <br />
          <strong>lng:</strong> {lng}
          <br />
          <strong>collection:</strong> {collection}
          <br />
          <strong>categories:</strong> {categories}
          <br />
          <strong>ages:</strong> {ages}
          <br />
          <strong>needs:</strong> {needs}
          <br />
          <strong>accessibilities:</strong> {accessibilities}
          <br />
          <strong>suitabilities:</strong> {suitabilities}
          <br />
          <strong>days:</strong> {days}
          <br />
          <strong>minAge:</strong> {minAge}
          <br />
          <strong>maxAge:</strong> {maxAge}
          <br />
          <strong>only:</strong> {only}
        </pre> */}
        <h2>App state API</h2>
        {/* <pre>
          <strong>setMapVisible:</strong>
          <br />
          <SmolButton onClick={() => setPage(1)}>1</SmolButton>
          <SmolButton onClick={() => setPage(2)}>2</SmolButton>
          <SmolButton onClick={() => setPage(3)}>3</SmolButton>
          <SmolButton onClick={() => setPage(4)}>4</SmolButton>
          <SmolButton onClick={() => setPage(5)}>5</SmolButton>
          <SmolButton onClick={() => setPage(6)}>6</SmolButton>
          <SmolButton onClick={() => setPage(7)}>7</SmolButton>
          <SmolButton onClick={() => setPage(8)}>8</SmolButton>
          <SmolButton onClick={() => setPage(9)}>9</SmolButton>
          <SmolButton onClick={() => setPage(10)}>10</SmolButton>
          <br />
          <SmolButton onClick={setNextPage}>setNextPage</SmolButton>
          <br />
          <SmolButton onClick={setPreviousPage}>setPreviousPage</SmolButton>
          <br />
          <strong>setMapVisible:</strong>
          <br />
          <SmolButton onClick={() => setMapVisible(true)}>
            MapVisible
          </SmolButton>
          <br />
          <SmolButton onClick={() => setMapVisible(false)}>
            MapNotVisible
          </SmolButton>
          <br />
        </pre> */}
      </PrebugSection>

      {/* <PrebugSection>
        <h1>Service Data</h1>
        <strong>isLoading:</strong> {isLoading ? "true" : "false"}
        <br />
        <strong>pagination:</strong> <br />
        <ul>
          {Object.entries(pagination).map(sett => {
            let [key, value] = sett
            return (
              <li key={key}>
                <strong>{key}:</strong> {value}
                <br />
              </li>
            )
          })}
        </ul>
        <br />
        <strong>results:</strong> <br />{" "}
        <ul>
          {results.map(sett => {
            let { id, name } = sett
            return (
              <li key={name}>
                <strong>{id}:</strong> {name}
                <br />
              </li>
            )
          })}
        </ul>
        <br />
        <strong>error:</strong> {error ? "true" : "false"}
      </PrebugSection>

      <PrebugSection>
        <h1>Filter Data</h1>
      </PrebugSection>

      <PrebugSection></PrebugSection> */}
    </Prebug>
  )
}

export default Debugger
