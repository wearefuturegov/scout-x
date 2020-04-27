import React, {useState, useEffect} from "react"
import fetch from "isomorphic-unfetch"
import { useHistory } from "react-router-dom"
import { Dialog, DialogOverlay, DialogContent } from "@reach/dialog"
import "@reach/dialog/styles.css"


const DetailDialog = () => {

    const history = useHistory()

    const handleDismiss = () => {
        history.push("/")
    }

    const [service, setService] = useState({})

    useEffect(()=>{
        fetch("/")
    }, [])

    return(
        <>
            <Dialog onDismiss={handleDismiss}>
                <h2>{}</h2>
            </Dialog>
        </>
    )
}

export default DetailDialog