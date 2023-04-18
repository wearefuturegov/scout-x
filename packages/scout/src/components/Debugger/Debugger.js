import React from "react"

import { Button } from "~/src/components"
import { Switch } from "~/src/components"
import { SearchBar } from "~/src/components"
import { Filter } from "~/src/components"
import styled from "styled-components"
import {
  useAppState,
  useAppStateApi,
  useSettingsState,
  useServiceDataState,
} from "~/src/contexts"
import queryString from "query-string"
import { useLocation, useNavigate } from "react-router-dom"
import { ReactQueryDevtools } from "react-query/devtools"
import { useFilterDataState } from "../../contexts"

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

  const {
    serviceStatus,
    serviceData,
    serviceError,
    serviceIsFetching,
    serviceIsPreviousData,
  } = useServiceDataState()

  const {
    taxonomies,
    suitabilities,
    sendNeeds,
    accessibilities,
  } = useFilterDataState()

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
  const {
    filterCollection,
    filterCategories,
    filterSuitabilities,
    filterAccessibilities,
    filterNeeds,
    filterMinAge,
    filterMaxAge,
    filterDays,
    filterOnly,
    searchKeywords,
    searchLat,
    searchLng,
    searchLocation,
    mapVisible,
    page,
    slider,
  } = useAppState()

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

  const moveAlong = async (paramsName, s) => {
    let currentParams = queryString.parse(location?.search)

    let newUrl = {
      ...currentParams,
      [paramsName]: s,
    }
    if (!s) delete newUrl[paramsName]
    const newParams = queryString.stringify(newUrl)

    console.log("ONCHANGE: ", newParams)
    // theres a very large chance this promise doesn't ever actually resolve
    // await useNavigate(`/?${newParams}`)
  }

  const handleChange2 = async e => {
    console.log("handleChange2")
    // setFilterOnly(["free"])
    // setPage(1)

    try {
      let selectionSet = await moveAlong("only", ["free"])
      let pageSet = await moveAlong("page", 1)
      // await navigate("?only=free&page=1")

      return [selectionSet, pageSet]
    } catch (error) {
      console.log(error)
    }
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
        <h1>App State</h1>
        <strong>filterCollection:</strong> {filterCollection}
        <br />
        <strong>filterCategories:</strong> {filterCategories}
        <br />
        <strong>filterSuitabilities:</strong> {filterSuitabilities}
        <br />
        <strong>filterAccessibilities:</strong> {filterAccessibilities}
        <br />
        <strong>filterNeeds:</strong> {filterNeeds}
        <br />
        <strong>filterMinAge:</strong> {filterMinAge}
        <br />
        <strong>filterMaxAge:</strong> {filterMaxAge}
        <br />
        <strong>filterDays:</strong> {filterDays}
        <br />
        <strong>filterOnly:</strong> {filterOnly}
        <br />
        <strong>searchKeywords:</strong> {searchKeywords}
        <br />
        <strong>searchLat:</strong> {searchLat}
        <br />
        <strong>searchLng:</strong> {searchLng}
        <br />
        <strong>searchLocation:</strong> {searchLocation}
        <br />
        <strong>mapVisible:</strong> {mapVisible}
        <br />
        <strong>page:</strong> {page}
        <br />
        <strong>slider:</strong> {slider}
        <br />
        <button>Test something</button>
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

      <PrebugSection>
        <h1>Service Data</h1>
        {serviceStatus === "loading" ? (
          <div>Loading...</div>
        ) : serviceStatus === "error" ? (
          <div>Error: {serviceError.message}</div>
        ) : (
          // `data` will either resolve to the latest page's data
          // or if fetching a new page, the last successful page's data
          <div>
            {serviceData.content.map(content => (
              <p key={content.id}>{content.name}</p>
            ))}
          </div>
        )}
        <div>Current Page: {page}</div>
        <button
          // onClick={() => setPage(old => Math.max(old - 1, 0))}
          onClick={() => setPage(Math.max(page - 1, 0))}
          disabled={page === 1}
        >
          Previous Page {Math.max(page - 1, 0)}
        </button>{" "}
        <button
          // onClick={() => {
          //   setPage(old => (serviceData?.last === false ? old + 1 : old))
          // }}
          onClick={() => {
            setPage(Math.max(page + 1, 1))
          }}
          disabled={serviceIsPreviousData || serviceData?.last}
        >
          Next Page {Math.max(page + 1, 1)}
        </button>
        {
          // Since the last page's data potentially sticks around between page requests,
          // we can use `isFetching` to show a background loading
          // indicator since our `status === 'loading'` state won't be triggered
          serviceIsFetching ? <span> Loading...</span> : null
        }{" "}
        {/* <strong>isLoading:</strong> {isLoading ? "true" : "false"}
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
        <strong>error:</strong> {error ? "true" : "false"} */}
      </PrebugSection>

      <PrebugSection>
        <h1>Filter Data</h1>
        <h2>Taxonomies</h2>
        {taxonomies.status === "loading" ? (
          "Loading..."
        ) : taxonomies.status === "error" ? (
          <span>Error: {taxonomies.error.message}</span>
        ) : (
          <>
            <div>
              {taxonomies.data.map(taxonomy => (
                <p key={taxonomy.id}>
                  {taxonomy.label}{" "}
                  {filterCollection === taxonomy.slug ? "✅" : ""}
                </p>
              ))}
            </div>
            <div>{taxonomies.isFetching ? "Background Updating..." : " "}</div>
          </>
        )}

        <h2>Suitabilities</h2>
        {suitabilities.status === "loading" ? (
          "Loading..."
        ) : suitabilities.status === "error" ? (
          <span>Error: {suitabilities.error.message}</span>
        ) : (
          <>
            <div>
              {suitabilities.data.map(taxonomy => (
                <p key={taxonomy.id}>{taxonomy.label}</p>
              ))}
            </div>
            <div>
              {suitabilities.isFetching ? "Background Updating..." : " "}
            </div>
          </>
        )}

        <h2>SEND needs</h2>
        {sendNeeds.status === "loading" ? (
          "Loading..."
        ) : sendNeeds.status === "error" ? (
          <span>Error: {sendNeeds.error.message}</span>
        ) : (
          <>
            <div>
              {sendNeeds.data.map(taxonomy => (
                <p key={taxonomy.id}>{taxonomy.label}</p>
              ))}
            </div>
            <div>{sendNeeds.isFetching ? "Background Updating..." : " "}</div>
          </>
        )}

        <h2>Accessibilities</h2>
        {accessibilities.status === "loading" ? (
          "Loading..."
        ) : accessibilities.status === "error" ? (
          <span>Error: {accessibilities.error.message}</span>
        ) : (
          <>
            <div>
              {accessibilities.data.map(accessibility => (
                <p key={accessibility.id}>{accessibility.label}</p>
              ))}
            </div>
            <div>
              {accessibilities.isFetching ? "Background Updating..." : " "}
            </div>
          </>
        )}
      </PrebugSection>
    </Prebug>
  )
}

export default Debugger
