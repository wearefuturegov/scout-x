import React, { useState } from "react"
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

  const handleScheduleChange = e => {
    const selectedSchedule = e.target.value
    setSchedule(selectedSchedule)
    const scheduleValues = scheduleOptionValues[selectedSchedule]
    if (scheduleValues) {
      setStartDate(scheduleValues.startDate.toISOString().split("T")[0])
      setEndDate(scheduleValues.endDate.toISOString().split("T")[0])
    }
    setPage(1)
  }

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
                  onChange={e => setStartDate(e.target.value)}
                  value={startDate}
                  type="date"
                />
              </ColumnField>
              <ColumnField>
                <LabelWithMargin htmlFor="to_date">To</LabelWithMargin>
                <Input
                  id={`to_date`}
                  onChange={e => setEndDate(e.target.value)}
                  value={endDate}
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
