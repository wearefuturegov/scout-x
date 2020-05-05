import React, { useRef, useEffect, useState } from "react"
import styled from "styled-components"
import theme from "../_theme"
import { GoogleContextConsumer } from "../../contexts/googleContext"

const Input = styled.input`
    font-size: 1rem;
    padding: 10px;
    border: 2px solid ${theme.text};
    display: block;
    width: 100%;
    height: 45px;
    padding-right: 45px;
    &:focus{
        outline: 3px solid ${theme.focus};
    }
    &::placeholder{
        opacity: 0.3;
    }
`

const AutocompletePlacesInput = ({
    name,
    id,
    placeholder,
    onChange,
    value,
    isLoaded
}) => {

    const [latLng, setLatLng] = useState([0,0])
    const inputRef = useRef(false)
    let autocomplete = null

    useEffect(() => {
        if(isLoaded){
            // eslint-disable-next-line
            autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, { 
                types: ["geocode"]
            })
            autocomplete.setComponentRestrictions({"country": ["gb"]})
            autocomplete.addListener("place_changed", handlePlaceChanged)
        }
    }, [isLoaded])

    const handlePlaceChanged = () => {
        const place = autocomplete.getPlace()
        if(place.geometry){
            const lat = place.geometry.location.lat()
            const lng = place.geometry.location.lng()
            setLatLng([lat, lng])
            // feed a synthetic event to the change handler if it exists
            if(onChange) onChange({
                target: {
                    value: place.formatted_address
                }
            })
        }
    }

    return(
        <>
            <Input 
                ref={inputRef}
                name={name}
                value={value}
                onChange={onChange}
                required
                id={id}
                placeholder={placeholder}
            />
            <input type="hidden" name="lat" value={latLng[0]} readOnly/>
            <input type="hidden" name="lng" value={latLng[1]} readOnly/>
        </>
    )
}

const WrappedInput = props =>
    <GoogleContextConsumer>
        {context =>
            <AutocompletePlacesInput isLoaded={context.isLoaded} {...props}/>
        }
    </GoogleContextConsumer>

export default WrappedInput