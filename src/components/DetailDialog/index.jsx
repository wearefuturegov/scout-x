import React, { useState, useEffect } from "react"
import fetch from "isomorphic-unfetch"
import { useNavigate } from "@reach/router"
import { Dialog } from "@reach/dialog"
import "@reach/dialog/styles.css"
import Loader from "../Loader"

const DetailDialog = ({
    serviceId
}) => {

    const navigate = useNavigate()
    const [service, setService] = useState(false)
    
    const handleDismiss = () => {
        navigate("/")
    }

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_API_HOST}/services/${serviceId}`)
            .then(res => res.json())
            .then(data => setService(data.service || data.childcareService))
    }, [serviceId])

    return(
        <>
            {service ?
                <Dialog onDismiss={handleDismiss} aria-label={service.name}>
                    <button onClick={handleDismiss}>Close</button>
                    <h2>{service.name}</h2>
                    <p>{service.description}</p>
                </Dialog>
                :
                <Loader/>
            }
        </>
    )
}

export default DetailDialog