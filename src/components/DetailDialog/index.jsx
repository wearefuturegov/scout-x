import React, { useState, useEffect } from "react"
import fetch from "isomorphic-unfetch"
import { Dialog } from "@reach/dialog"
import "@reach/dialog/styles.css"
import Loader from "../Loader"

const DetailDialog = ({
    serviceId,
    location,
    navigate
}) => {

    const [service, setService] = useState(false)
    
    const handleDismiss = () => {
        navigate(`/${location.search}`)
    }

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_HOST}/services/${serviceId}`)
            .then(res => res.json())
            .then(data => setService(data.service))
    }, [serviceId])

    return service ?
        <Dialog onDismiss={handleDismiss} aria-label={service.name}>
            <button onClick={handleDismiss}>Close</button>
            <h2>{service.name}</h2>
            {service.description.split("\n").map((paragraph, i) =>
                <p key={i}>{paragraph}</p>
            )}
        </Dialog>
        :
        <Loader/>

}

export default DetailDialog