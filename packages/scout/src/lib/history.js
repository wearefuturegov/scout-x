import { createHistory, createMemorySource } from "@reach/router"

let history

export const setScoutHistorySource = (inMemory = false) => {
  // For embedded app use memory history and in all other cases - browser history

  console.log(
    `inMemory: ${inMemory} - if true use memory history else use browser history`
  )

  // false because we're not using this in ssr or testing purposes
  inMemory = false
  history = inMemory
    ? createHistory(createMemorySource("/"))
    : createHistory(window)

  return history
}

export const getHistory = () => history
