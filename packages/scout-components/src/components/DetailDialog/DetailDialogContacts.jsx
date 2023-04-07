import React from "react"

import { Crosshead, Columns } from "./DetailDialog.styles"
import { ContactName, ContactRole } from "./DetailDialogContacts.styles"

import { A } from "./../../"

const DetailDialogContacts = ({ contacts, serviceName }) => {
  return (
    <>
      <Crosshead>Who to contact</Crosshead>
      <Columns>
        {contacts.map(contact => (
          <div key={contact.id}>
            <ContactName>{contact.name || serviceName}</ContactName>
            {contact.title && <ContactRole>{contact.title}</ContactRole>}
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
    </>
  )
}

export default DetailDialogContacts
