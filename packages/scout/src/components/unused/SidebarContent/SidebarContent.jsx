import React from "react"
import { ClearFilters, Filters } from "./../../../components"
const SidebarContent = ({ filterDataApi }) => {
  const { clearFilters } = filterDataApi
  return (
    <Filters>
      {/* <RadioFilter
        name="collection"
        options={collectionOptions}
        selection={collection}
        setSelection={setCollection}
        clearThis={setCategories}
        setPage={setPage}
      /> */}
      {/* {subcategoryOptions.length > 0 && (
                <Filter
                  legend="Categories"
                  options={subcategoryOptions}
                  selection={categories}
                  setSelection={setCategories}
                  setPage={setPage}
                  foldable
                />
              )} */}
      {/* {orderFilters(filters, theme.filterOrder)} */}
      <ClearFilters clearFilters={clearFilters} />
    </Filters>
  )
}

export default SidebarContent
