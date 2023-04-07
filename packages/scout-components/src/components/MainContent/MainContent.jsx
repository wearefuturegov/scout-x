import React from "react"
// import { Count } from "./../Layout"
import { theme } from "./../../themes/theme_generator"

import {
  AlertStatic,
  Switch,
  Pagination,
  ServiceCard,
  ServiceCardSkeleton,
  PinboardLink,
  ListMapStatic,
  ListMap,
  ResultsHeader,
  ResultsList,
  ResultsNone,
  ResultsCount,
} from "./../../"

const MainContent = ({
  locationSearch,
  locationNavigate,
  isLoading,
  error,
  results,
  pagination,
  setNextPage,
  setPreviousPage,
  setMapVisible,
  mapVisible,
  page,
  scrollTarget,
}) => {
  // TODO cookies
  // const cookiesAccepted = checkCookiesAccepted()

  // console.log(useServiceDataState())
  const cookiesAccepted = true
  // still loading
  if (isLoading)
    return (
      <>
        <ResultsHeader>
          <ResultsCount />
          <Switch
            id="map-toggle"
            checked={mapVisible}
            onChange={e => setMapVisible(e.target.checked)}
            label="Show map?"
          />
        </ResultsHeader>
        <ResultsList aria-live="polite">
          <ServiceCardSkeleton />
        </ResultsList>
      </>
    )

  // not loading and no results
  if (error)
    return (
      <ResultsNone>
        There was a problem fetching results. Please try again later.
      </ResultsNone>
    )

  // not loading, results exists but is empty array
  if (!error && results.length === 0)
    return (
      <ResultsNone>No results to show. Try widening your search.</ResultsNone>
    )

  // not loading, results exist and has length that is not 0
  return (
    <>
      <ResultsHeader>
        <ResultsCount>
          <>
            Page: {page} <br />
            Showing{" "}
            {page <= pagination.lastPage && (
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
        </ResultsCount>
        <Switch
          id="map-toggle"
          checked={mapVisible}
          onChange={e => setMapVisible(e.target.checked)}
          label="Show map?"
        />
      </ResultsHeader>
      {mapVisible &&
        (cookiesAccepted ? (
          <>
            <ListMap
              results={results}
              locationNavigate={locationNavigate}
              locationSearch={locationSearch}
            />
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
        currentPage={page}
        setNextPage={setNextPage}
        setPreviousPage={setPreviousPage}
        scrollTarget={scrollTarget}
      />
    </>
  )
}

export default MainContent
