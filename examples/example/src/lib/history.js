import { createHistory, createMemorySource } from "@gatsbyjs/reach-router"

let history

export const createMemoryOrBrowserHistory = (inMemory = false) => {
  // For embedded app use memory history and in all other cases - browser history
  history = inMemory
    ? createHistory(createMemorySource("/"))
    : createHistory(window)

  return history
}

export const getHistory = () => history
