import React from "react"

import { Crosshead, Columns, Table } from "./DetailDialog.styles"

const DetailDialogCostOptions = ({ costOptions }) => {
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
