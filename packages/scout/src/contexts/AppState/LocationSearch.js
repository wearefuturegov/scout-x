import { useLocation } from "@reach/router"
import { normalizeQueryString } from "@outpost-platform/scout-components"
const LocationSearch = () => {
  const { search } = useLocation()
  return normalizeQueryString(search)
}

export default LocationSearch
