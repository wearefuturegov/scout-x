import React from "react"

import { Helmet } from "react-helmet"
import "@reach/dialog/styles.css"

import Dialog from "../Dialog"

const SimpleDialog = ({ location, navigate }) => {
  console.log("using simpledialog")
  const handleDismiss = () => {
    console.log("handleDismiss")
    navigate(`../../${location.search}`)
  }

  return (
    <Dialog handleDismiss={handleDismiss} dialogTitle="SimpleDialog">
      <Helmet>
        <title>SimpleDialog</title>
      </Helmet>

      <main>A simple dialog</main>
    </Dialog>
  )
}

export default SimpleDialog
