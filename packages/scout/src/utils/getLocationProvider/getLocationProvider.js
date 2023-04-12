import { createHistory, createMemorySource } from "@reach/router"

// @TODO allow this base path to be changed
const source = createMemorySource("/")
// TODO source doesn't work - navigate never resolves!? https://github.com/reach/router/issues/225
const history = createHistory(source)
const navigate = history.navigate

export { history, navigate }
