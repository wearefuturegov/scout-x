import React, { useContext, useMemo } from "react"

import { useStateParams } from "../../utils"

const AppStateContext = React.createContext(null)
const AppStateApiContext = React.createContext(null)

// Export the provider, one for the state and another for the API to save on re-renders
/**
 * AppState provider is responsible to managing the state of the application.
 * Our application uses the url for 99% of its state therefore we should always keep our app
 * state in sync with the url - we do this here
 *
 * In previous versions of scout the top level taxonomies were referred to as collections and
 * the sub taxonomies as categories. this may have been because taxonomies (+vocabularies) as
 * they are defined in the open referral standard are not supported in Outpost yet. Rather than
 * rewrite unknowns at this stage this first attempt will stick to the previous convention of using
 * collections and categories - we will tack this part again later! @TODO
 *
 * @param {*} param0
 * @returns
 */
const AppStateProvider = ({ children }) => {
  // in the absense of anything fancy take this comment as your accepted types!

  // storing individually since it might trigger re-renders on everything when part
  // changes and also because this is how it was before
  // STATE
  /**
   * // filters (nb these are going to change all the time so we need a way to make this more dynamic @TODO)
   * collection = outpost.taxonomies: top level nav
   * categories = outpost.taxonomies.filter(parent === x): set based on the collection
   * suitabilities = outpost.suitabilities:
   * accessibilities = outpost.accessibilities:
   * min_age: int
   * max_age: int
   * days: String = Saturday etc
   * only = free: @TODO rename this to free=true
   *
   * // search queries
   * keywords: (search term)
   * lat
   * lng
   * location @TODO if location is set update lat lng? - update needed to outpost api for this, atm only returns interpreted_location if no lat lng returned
   * ^ these three linked
   *
   * // site specific settings
   * map: bool
   * page: int
   *
   */

  const arraySerialize = () => {}
  const arrayDeserialize = () => {}

  const intSerialize = s => s.toString()
  const intDeserialize = d => s => (Number(s) !== Number.NaN ? Number(s) : d)

  const stringSerialize = s => s
  const stringDeserialize = s => (s !== undefined ? s.toString() : "")

  const boolSerialize = s => (s ? "true" : "false")
  const boolDeserialize = s => s === "true"

  const [mapVisible, setMapVisible] = useStateParams(
    false,
    "map",
    boolSerialize,
    boolDeserialize
  )

  const [keywords, setKeywords] = useStateParams(
    "",
    "keywords",
    stringSerialize,
    stringDeserialize
  )

  const [location, setLocation] = useStateParams(
    "",
    "location",
    stringSerialize,
    stringDeserialize
  )

  // DATA is managed in ServiceDataContext & FilterDataContext

  // TODO not sure why normalizeQueryString is used but not removing rn because of time
  // TODO useLocation and search and useQuery needs some work
  // const { search } = useLocation()
  // const [locationSearch, setLocationSearch] = useState(
  //   normalizeQueryString(search)
  // )
  // const [page, setPage] = useQuery("page", 1, { numerical: true })
  // const [mapVisible, setMapVisible] = useQuery("map", false, {
  //   boolean: true,
  // })

  // const [keywords, setKeywords] = useQuery("keywords", "")

  // const [coverage, setCoverage] = useQuery("location", "")
  // const [lat, setLat] = useQuery("lat", "")
  // const [lng, setLng] = useQuery("lng", "")

  // const [collection, setCollection] = useQuery("collection", false)

  // const [categories, setCategories] = useQuery("categories", [], {
  //   array: true,
  // })
  // const [ages, setAges] = useQuery("ages", [], { array: true })
  // const [needs, setNeeds] = useQuery("needs", [], { array: true })
  // const [accessibilities, setAccessibilities] = useQuery(
  //   "accessibilities",
  //   [],
  //   {
  //     array: true,
  //   }
  // )
  // const [suitabilities, setSuitabilities] = useQuery("suitabilities", [], {
  //   array: true,
  // })
  // const [days, setDays] = useQuery("days", [], { array: true })
  // const [minAge, setMinAge] = useQuery("min_age", false, { numerical: true })
  // const [maxAge, setMaxAge] = useQuery("max_age", false, { numerical: true })
  // const [only, setOnly] = useQuery("only", [], { array: true })

  const [slider, setSlider] = useStateParams(
    10,
    "slider",
    intSerialize,
    intDeserialize(10)
  )

  const [page, setPage] = useStateParams(
    1,
    "page",
    intSerialize,
    intDeserialize(1)
  )

  const [lat, setLat] = useStateParams(
    "",
    "lat",
    stringSerialize,
    stringDeserialize
  )

  const [lng, setLng] = useStateParams(
    "",
    "lng",
    stringSerialize,
    stringDeserialize
  )

  const api = useMemo(
    () => ({
      // setPage,
      // setNextPage: () => {
      //   let newPageNumber = page + 1
      //   if (newPageNumber !== page || !(newPageNumber < 1))
      //     setPage(newPageNumber)
      // },
      // setPreviousPage: () => {
      //   let newPageNumber = page - 1
      //   if (newPageNumber !== page || !(newPageNumber < 1))
      //     setPage(newPageNumber)
      // },
      // setMapVisible,
      setSlider,
      setMapVisible,
      setKeywords,
      setPage,
      setLocation,
      setLat,
      setLng,
      // setFiltersCollection,
    }),
    [
      setSlider,
      setMapVisible,
      setKeywords,
      setPage,
      setLocation,
      setLat,
      setLng,
    ]
  )

  // value={{
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
  // }}

  return (
    <AppStateContext.Provider
      value={{ slider, mapVisible, keywords, page, location, lat, lng }}
    >
      <AppStateApiContext.Provider value={api}>
        {children}
      </AppStateApiContext.Provider>
    </AppStateContext.Provider>
  )
}

const useAppState = () => {
  const context = useContext(AppStateContext)

  if (!context) {
    throw new Error("useAppState must be used within the AppStateProvider")
  }

  return context
}

const useAppStateApi = () => {
  const context = useContext(AppStateApiContext)

  if (!context) {
    throw new Error("useAppStateApi must be used within the AppStateProvider")
  }

  return context
}

export { AppStateProvider, useAppState, useAppStateApi }
