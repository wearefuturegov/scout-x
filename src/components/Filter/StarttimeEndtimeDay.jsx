import React, { useEffect, useState } from "react"
import styled from "styled-components"
import {
  Outer,
  Legend,
  Header,
  UnfoldButton,
  Content,
  Label,
  InputCheckbox,
  Field,
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

const AllFieldsForm = ({
  day,
  startTime,
  endTime,
  setDay,
  setStartTime,
  setEndTime,
  setPage,
}) => {
  const options = [
    ["Monday", "MO"],
    ["Tuesday", "TU"],
    ["Wednesday", "WE"],
    ["Thursday", "TH"],
    ["Friday", "FR"],
    ["Saturday", "SA"],
    ["Sunday", "SU"],
  ]

  useEffect(() => {
    const lengths = [startTime.length, endTime.length, day.length].filter(
      len => len > 0
    )
    if (lengths.length > 1 && !lengths.every(len => len === lengths[0])) {
      console.error(
        "The number of start_time, end_time, and day parameters must be equal if more than one is provided"
      )
    }
  }, [day, startTime, endTime])

  const handleDayChange = e => {
    let { checked, value } = e.target
    const dayValues = checked ? [...day, value] : day.filter(el => el !== value)
    setDay(dayValues)

    const numberOfDays = dayValues.length
    const repeatAndSetState = (stateArray, setState, setPage) => {
      if (stateArray.length >= 1) {
        const useValue = stateArray[0]
        setState(Array.from({ length: numberOfDays }, () => useValue))
      }
    }

    repeatAndSetState(startTime, setStartTime, setPage)
    repeatAndSetState(endTime, setEndTime, setPage)

    setPage(1)
  }

  const handleTimeChange = (setter, currentState) => e => {
    let { value } = e.target
    let timeValues
    if (value !== "") {
      if (day.length === 0) {
        timeValues = [value]
      } else {
        timeValues = Array.from({ length: day.length }, () => value)
      }
    } else {
      timeValues = currentState.filter(el => el !== value)
    }
    setter(timeValues)
    setPage(1)
  }

  const handleStartTimeChange = handleTimeChange(
    setStartTime,
    startTime,
    setPage
  )

  const handleEndTimeChange = handleTimeChange(setEndTime, endTime, setPage)

  const startTimeValue = startTime[0] ?? ""
  const endTimeValue = endTime[0] ?? ""

  return (
    <>
      {options.map(([label, slug], i) => (
        <Field key={`${slug}-${i}`}>
          <InputCheckbox
            type="checkbox"
            id={`${slug}-${i}`}
            value={slug}
            onChange={handleDayChange}
            checked={day.includes(slug)}
          />
          <Label htmlFor={`${slug}-${i}`}>{label}</Label>
        </Field>
      ))}
      <ColumnContent>
        <ColumnField>
          <LabelWithMargin htmlFor="start_date">Opens at</LabelWithMargin>
          <Input
            id={`start_date`}
            onChange={handleStartTimeChange}
            value={startTimeValue}
            type="time"
            step="60"
          />
        </ColumnField>
        <ColumnField>
          <LabelWithMargin htmlFor="end_date">Closes at</LabelWithMargin>
          <Input
            id={`end_date`}
            onChange={handleEndTimeChange}
            value={endTimeValue}
            type="time"
            step="60"
          />
        </ColumnField>
      </ColumnContent>
    </>
  )
}

const StarttimeEndtimeDayFilter = ({
  legend,
  startTime,
  endTime,
  day,
  setStartTime,
  setEndTime,
  setDay,
  setPage,
  foldable,
}) => {
  const [unfolded, setUnfolded] = useState(
    startTime.length > 0 || endTime.length > 0 || day.length > 0
  )

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
            <AllFieldsForm
              key={0}
              day={day}
              setDay={setDay}
              startTime={startTime}
              setStartTime={setStartTime}
              endTime={endTime}
              setEndTime={setEndTime}
              setPage={setPage}
            />
          </Content>
        </>
      )}
    </Outer>
  )
}

export default StarttimeEndtimeDayFilter
