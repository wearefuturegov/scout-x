import React, { useState, useEffect } from "react"
import styled from "styled-components"

import fetch from "isomorphic-unfetch"
import { daysSince, buildGoodToKnow, truncate } from "../../lib/utils"
import { Helmet } from "react-helmet"
import "@reach/dialog/styles.css"

import { A } from "../A"
import PinboardButton from "../PinboardButton"
import Description from "../Description"
import LocalOffer from "../LocalOffer"
import Loader from "../Loader"
import { ButtonLink } from "../Button"
import { Body as InheritedBody, Header, Title } from "../Dialog/Dialog.styles"
import Dialog from "../Dialog"
import SingleLocation from "./SingleLocation"
import LocationAccordion from "./LocationAccordion"
import { TickList, TickListItem } from "../TickList"
import { theme } from "./../../themes/theme_generator"
import { checkCookiesAccepted } from "./../../lib/cookies"

import AlertStatic from "./../AlertStatic"

import { Crosshead, Columns, Table } from "./DetailDialog.styles"
import ScheduleTable from "./ScheduleTable"

const Body = styled(InheritedBody)`
  &:first-of-type {
    padding-top: 0px;
  }
`

const Banner = styled.p`
  background: ${props => props.theme.styles.pale};
  padding: 10px 50px;
  font-size: 0.95rem;
  color: ${props => props.theme.styles.grey};
  text-align: center;
`

const YellowBanner = styled(Banner)`
  background: ${props => props.theme.styles.focus}50;
  color: ${props => props.theme.styles.darkYellow};
`

const Caption = styled.p`
  color: ${props => props.theme.styles.grey};
  margin-bottom: 10px;
  font-size: 1.1rem;
  @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
    font-size: 1.2rem;
  }
`

const Actions = styled.div`
  margin-bottom: 30px;
  a:first-of-type {
    margin-bottom: 25px;
  }
  @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 40px;
    a:first-of-type {
      margin-bottom: 0px;
      margin-right: 30px;
    }
  }
`

const TwoColumnTickList = styled(TickList)`
  margin-top: 25px;
  list-style: none;
  @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 35px;
  }
`

const ContactName = styled.h3`
  line-height: 1.5;
  color: ${props => props.theme.styles.text};
`

const ContactRole = styled.p`
  margin-bottom: 5px;
  font-style: italic;
`

const Footer = styled(Body)`
  text-align: center;
  padding: 25px;
  @media screen and (min-width: ${props => props.theme.styles.breakpointM}) {
    padding: 45px;
  }
  p {
    margin-bottom: 10px;
    &::last-of-type {
      margin-bottom: 0px;
    }
  }
`

const SuggestEditLink = styled.a`
  display: inline-block;
  text-decoration: none;
  color: ${props => props.theme.styles.link};
  padding: 7px 25px;
  text-align: center;
  border: 3px solid ${props => props.theme.styles.link};
  font-size: 1rem;
  background: none;
  font-weight: bold;
  cursor: pointer;
  border-radius: 200px;
  margin-bottom: 20px;
  &:focus {
    outline: none;
    box-shadow: 0px 0px 0px 3px ${props => props.theme.styles.focus};
  }
  &:hover {
    color: ${props => props.theme.styles.linkHover};
    border-color: ${props => props.theme.styles.linkHover};
  }
  &:active {
    color: ${props => props.theme.styles.linkActive};
    border-color: ${props => props.theme.styles.linkActive};
  }
`

