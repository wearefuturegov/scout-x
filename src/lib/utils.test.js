import { truncate, prettyDistance, twelveHourTime } from "./utils"

describe("truncate", () => {
  it("leaves short text unaltered", () => {
    expect(truncate("Example input", 2)).toBe("Example input")
  })
  it("truncates longer text", () => {
    expect(truncate("Example input example input", 2)).toBe("Example input...")
  })
})

describe("prettyDistance", () => {
  it("displays short distances properly", () => {
    expect(prettyDistance(0.4)).toBe("Less than a mile away")
  })
  it("displays medium distances properly", () => {
    expect(prettyDistance(1)).toBe("About a mile away")
  })
  it("displays longer distances properly", () => {
    expect(prettyDistance(100)).toBe("About 100 miles away")
  })
})

describe("twelveHourTime", () => {
  it("displays mornings properly", () => {
    expect(twelveHourTime("10:00")).toBe("10.00 am")
  })
  it("displays afternoons properly", () => {
    expect(twelveHourTime("17:00")).toBe("5.00 pm")
  })
  it("displays midnight properly", () => {
    expect(twelveHourTime("00:00")).toBe("12.00 am")
  })
})
