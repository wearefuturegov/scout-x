import React, { useState } from "react"
import styled from "styled-components"
import theme from "../_theme"
import Dialog, { Header, Title } from "../Dialog"
import { PinboardContextConsumer } from "../../contexts/pinboardContext"
import ServiceCard from "../ServiceCard"
import ShareDialog from "../ShareDialog"

export const Body = styled.ul`
  padding: 25px;
  list-style: none;
  background: ${theme.pale};
  @media screen and (min-width: ${theme.breakpointM}) {
    padding: 45px;
  }
  li:last-child {
    margin-bottom: 0px;
  }
`

const PrintLink = styled.a`
  margin-top: 25px;
  display: block;
  text-align: center;
  padding: 10px 25px;
  background: ${theme.link};
  color: ${theme.white};
  font-weight: bold;
  text-decoration: none;
  border: 3px solid ${theme.link};
  &:hover {
    background: ${theme.linkHover};
    border-color: ${theme.linkHover};
  }
  &:active {
    background: ${theme.linkActive};
    border-color: ${theme.linkActive};
  }
  &:focus {
    outline: 3px solid ${theme.focus};
  }
  @media screen and (min-width: ${theme.breakpointS}) {
    display: inline-block;
    margin-right: 15px;
  }
`

const EmailButton = styled.button`
  margin-top: 15px;
  display: block;
  width: 100%;
  text-align: center;
  padding: 10px 25px;
  background: ${theme.white};
  font-size: 1rem;
  cursor: pointer;
  color: ${theme.link};
  font-weight: bold;
  text-decoration: none;
  border: 3px solid ${theme.link};
  &:hover {
    color: ${theme.linkHover};
    border-color: ${theme.linkHover};
  }
  &:active {
    color: ${theme.linkActive};
    border-color: ${theme.linkActive};
  }
  &:focus {
    outline: 3px solid ${theme.focus};
  }
  @media screen and (min-width: ${theme.breakpointS}) {
    display: inline-block;
    margin-right: 15px;
    width: inherit;
  }
`

const Count = styled.span`
  font-weight: normal;
`

const PinboardDialog = ({ location, navigate, pinboard }) => {
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleDismiss = () => {
    navigate(`/${location.search}`)
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

export default props => (
  <PinboardContextConsumer>
    {pinContext => <PinboardDialog {...pinContext} {...props} />}
  </PinboardContextConsumer>
)
