import React from "react"

import { DetailDialogStyles } from "./../../components"

const DetailDialogCostOptions = ({ costOptions }) => {
  const { Crosshead, Columns, Table } = DetailDialogStyles
  return (
    <Columns>
      <Crosshead>Fees</Crosshead>
      <Table>
        <tbody>
          {costOptions.map((fee, i) => (
            <tr key={i}>
              <td>
                <strong>{fee.option}</strong>
              </td>
              <td>
                £{fee.amount} {fee.cost_type}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Columns>
  )
}

export default DetailDialogCostOptions
