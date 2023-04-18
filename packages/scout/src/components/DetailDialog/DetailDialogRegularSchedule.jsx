import React from "react"

import { DetailDialogStyles } from "./../../components"
import { twelveHourTime } from "~/src/utils"

const DetailDialogRegularSchedule = ({ regularSchedules }) => {
  const { Crosshead, Columns, Table } = DetailDialogStyles
  return (
    <Columns>
      <Crosshead>Hours</Crosshead>
      <Table>
        <tbody>
          {regularSchedules.map((sched, i) => (
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
    </Columns>
  )
}

export default DetailDialogRegularSchedule
