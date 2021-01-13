import { truncate, 
    prettyDistance, 
    // daysSince, 
    // wheelchairAccessible, 
    // openWeekends, 
    // openAfterSix, 
    // twelveHourTime
} from "./utils"

describe("truncate", () => {
    it("leaves short text unaltered", () => {
        const output = truncate("Example input", 2)
        expect(output).toBe("Example input")
    })
    it("truncates longer text", () => {
        const output = truncate("Example input example input", 2)
        expect(output).toBe("Example input...")
    })
})

describe("prettyDistance", () => {
    it("displays short distances properly", () => {
        const output = prettyDistance(0.4)
        expect(output).toBe("Less than a mile away")
    })
    it("displays medium distances properly", () => {
        const output = prettyDistance(1)
        expect(output).toBe("About a mile away")
    })
    it("displays longer distances properly", () => {
        const output = prettyDistance(100)
        expect(output).toBe("About 100 miles away")
    })
})