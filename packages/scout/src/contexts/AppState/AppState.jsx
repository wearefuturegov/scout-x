import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import queryString from "query-string"
import { useHistoryApi } from "~/src/contexts"
import { useStateParams } from "~/src/hooks/"
import isEqual from "lodash/isEqual"
import filter from "lodash/filter"

const AppStateContext = React.createContext(null)
const AppStateApiContext = React.createContext(null)

// Export the provider, one for the state and another for the API to save on re-renders
/**
 * AppState provider is responsible to managing the state of the application.
 * Our application uses the url for 99% of its state therefore we should always keep our app
 * state in sync with the url - we do this here
 *
 * In previous versions of Scout the top level taxonomies were referred to as collections and
 * the sub taxonomies as categories. this may have been because taxonomies (+vocabularies) as
 * they are defined in the open referral standard are not supported in Outpost yet. Rather than
 * rewrite unknowns at this stage this first attempt will stick to the previous convention of using
 * collections and categories - we will tack this part again later! @TODO
 *
 *
 * AppState sets the individual states for things like map etc
 * Each of these gives us state setters such as setMapVisible when
 * these are triggered a new url state is created
 * @param {*} param0
 * @returns
 */
const AppStateProvider = ({ children }) => {
  // storing individually since it might trigger re-renders on everything when one part
  // changes and also because this is how it was before

  const location = useLocation()
  const navigate = useNavigate()

  const getCurrentLocation = () => {
    return location
  }
  const [appState, setAppState] = useState(queryString.parse(location.search))

  useEffect(() => {
    // if (
    //   existingValue &&
    //   !existingValueMatchesState(deserialize(existingValue, options), options)
    // ) {
    console.log(`appState`, appState)
    // setState(deserialize(existingValue, options))
    // }
  }, [appState])

  /*******************
   *
   *  Filters
   *  @TODO these will become more dynamic in the future
   *
   *******************/

  /**
   * Collection represents the top level category/taxonomy
   * ?collection=things-to-do
   * This will likely change in the future as we make it more ORUK compatible
   */
  const [filterCollection, setFilterCollection] = useStateParams(
    [],
    "collection",
    {},
    getCurrentLocation
  )

  /**
   * Categories represents the subcategories of the selected top level category/taxonomy
   * ?categories=health-and-wellbeing&categories=mental-health
   * This currently only works if a filterCollection is set since a subcategory could contain the sanem key
   */
  const [filterCategories, setFilterCategories] = useStateParams(
    [],
    "categories",
    { array: true },
    getCurrentLocation
  )

  /**
   * Filter for suitabilities
   * ?suitabilities=dementia
   */
  const [filterSuitabilities, setFilterSuitabilities] = useStateParams(
    [],
    "suitabilities",
    { array: true },
    getCurrentLocation
  )

  /**
   * Filter for accessibilities
   * ?accessibilities=accessible-toilet-facilities
   */
  const [filterAccessibilities, setFilterAccessibilities] = useStateParams(
    [],
    "accessibilities",
    { array: true },
    getCurrentLocation
  )

  /**
   * Filter for SEND needs
   * ?needs=autism&needs=social-emotional-and-mental-health-difficulties
   */
  const [filterNeeds, setFilterNeeds] = useStateParams(
    [],
    "needs",
    { array: true },
    getCurrentLocation
  )

  /**
   * Min age filter
   * ?min_age=1
   */
  const [filterMinAge, setFilterMinAge] = useStateParams(
    false,
    "min_age",
    { numerical: true },
    getCurrentLocation
  )

  /**
   * Max age filter
   * ?max_age=3
   */
  const [filterMaxAge, setFilterMaxAge] = useStateParams(
    false,
    "max_age",
    { numerical: true },
    getCurrentLocation
  )

  /**
   * Days filter
   * ?days=Monday&days=Tuesday
   */
  const [filterDays, setFilterDays] = useStateParams(
    [],
    "days",
    { array: true },
    getCurrentLocation
  )

  /**
   * Filter for "only show" options
   * ?only=free
   * @TODO this should be filterOnlyFree?
   */
  const [filterOnly, setFilterOnly] = useStateParams(
    [],
    "only",
    { array: true },
    getCurrentLocation
  )

  /*******************
   *
   *  Search
   *
   *******************/

  /**
   * when user enters a search term
   * ?keywords=playground
   */
  const [searchKeywords, setSearchKeywords] = useStateParams(
    "",
    "keywords",
    {},
    getCurrentLocation
  )

  /**
   * Used when we enter a term into the location box
   * ?lat=51.815606&lng=-0.8084&location=Aylesbury%2C%20UK
   */
  const [searchLat, setSearchLat] = useStateParams(
    "",
    "lat",
    {},
    getCurrentLocation
  )

  /**
   * Used when we enter a term into the location box
   * ?lat=51.815606&lng=-0.8084&location=Aylesbury%2C%20UK
   */
  const [searchLng, setSearchLng] = useStateParams(
    "",
    "lng",
    {},
    getCurrentLocation
  )

  /**
   * Used when we search for a location at the top of the page
   * ?lat=51.815606&lng=-0.8084&location=Aylesbury%2C%20UK
   */
  const [searchLocation, setSearchLocation] = useStateParams(
    "",
    "location",
    {},
    getCurrentLocation
  )

  /*******************
   *
   *  App State Specific
   *
   *******************/

  /**
   * Is the map shown on the listings page
   * ?map=true
   */
  const [mapVisible, setMapVisible] = useStateParams(
    false,
    "map",
    { boolean: true },
    getCurrentLocation
  )

  /**
   * What page of results are we on?
   * ?page=1
   */
  const [page, setPage] = useStateParams(
    1,
    "page",
    { numerical: true },
    getCurrentLocation
  )

  /**
   * ignore this is a tester
   */
  const [slider, setSlider] = useStateParams(
    10,
    "slider",
    { numerical: true },
    getCurrentLocation
  )

  /**
   * We cant use setPage, setSearchKeywords in succession so we provide this  method to update the url all at once
   */
  const setAppStateFromObject = useCallback(
    async newAppState => {
      let currentParams = queryString.parse(location?.search)

      let newUrl = { ...currentParams, ...newAppState }

      // remove any empty values from the new url
      newUrl = Object.keys(newUrl)
        .filter(key => {
          return newUrl[key] !== ""
        })
        .reduce((obj, key) => {
          return {
            ...obj,
            [key]: newUrl[key],
          }
        }, {})

      const newParams = queryString.stringify(newUrl)

      if (!isEqual(currentParams, newUrl)) {
        await navigate(`?${newParams}`)
      }
    },
    [location.search, navigate]
  )

  /**
   * The following two methods have been created as helpers
   */

  /**
   * Helper method to create the paths
   */
  const getServiceDetailsPath = useCallback(
    serviceId => {
      let currentParams = queryString.parse(location?.search)
      const newParams = queryString.stringify(currentParams)
      return `/services/${serviceId}?${newParams}`
    },
    [location.search]
  )

  /**
   * Helper method to naviagate to service details page
   * @param {*} serviceId
   */
  const goToServiceDetails = useCallback(
    async serviceId => {
      const path = getServiceDetailsPath(serviceId)
      await navigate(path)
    },
    [getServiceDetailsPath, navigate]
  )

  const api = useMemo(
    () => ({
      setFilterCollection,
      setFilterCategories,
      setFilterSuitabilities,
      setFilterAccessibilities,
      setFilterNeeds,
      setFilterMinAge,
      setFilterMaxAge,
      setFilterDays,
      setFilterOnly,
      setSearchKeywords,
      setSearchLat,
      setSearchLng,
      setSearchLocation,
      setMapVisible,
      setPage,
      setSlider,
      setAppStateFromObject,
      goToServiceDetails,
      getServiceDetailsPath,
    }),
    [
      setFilterCollection,
      setFilterCategories,
      setFilterSuitabilities,
      setFilterAccessibilities,
      setFilterNeeds,
      setFilterMinAge,
      setFilterMaxAge,
      setFilterDays,
      setFilterOnly,
      setSearchKeywords,
      setSearchLat,
      setSearchLng,
      setSearchLocation,
      setMapVisible,
      setPage,
      setSlider,
      setAppStateFromObject,
      goToServiceDetails,
      getServiceDetailsPath,
    ]
  )

  const appStateValues = {
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
  }

  return (
    <AppStateContext.Provider value={appStateValues}>
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