const DetailDialog = ({ serviceId, location, navigate }) => {
  const [service, setService] = useState(false)
  const cookiesAccepted = checkCookiesAccepted()
  const handleDismiss = () => {
    navigate(`/${location.search}`)
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_HOST}/services/${serviceId}`)
      .then(res => res.json())
      .then(data => setService(data))
  }, [serviceId])

  // handle 404
  if (service.error) navigate(`/`)

  if (service.name) {
    let goodToKnow = buildGoodToKnow(service)
    let categories = service.taxonomies

    const all_location_regular_schedules = service.regular_schedules.filter(
      v => v.service_at_location === null
    )

    const {
      all_location_event_times,
      all_location_opening_times,
    } = all_location_regular_schedules.reduce(
      (acc, sched) => {
        if (sched.dtstart) {
          acc.all_location_event_times.push(sched)
        } else {
          acc.all_location_opening_times.push(sched)
        }
        return acc
      },
      { all_location_event_times: [], all_location_opening_times: [] }
    )

    const location_regular_schedules = service.service_at_locations.reduce(
      (acc, schedule) => {
        if (schedule.regular_schedule && schedule.regular_schedule.length > 0) {
          const locationId = schedule.location_id
          if (!acc[locationId]) {
            acc[locationId] = {
              location: schedule.location,
              regular_schedules: [],
            }
          }
          acc[locationId].regular_schedules.push(...schedule.regular_schedule)
        }
        return acc
      },
      {}
    )

    return (
      <Dialog handleDismiss={handleDismiss} dialogTitle={service.name}>
        <Helmet>
          <title>
            {service.name} | {theme.title} | {theme.organisation}
          </title>
          <meta
            property="twitter:title"
            content={`${service.name} | ${theme.title} | ${theme.organisation}`}
          />
          <meta
            property="og:title"
            content={`${service.name} | ${theme.title} | ${theme.organisation}`}
          />

          {service.description && (
            <meta
              name="description"
              content={truncate(service.description, 22).replace(
                /(\r\n|\n|\r)/gm,
                " "
              )}
            />
          )}
          {service.description && (
            <meta
              property="twitter:description"
              content={truncate(service.description, 22).replace(
                /(\r\n|\n|\r)/gm,
                " "
              )}
            />
          )}
          {service.description && (
            <meta
              property="og:description"
              content={truncate(service.description, 22).replace(
                /(\r\n|\n|\r)/gm,
                " "
              )}
            />
          )}
        </Helmet>

        {service.status === "temporarily closed" ? (
          <YellowBanner>
            This service is <strong>temporarily closed</strong>.
          </YellowBanner>
        ) : (
          daysSince(service.updated_at) > 180 && (
            <Banner>Last updated more than six months ago</Banner>
          )
        )}

        <main>
          <Header>
            {service.organisation.name && (
              <Caption>{service.organisation.name}</Caption>
            )}
            <Title>{service.name}</Title>
          </Header>
          {!cookiesAccepted && (
            <AlertStatic>{theme.cookiesDisabledMessage}</AlertStatic>
          )}
          {service.service_at_locations.length === 1 && (
            <SingleLocation {...service.service_at_locations[0].location} />
          )}
          <Body>
            <Actions>
              {service.url ? (
                <ButtonLink href={service.url}>Visit website</ButtonLink>
              ) : (
                service.contacts.length === 1 &&
                service.contacts[0].email && (
                  <ButtonLink href={`mailto:${service.contacts[0].email}`}>
                    Send email
                  </ButtonLink>
                )
              )}
              <PinboardButton service={service} location={location} />
            </Actions>
            {service.description && (
              <Description description={service.description} />
            )}
            {service.service_at_locations.length > 1 && (
              <LocationAccordion
                service_at_locations={service.service_at_locations}
              />
            )}
          </Body>
          {goodToKnow.length > 0 && (
            <Body>
              <Crosshead>Good to know</Crosshead>
              <TwoColumnTickList>
                {goodToKnow.map(point => (
                  <TickListItem key={point}>
                    {point}
                    <br />
                    {point === "Needs a referral" && service.referral_url && (
                      <A href={service.referral_url}>Details</A>
                    )}
                  </TickListItem>
                ))}
              </TwoColumnTickList>
            </Body>
          )}
          {service.contacts.length > 0 && (
            <Body>
              <Crosshead>Who to contact</Crosshead>
              <Columns>
                {service.contacts.map(contact => (
                  <div key={contact.id}>
                    <ContactName>{contact.name || service.name}</ContactName>
                    {contact.title && (
                      <ContactRole>{contact.title}</ContactRole>
                    )}
                    {contact.phone && (
                      <p>
                        <A href={`tel:${contact.phone}`}>{contact.phone}</A>
                      </p>
                    )}
                    {contact.email && (
                      <p>
                        <A href={`mailto:${contact.email}`}>{contact.email}</A>
                      </p>
                    )}
                  </div>
                ))}
              </Columns>
            </Body>
          )}
          {service.local_offer && (
            <Body>
              <Crosshead>SEND support (Local Offer)</Crosshead>
              <LocalOffer
                {...service.local_offer}
                sendNeeds={service.send_needs}
              />
            </Body>
          )}
          {theme.DetailDialogExtra && (
            <theme.DetailDialogExtra service={service} />
          )}
          <Body>
            {service.hasOwnProperty("service_at_locations") &&
              service.service_at_locations.length === 1 &&
              service.service_at_locations[0].location.hasOwnProperty(
                "accessibilities"
              ) &&
              service.service_at_locations[0].location.accessibilities.length >
                0 && (
                <Columns>
                  <Crosshead>Access needs</Crosshead>
                  <TickList>
                    {service.service_at_locations[0].location.accessibilities.map(
                      point => (
                        <TickListItem key={point.name}>
                          {point.name}
                        </TickListItem>
                      )
                    )}
                  </TickList>
                </Columns>
              )}
            {service.hasOwnProperty("suitabilities") &&
              service.suitabilities.length > 0 && (
                <Columns>
                  <Crosshead>Suitable for</Crosshead>
                  <TickList>
                    {service.suitabilities.map(point => (
                      <TickListItem key={point.name}>{point.name}</TickListItem>
                    ))}
                  </TickList>
                </Columns>
              )}
            {/* 4 options

              just opening hours
              just event times

              event times and opening hours

              all at location */}
            {/* opening times for all locations and locations */}
            {all_location_opening_times.length > 0 && (
              <ScheduleTable
                title="Hours"
                regular_schedules={all_location_opening_times}
              />
            )}
            {Object.entries(location_regular_schedules).map(
              ([location_id, l]) => (
                <ScheduleTable
                  key={location_id}
                  subtitle={
                    l.location.name ||
                    l.location.address_1 ||
                    `Location ${location_id}`
                  }
                  regular_schedules={l.regular_schedules.filter(
                    v => v.dtstart === null
                  )}
                />
              )
            )}
            {/* event times for all locations and locations */}
            {all_location_event_times.length > 0 && (
              <ScheduleTable
                title="Times"
                regular_schedules={all_location_event_times}
              />
            )}{" "}
            {Object.entries(location_regular_schedules).map(
              ([location_id, l]) => (
                <ScheduleTable
                  key={location_id}
                  subtitle={
                    l.location.name ||
                    l.location.address_1 ||
                    `Location ${location_id}`
                  }
                  regular_schedules={l.regular_schedules.filter(
                    v => v.dtstart !== null
                  )}
                />
              )
            )}
            {service.cost_options.length > 0 && (
              <Columns>
                <Crosshead>Fees</Crosshead>
                <Table>
                  <tbody>
                    {service.cost_options.map((fee, i) => (
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
            )}
            {service.links.length > 0 && (
              <Columns>
                <Crosshead>Links</Crosshead>
                <div>
                  {service.links.map(link => (
                    <p key={link.url}>
                      <A href={link.url}>{link.label}</A>
                    </p>
                  ))}
                </div>
              </Columns>
            )}
            {!theme.serviceCard.hideCategories && categories.length > 0 && (
              <Columns>
                <Crosshead>Categories</Crosshead>
                <p>{categories.map(taxon => taxon.name).join(", ")}</p>
              </Columns>
            )}
          </Body>
          <Footer>
            {theme.outpostUrl && (
              <>
                <SuggestEditLink
                  target="blank"
                  href={`${theme.outpostUrl}/services/${service.id}/feedback`}
                >
                  Suggest an edit
                </SuggestEditLink>
                <p>
                  If anything here is out of date or missing, please suggest an
                  edit.
                </p>
              </>
            )}

            <p>
              We regularly check and update these community services, but can’t
              guarantee that they will always be accurate.
            </p>
            <p>
              You may need a referral for some activities and groups. Contact
              the organiser if unsure.
            </p>
          </Footer>
        </main>
      </Dialog>
    )
  }
  return <Loader />
}

export default DetailDialog
