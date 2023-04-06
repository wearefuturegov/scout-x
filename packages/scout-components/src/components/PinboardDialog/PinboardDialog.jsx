import React, { useState } from "react"

import {
  usePinboardState,
  useSettingsState,
  ShareDialog,
  ServiceCard,
  Dialog,
  DialogStyles,
} from "./../../"

import { Body, PrintLink, EmailButton, Count } from "./PinboardDialog.styles"

// const { Header, Title } = DialogStyles

console.log(DialogStyles)

const PinboardDialog = ({ location, navigate }) => {
  const { pinboard } = usePinboardState()
  const { settings } = useSettingsState()
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleDismiss = () => {
    navigate(`${settings.basePath || ""}/${location.search}`)
  }

  return (
    <Dialog handleDismiss={handleDismiss} dialogTitle="Pinboard">
      <main>
        {/* <Header> */}
        {/* <Title> */}
        Pinned services
        <Count> ({pinboard.length})</Count>
        {/* </Title> */}
        <PrintLink href="/print" target="blank">
          Print list
        </PrintLink>
        <EmailButton onClick={() => setDialogOpen(true)}>
          Email list
        </EmailButton>
        {/* </Header> */}
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
