import React from "react"
import { Crosshead, CrossheadSub, Columns, Table } from "./DetailDialog.styles"
import { twelveHourTime } from "../../lib/utils"

const ScheduleTable = ({ title, subtitle, regular_schedules }) => {
  return (
    regular_schedules.length > 0 && (
      <Columns>
        {title && <Crosshead>{title}</Crosshead>}
        {subtitle && <CrossheadSub>{subtitle}</CrossheadSub>}
        <Table>
          <tbody>
            {regular_schedules.map((sched, i) => (
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
  )
}

export default ScheduleTable
