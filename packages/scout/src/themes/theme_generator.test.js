import { getThemeLabel } from "./theme_generator"

require("dotenv").config()
describe("getThemeLabel when environmental variable set", () => {
  it("Returns a lowercase string of the REACT_APP_THEME environmental variable", () => {
    expect(getThemeLabel()).toBe("generic")
  })
})

describe("getThemeLabel when environmental variable is empty", () => {
  const OLD_ENV = process.env

  beforeEach(() => {
    jest.resetModules() // clears the cache
    process.env = {
      ...OLD_ENV,
    }
  })

  afterEach(() => {
    process.env = OLD_ENV // Restore old environment
  })

  it("returns generic if no REACT_APP_THEME environmental variable is set", () => {
    let envs = {
      ...OLD_ENV,
    }
    envs = Object.keys(envs)
      .filter(key => key !== "REACT_APP_THEME")
      .reduce((obj, key) => {
        obj[key] = envs[key]
        return obj
      }, {})
    process.env = envs

    expect(getThemeLabel()).toBe("generic")
  })
})
