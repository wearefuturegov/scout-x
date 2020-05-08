import fetch from "isomorphic-unfetch"

export const fetchResultsByQuery = async query => {
    const res = await fetch(`${process.env.REACT_APP_API_HOST}/services${query}`)
    return await res.json()
}