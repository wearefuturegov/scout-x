import React from "react"
import styled from "styled-components"
import { Crosshead, CrossheadSub, Columns, Table } from "./DetailDialog.styles"
import { twelveHourTime } from "../../lib/utils"

export const EventList = styled.div`
  margin-bottom: 30px;
  &:last-of-type {
    margin-bottom: 0px;
  }
  div {
    margin-bottom: 20px;
    &:last-of-type {
      margin-bottom: 0px;
    }
  }
  /* @supports (display: grid) {
    @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 35px;
      row-gap: 25px;
      div {
        margin-bottom: 0px;
      }
    }
  } */
`

export const List = styled.ul`
  padding-left: 30px;
`

export const ListItem = styled.li`
  position: relative;
  line-height: 1.5;
  padding-left: 15px;
  margin-bottom: 10px;
  &:last-of-type {
    margin-bottom: 0px;
  }
`

const ScheduleTable = ({ title, subtitle, regular_schedules }) => {
  const { event_times, opening_times } = regular_schedules.reduce(
    (acc, sched) => {
      if (sched.dtstart) {
        acc.event_times.push(sched)
      } else {
        acc.opening_times.push(sched)
      }
      return acc
    },
    { event_times: [], opening_times: [] }
  )

  const OpeningTimes = () => (
    <Table>
      <tbody>
        {opening_times.map((sched, i) => (
          <tr key={i}>
            <td>
              <strong>{sched.weekday}s</strong>
            </td>
            <td>
              {twelveHourTime(sched.opens_at)} to{" "}
              {twelveHourTime(sched.closes_at)}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )

  const EventTimes = () => (
    <List>
      {event_times.map((sched, i) => (
        <ListItem key={i}>{sched.description}</ListItem>
      ))}
    </List>
  )

  return (
    <>
      {opening_times.length > 0 && (
        <Columns>
          {title && <Crosshead>{title}</Crosshead>}
          {subtitle && <CrossheadSub>{subtitle}</CrossheadSub>}
          <OpeningTimes />
        </Columns>
      )}
      {event_times.length > 0 && (
        <EventList>
          {title && <Crosshead>{title}</Crosshead>}
          {subtitle && <CrossheadSub>{subtitle}</CrossheadSub>}
          <EventTimes />
        </EventList>
      )}
    </>
  )
}

export default ScheduleTable
