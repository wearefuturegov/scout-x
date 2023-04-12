import fetch from "isomorphic-unfetch"
import React, { useEffect, useState } from "react"

import "@reach/dialog/styles.css"

import {
  AlertStatic,
  Description,
  Dialog,
  Loader,
  LocationAccordion,
  SingleLocation,
} from "./../../"

import { theme } from "./../../themes/theme_generator"

import DetailDialogAccessibilities from "./DetailDialogAccessibilities"
import DetailDialogActions from "./DetailDialogActions"
import DetailDialogBanners from "./DetailDialogBanners"
import DetailDialogCategories from "./DetailDialogCategories"
import DetailDialogContacts from "./DetailDialogContacts"
import DetailDialogFooter from "./DetailDialogFooter"
import DetailDialogHeader from "./DetailDialogHeader"
import DetailDialogHelmet from "./DetailDialogHelmet"
import DetailDialogLocalOffer from "./DetailDialogLocalOffer"
import DetailDialogRegularSchedule from "./DetailDialogRegularSchedule"
import DetailDialogSuitabilities from "./DetailDialogSuitabilities"
// import DetailDialogGoodToKnow from "./DetailDialogGoodToKnow"

import { useNavigate, useParams } from "react-router-dom"
import { Body } from "./DetailDialog.styles"

const DetailDialog = ({ locationSearch, locationNavigate }) => {
  console.log("DetailDialog")
  const [service, setService] = useState(false)
  let { serviceId } = useParams()
  const navigate = useNavigate()
  // TODO cookies
  const cookiesAccepted = true
  const handleDismiss = () => {
    navigate(`../../${locationSearch}`)
  }

  //TODO put this somewher ebettwe
  useEffect(() => {
    // fetch(`${process.env.REACT_APP_API_HOST}/services/${serviceId}`)
    fetch(`http://localhost:3001/api/v1/services/${serviceId}`)
      .then(res => res.json())
      .then(data => {
        setService(data)
      })
  }, [serviceId])

  // handle 404
  if (service.error) navigate(`../../`)
  if (service.name) {
    return (
      <Dialog handleDismiss={handleDismiss} dialogTitle={service.name}>
        <DetailDialogHelmet
          name={service.name}
          description={service.description}
          siteTitle={theme.title}
          siteOrganisation={theme.organisation}
        />
        <DetailDialogBanners
          status={service.status}
          updated_at={service.updated_at}
        />
        <main>
          <DetailDialogHeader
            serviceName={service.name}
            organisationName={service.organisation.name}
          />
          {!cookiesAccepted && (
            <AlertStatic>{theme.cookiesDisabledMessage}</AlertStatic>
          )}

          {service.locations.length === 1 && (
            <SingleLocation {...service.locations[0]} />
          )}
          <Body>
            <DetailDialogActions service={service} />
            {service.description && (
              <Description description={service.description} />
            )}
            {service.locations.length > 1 && (
              <LocationAccordion locations={service.locations} />
            )}
          </Body>
          {/* <DetailDialogGoodToKnow service={service} /> */}
          {service.contacts.length > 0 && (
            <Body>
              <DetailDialogContacts
                contacts={service.contacts}
                serviceName={service.name}
              />
            </Body>
          )}
          {service.local_offer && (
            <Body>
              <DetailDialogLocalOffer
                localOffer={service.local_offer}
                sendNeeds={service.send_needs}
              />
            </Body>
          )}
          <Body>
            {service.hasOwnProperty("locations") &&
              service.locations.length === 1 &&
              service.locations[0].hasOwnProperty("accessibilities") &&
              service.locations[0].accessibilities.length > 0 && (
                <DetailDialogAccessibilities location={service.locations[0]} />
              )}
            {service.hasOwnProperty("suitabilities") &&
              service.suitabilities.length > 0 && (
                <DetailDialogSuitabilities
                  suitabilities={service.suitabilities}
                />
              )}
            {service.regular_schedules.length > 0 && (
              <DetailDialogRegularSchedule
                regularSchedule={service.regular_schedules}
              />
            )}
            {service.cost_options.length > 0 && (
              <DetailDialogCostOptions costOptions={service.cost_options} />
            )}
            {service.links.length > 0 && (
              <DetailDialogLinks links={service.links} />
            )}
            {!theme.serviceCard.hideCategories &&
              service?.categories?.length > 0 && (
                <DetailDialogCategories categories={service.taxonomies} />
              )}
          </Body>
          <DetailDialogFooter
            SuggestEditLinkUrl={`${theme.outpostUrl}/services/${service.id}/feedback`}
          />
        </main>
      </Dialog>
    )
  }
  return <Loader />
}

export default DetailDialog
