import React from "react"

import { Crosshead, Columns, Table } from "./DetailDialog.styles"
import { twelveHourTime } from "./../../"

const DetailDialogRegularSchedule = ({ regularSchedules }) => {
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
