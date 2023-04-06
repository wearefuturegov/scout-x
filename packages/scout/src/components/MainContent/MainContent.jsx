import React from "react"

import { ResultsHeader, ResultsList, Count, NoResults } from "./../Layout"

// import ServiceCard from "./../ServiceCard"
// import Skeleton from "./../ServiceCard/Skeleton"
// import ListMap from "./../ListMap"
// import ListMapStatic from "./../ListMapStatic"
// import PinboardLink from "./../PinboardLink"
import { theme } from "./../../themes/theme_generator"
// import { checkCookiesAccepted } from "./../../lib/cookies"
import {
  AlertStatic,
  Switch,
  Pagination,
  ServiceCard,
  ServiceCardSkeleton,
  PinboardLink,
  ListMapStatic,
} from "@outpost-platform/scout-components"
import { useServiceDataState } from "./../../contexts/ServiceData"
import { useAppState, useAppStateApi } from "../../contexts/AppState"
// import { useCookiesState } from "@outpost-platform/scout-components"

const MainContent = ({ scrollTarget, locationSearch }) => {
  // TODO cookies
  // const cookiesAccepted = checkCookiesAccepted()
  const { isLoading, error, results, pagination } = useServiceDataState()
  const { setPage } = useAppStateApi()

  // console.log(useServiceDataState())
  const cookiesAccepted = true
  // TODO mapVisible
  const mapVisible = true
  // still loading
  if (isLoading)
    return (
      <>
        <ResultsHeader>
          <Count />
          {/* <Switch
            id="map-toggle"
            checked={mapVisible}
            onChange={e => setMapVisible(e.target.checked)}
            label="Show map?"
          /> */}
        </ResultsHeader>
        <ResultsList aria-live="polite">
          <ServiceCardSkeleton />
        </ResultsList>
      </>
    )

  // not loading and no results
  if (error)
    return (
      <NoResults>
        There was a problem fetching results. Please try again later.
      </NoResults>
    )

  // not loading, results exists but is empty array
  if (!error && results.length === 0)
    return <NoResults>No results to show. Try widening your search.</NoResults>

  // not loading, results exist and has length that is not 0
  return (
    <>
      <ResultsHeader>
        <Count>
          <>
            Showing{" "}
            {pagination.currentPage <= pagination.lastPage && (
              <>
                <strong>
                  {pagination.from} - {pagination.to} out of {pagination.total}
                </strong>{" "}
              </>
            )}
            results{" "}
            {/* {keywords && (
              <>
                for <strong>{keywords}</strong>
              </>
            )}{" "}
            {coverage && (
              <>
                near <strong>{coverage}</strong>
              </>
            )} */}
          </>
        </Count>
        {/* <Switch
          id="map-toggle"
          checked={mapVisible}
          onChange={e => setMapVisible(e.target.checked)}
          label="Show map?"
        /> */}
      </ResultsHeader>
      {mapVisible &&
        (cookiesAccepted ? (
          <>
            {/* <ListMap results={results} navigate={navigate} location={location} /> */}
          </>
        ) : (
          <>
            <AlertStatic>{theme.cookiesDisabledMessage}</AlertStatic>
            <ListMapStatic results={results} />
          </>
        ))}
      <PinboardLink locationSearch={locationSearch} />
      <ResultsList aria-live="polite">
        {results?.map(s => (
          <ServiceCard key={s.id} {...s} />
        ))}
      </ResultsList>
      <Pagination
        {...pagination}
        setPage={setPage}
        scrollTarget={scrollTarget}
      />
    </>
  )
}

export default MainContent
