import React from "react"

import { orderFilters } from "~/src/utils"

import {
  Filters,
  ClearFilters,
  Filter,
  AgeFilter,
  RadioFilter,
} from "./../../components"

// const filterSendNeeds = sendOptions.length > 0 && (
//   <Filter
//     key="sendNeeds"
//     legend="SEND needs"
//     options={sendOptions}
//     selection={needs}
//     setSelection={setNeeds}
//     setPage={setPage}
//     foldable
//   />
// )

// const filterAges = (
//   <AgeFilter
//     key="ages"
//     legend="Ages"
//     maxAge={maxAge}
//     setMaxAge={setMaxAge}
//     minAge={minAge}
//     setMinAge={setMinAge}
//     setPage={setPage}
//     foldable
//   />
// )

// const filterAccessibilities = accessibilityOptions.length > 0 && (
//   <Filter
//     key="accessibilities"
//     legend="Access needs"
//     options={accessibilityOptions}
//     selection={accessibilities}
//     setSelection={setAccessibilities}
//     setPage={setPage}
//     foldable
//   />
// )

// const filterOnlyShow = onlyOptions.length > 0 && (
//   <Filter
//     key="onlyShow"
//     legend="Only show"
//     options={onlyOptions}
//     selection={only}
//     setSelection={setOnly}
//     setPage={setPage}
//     foldable
//   />
// )

// const filterDays = daysOptions.length > 0 && (
//   <Filter
//     key="days"
//     legend="Days"
//     options={daysOptions}
//     selection={days}
//     setSelection={setDays}
//     setPage={setPage}
//     foldable
//   />
// )

// const filterSuitabilities = suitabilityOptions.length > 0 && (
//   <Filter
//     key="suitabilities"
//     legend="Suitable for"
//     options={suitabilityOptions}
//     selection={suitabilities}
//     setSelection={setSuitabilities}
//     setPage={setPage}
//     foldable
//   />
// )

// const filters = {
//   sendNeeds: {
//     component: filterSendNeeds,
//     clear: [setNeeds],
//     clearValue: [[]],
//   },
//   ages: {
//     component: filterAges,
//     clear: [setMinAge, setMaxAge],
//     clearValue: [false, false],
//   },
//   accessibilities: {
//     component: filterAccessibilities,
//     clear: [setAccessibilities],
//     clearValue: [[]],
//   },
//   onlyShow: {
//     component: filterOnlyShow,
//     clear: [setOnly],
//     clearValue: [[]],
//   },
//   days: {
//     component: filterDays,
//     clear: [setDays],
//     clearValue: [[]],
//   },
//   suitabilities: {
//     component: filterSuitabilities,
//     clear: [setSuitabilities],
//     clearValue: [[]],
//   },
// }

const SidebarContent = ({ location, navigate }) => {
  return <>SidebarContent</>
  // return (
  //   <Filters>
  //     <RadioFilter
  //       name="collection"
  //       options={collectionOptions}
  //       selection={collection}
  //       setSelection={setCollection}
  //       clearThis={setCategories}
  //       setPage={setPage}
  //     />
  //     {subcategoryOptions.length > 0 && (
  //       <Filter
  //         legend="Categories"
  //         options={subcategoryOptions}
  //         selection={categories}
  //         setSelection={setCategories}
  //         setPage={setPage}
  //         foldable
  //       />
  //     )}
  //     {orderFilters(filters, theme.filterOrder)}
  //     <ClearFilters
  //       setPage={setPage}
  //       filters={filters}
  //       clearCategory={setCollection}
  //       clearSubCategory={setCategories}
  //     />
  //   </Filters>
  // )
}

export default SidebarContent
