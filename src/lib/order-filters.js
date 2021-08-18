export const orderFilters = (filters, filterOrder) => {
  // ensure its sorted by order
  filterOrder.sort((a, b) => (a.order > b.order ? 1 : -1))

  const output = []

  // build the filter tree in order
  filterOrder.map(filter => {
    switch (filter.name) {
      case "send-needs":
        output.push(filters.filterSendNeeds)
        break
      case "ages":
        output.push(filters.filterAges)
        break
      case "accessibility":
        output.push(filters.filterAccessibility)
        break
      case "only-show":
        output.push(filters.filterOnlyShow)
        break
      case "days":
        output.push(filters.filterDays)
        break
      default:
        return false
    }
    return false
  })

  return output
}
