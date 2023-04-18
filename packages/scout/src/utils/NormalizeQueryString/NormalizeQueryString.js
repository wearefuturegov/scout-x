const normalizeQueryString = query => {
  query = query.replace(/^\?/, "")

  if (query.length > 0) {
    query = `?${query}`
  }

  return query
}

export default normalizeQueryString
