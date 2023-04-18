/* eslint-disable no-unused-vars */
import React, { useRef } from "react"
import { Link, Outlet } from "react-router-dom"
import { Debugger, Layout, SearchBar, MainContent } from "~/src/components"
import { useSettingsState } from "~/src/contexts"
import { Helmet } from "react-helmet"
import {
  useAppState,
  useAppStateApi,
  useFilterDataState,
  useServiceDataState,
  useCookiesState,
} from "~/src/contexts"
import { theme } from "~/src/themes"

import {
  AlertStatic,
  ListMap,
  ListMapStatic,
  Pagination,
  PinboardLink,
  ResultsCount,
  ResultsHeader,
  ResultsFooter,
  ResultsList,
  ResultsNone,
  ServiceCard,
  ServiceCardSkeleton,
  Switch,
  ResultsLoading,
  Button,
  ButtonSecondary,
  Loader,
} from "~/src/components"

const Main = ({ children }) => {
  const scrollTarget = useRef(null)
  const {
    settings: { embedded },
  } = useSettingsState()

  const {
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
    setAppStateFromObject,
    goToServiceDetails,
    getServiceDetailsPath,
  } = useAppStateApi()

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

  const {
    taxonomies,
    suitabilities,
    sendNeeds,
    accessibilities,
  } = useFilterDataState()

  const {
    serviceStatus,
    serviceData,
    serviceError,
    serviceIsFetching,
    serviceIsPreviousData,
    servicePaginationInfo,
  } = useServiceDataState()

  const { cookiesAccepted } = useCookiesState()

  return (
    <>
      {embedded ? "embedded" : "not embedded"}

      {embedded ? null : (
        <Helmet>
          <title>
            {page > 1 ? `Page ${page} ` : `${theme.tagline} `}| {theme.title} |{" "}
            {theme.organisation}
          </title>
        </Helmet>
      )}
      <Layout
        embedded={embedded}
        scrollRef={scrollTarget}
        headerComponents={
          <>
            <SearchBar
              setAppStateFromObject={setAppStateFromObject}
              searchKeywords={searchKeywords}
              searchLocation={searchLocation}
            />
          </>
        }
        sidebarComponents={<>sidebar</>}
        mainContentComponents={
          <>
            <ResultsHeader>
              <ResultsCount>
                {(serviceData?.content || serviceData?.content.length > 0) && (
                  <>
                    Showing{" "}
                    {servicePaginationInfo.currentPage <=
                      servicePaginationInfo.lastPage && (
                      <>
                        <strong>
                          {servicePaginationInfo.from} -{" "}
                          {servicePaginationInfo.to} out of{" "}
                          {servicePaginationInfo.total}
                        </strong>{" "}
                      </>
                    )}
                    results{" "}
                    {searchKeywords && (
                      <>
                        for <strong>{searchKeywords}</strong>
                      </>
                    )}{" "}
                    {searchLocation && (
                      <>
                        near <strong>{searchLocation}</strong>
                      </>
                    )}
                  </>
                )}
              </ResultsCount>
              {/* @TODO when loading map we don't need to fetch services again */}
              <Switch
                id="map-toggle"
                checked={mapVisible}
                onChange={e => setMapVisible(e.target.checked)}
                label="Show map?"
              />
            </ResultsHeader>
            {mapVisible && (
              <>
                {cookiesAccepted ? (
                  <ListMap
                    serviceStatus={serviceStatus}
                    serviceData={serviceData?.content}
                    goToServiceDetails={goToServiceDetails}
                  />
                ) : (
                  <>
                    <AlertStatic>{theme.cookiesDisabledMessage}</AlertStatic>
                    <ListMapStatic
                      serviceStatus={serviceStatus}
                      serviceData={serviceData?.content}
                    />
                  </>
                )}
              </>
            )}
            <PinboardLink />
            {serviceStatus === "loading" ? (
              <ResultsList aria-live="polite">
                <ServiceCardSkeleton limit={1} />
              </ResultsList>
            ) : serviceStatus === "error" ? (
              <ResultsNone>
                There was a problem fetching results. Please try again later.{" "}
                {/* {serviceError.message} */}
              </ResultsNone>
            ) : // `data` will either resolve to the latest page's data
            // or if fetching a new page, the last successful page's data
            serviceData?.content || serviceData.content.length > 0 ? (
              <ResultsList aria-live="polite">
                {serviceData.content?.map(s => (
                  <ServiceCard
                    getServiceDetailsPath={getServiceDetailsPath}
                    key={s.id}
                    {...s}
                  />
                ))}
              </ResultsList>
            ) : (
              <ResultsNone>
                No results to show. Try widening your search.
              </ResultsNone>
            )}
            {
              // Since the last page's data potentially sticks around between page requests,
              // we can use `isFetching` to show a background loading
              // indicator since our `status === 'loading'` state won't be triggered
              serviceIsFetching ? (
                <ResultsList aria-live="polite">
                  <Loader position="relative" />
                  {/* <ServiceCardSkeleton /> */}
                </ResultsList>
              ) : null
            }
            <ResultsFooter>
              {servicePaginationInfo.totalPages >
                servicePaginationInfo.currentPage && (
                <Button
                  disabled={serviceIsPreviousData || serviceData?.last}
                  onClick={() => {
                    scrollTarget.current.scrollIntoView()
                    setPage(servicePaginationInfo.nextPage)
                  }}
                >
                  Next page
                </Button>
              )}
              {servicePaginationInfo.currentPage > 1 && (
                <ButtonSecondary
                  disabled={page === 1}
                  onClick={() => {
                    scrollTarget.current.scrollIntoView()
                    setPage(servicePaginationInfo.prevPage)
                  }}
                >
                  Previous page
                </ButtonSecondary>
              )}
            </ResultsFooter>
          </>
        }
      />
      <Outlet />
      {children}
      {/* <Debugger /> */}
    </>
  )
}

export default Main
