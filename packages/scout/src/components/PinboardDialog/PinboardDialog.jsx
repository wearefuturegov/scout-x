import React, { useState } from "react"

import {
  Dialog,
  DialogStyles,
  ServiceCard,
  ShareDialog,
} from "~/src/components"

import { usePinboardState, useSettingsState } from "~/src/contexts"

import { useNavigate } from "react-router-dom"

import { Body, Count, EmailButton, PrintLink } from "./PinboardDialog.styles"

const PinboardDialog = ({ location }) => {
  console.log("PinboardDialog")
  const navigate = useNavigate()
  const { pinboard } = usePinboardState()
  const { settings } = useSettingsState()
  const [dialogOpen, setDialogOpen] = useState(false)
  const { Header, Title } = DialogStyles

  const handleDismiss = () => {
    console.log("handleDismiss")
    navigate(`${settings.basePath || ""}/${location.search}`)
  }

  return (
    <Dialog handleDismiss={handleDismiss} dialogTitle="Pinboard">
      <main>
        <Header>
          <Title>
            Pinned services
            <Count> ({pinboard.length})</Count>
          </Title>
          <PrintLink href="/print" target="blank">
            Print list
          </PrintLink>
          <EmailButton onClick={() => setDialogOpen(true)}>
            Email list
          </EmailButton>
        </Header>
        <Body>
          {pinboard.map(pin => (
            <ServiceCard key={pin.id} {...pin} />
          ))}
        </Body>
        <ShareDialog
          isOpen={dialogOpen}
          handleDismiss={() => setDialogOpen(false)}
          pinboard={pinboard}
        />
      </main>
    </Dialog>
  )
}

export default PinboardDialog
