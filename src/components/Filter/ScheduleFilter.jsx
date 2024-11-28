import React, { useEffect, useState } from "react"
import styled from "styled-components"
import {
  Outer,
  Legend,
  Header,
  UnfoldButton,
  Content,
  RadioLabel,
  RadioField,
  InputRadio,
} from "./layout"

const ColumnContent = styled(Content)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 25px;
  border-bottom: 0;
`

const ColumnField = styled.div`
  margin-bottom: 25px;
  @supports (display: grid) {
    margin-bottom: 0px;
  }
`

const LabelWithMargin = styled.label`
  color: ${props => props.theme.styles.text};
  cursor: pointer;
  display: block;
  margin-bottom: 7px;
`

const Input = styled.input`
  font-size: 0.9rem;
  padding: 7px;
  border: 2px solid ${props => props.theme.styles.text};
  display: block;
  width: 100%;
  &:focus {
    outline: 3px solid ${props => props.theme.styles.focus};
  }
  &::placeholder {
    opacity: 0.3;
  }
`
const scheduleOptions = [
  ["Today", "today"],
  ["Tomorrow", "tomorrow"],
  ["Next 7 Days", "next7Days"],
  ["Next 30 Days", "next30Days"],
]

const today = new Date()
const tomorrow = new Date(today)
tomorrow.setDate(today.getDate() + 1)

const next7DaysStart = new Date(today)
const next7DaysEnd = new Date(today)
next7DaysEnd.setDate(today.getDate() + 7)

const next30DaysStart = new Date(today)
const next30DaysEnd = new Date(today)
next30DaysEnd.setDate(today.getDate() + 30)

const scheduleOptionValues = {
  today: {
    startDate: today,
    endDate: today,
  },
  tomorrow: {
    startDate: tomorrow,
    endDate: tomorrow,
  },
  next7Days: {
    startDate: next7DaysStart,
    endDate: next7DaysEnd,
  },
  next30Days: {
    startDate: next30DaysStart,
    endDate: next30DaysEnd,
  },
}

const ScheduleFilter = ({
  legend,
  schedule,
  startDate,
  endDate,
  setSchedule,
  setStartDate,
  setEndDate,
  setPage,
  foldable,
}) => {
  const [unfolded, setUnfolded] = useState(schedule)
  const [internalFromDate, setInternalFromDate] = useState(startDate)
  const [internalToDate, setInternalToDate] = useState(endDate)

  // handle the presets - sets internal values
  const handleScheduleChange = e => {
    const selectedSchedule = e.target.value
    setSchedule(selectedSchedule)
    const scheduleValues = scheduleOptionValues[selectedSchedule]
    if (scheduleValues) {
      setInternalFromDate(scheduleValues.startDate.toISOString().split("T")[0])
      setInternalToDate(scheduleValues.endDate.toISOString().split("T")[0])
    }
    setPage(1)
  }

  // when only end date is set - set start date to today or the same as from date end date is on or before today
  useEffect(() => {
    if (internalToDate && !internalFromDate) {
      const today = new Date()
      const toDate = new Date(internalToDate)

      if (toDate <= today) {
        setInternalFromDate(internalToDate)
      } else {
        setInternalFromDate(today.toISOString().split("T")[0])
      }
    }
  }, [internalFromDate, internalToDate])

  // when internal from and to values are set - update the global state
  useEffect(() => {
    if (internalFromDate && internalToDate) {
      setStartDate(internalFromDate)
      setEndDate(internalToDate)
      setPage(1)
    }
  }, [internalFromDate, internalToDate, setEndDate, setPage, setStartDate])

  // clear internal value when global value is cleared
  useEffect(() => {
    setInternalFromDate(startDate)
    setInternalToDate(endDate)
  }, [endDate, startDate])

  return (
    <Outer>
      <Header>
        {foldable ? (
          <UnfoldButton
            type="button"
            aria-expanded={unfolded ? "true" : "false"}
            onClick={() => setUnfolded(!unfolded)}
          >
            <Legend>{legend}</Legend>
          </UnfoldButton>
        ) : (
          <Legend>{legend}</Legend>
        )}
      </Header>
      {(!foldable || unfolded) && (
        <>
          <Content>
            {scheduleOptions.map(([label, slug], i) => (
              <RadioField key={`${slug}-${i}`}>
                <InputRadio
                  type="radio"
                  id={`${slug}-${i}`}
                  name="schedule"
                  value={slug}
                  onChange={handleScheduleChange}
                  checked={schedule === slug}
                />
                <RadioLabel htmlFor={`${slug}-${i}`}>{label}</RadioLabel>
              </RadioField>
            ))}

            <ColumnContent>
              <ColumnField>
                <LabelWithMargin htmlFor="from_date">From</LabelWithMargin>
                <Input
                  id={`from_date`}
                  onChange={e => setInternalFromDate(e.target.value)}
                  value={internalFromDate}
                  type="date"
                />
              </ColumnField>
              <ColumnField>
                <LabelWithMargin htmlFor="to_date">To</LabelWithMargin>
                <Input
                  id={`to_date`}
                  onChange={e => setInternalToDate(e.target.value)}
                  value={internalToDate}
                  type="date"
                />
              </ColumnField>
            </ColumnContent>
          </Content>
        </>
      )}
    </Outer>
  )
}

export default ScheduleFilter
