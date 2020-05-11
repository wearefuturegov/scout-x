import React, { useState } from "react"
import theme from "../_theme"
import styled from "styled-components"
import search from "./search.svg"
import location from "./location.svg"
import config from "../../data/_config"
import AutocompletePlaceInput from "../AutocompletePlaceInput"
import Spinner from "../Spinner"
import { AlertContextConsumer } from "../../contexts/alertContext"
import Tooltip from "../Tooltip"

const Form = styled.form`
    @media screen and (min-width: ${theme.breakpointM}){
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        width: 100%;
    }
`

const Field = styled.div`
    margin-bottom: 15px;
    position: relative;
    @media screen and (min-width: ${theme.breakpointM}){
        margin-bottom: 0px;
        margin-right: 20px;
        flex: 1;
    }
`

const Label = styled.label`
    margin-bottom: 5px;
    display: inline-block;
`

const Select = styled.select`
    font-size: 1rem;
    padding: 10px;
    border: 2px solid ${theme.text};
    display: block;
    width: 100%;
    border-radius: 0px;
    appearance: none;
    -moz-appearance: none;
    -ms-appearance: none;
    -webkit-appearance: none;
    background: ${theme.white};
    background-image: url("data:image/svg+xml,%3Csvg fill='none' height='31' viewBox='0 0 42 31' width='42' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m0 0h42v31h-42z' fill='%23fff'/%3E%3Cpath clip-rule='evenodd' d='m20.9393 21-9.0606-9.0607 2.1213-2.12128 6.9393 6.93938 6.9394-6.93938 2.1213 2.12128z' fill='%23212121' fill-rule='evenodd'/%3E%3C/svg%3E");
    background-position: center right;
    background-repeat: no-repeat;
    padding-right: 45px;
    height: 45px;
    &:focus{
        outline: 3px solid ${theme.focus};
    }
    &::-ms-expand {
        display: none;
    }
`

const GeolocateButton = styled.button`
    position: absolute;
    right: 2px;
    bottom: 2px;
    background: none;
    height: 41px;
    width: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    cursor: pointer;
    img{
        height: 20px;
    }
    &:hover{
        background: ${theme.pale};
    }
    &:focus{
        outline: 3px solid ${theme.focus};
    }
`

const Button = styled.button`
    background: ${theme.link};
    border: none;
    text-align: center;
    width: 100%;
    padding: 10px 20px;
    cursor: pointer;
    height: 45px;
    &:hover{
        background: ${theme.linkHover};
    }
    &:focus{
        outline: 3px solid ${theme.focus};
    }
    &:active{
        background: ${theme.linkActive};
    }
    @media screen and (min-width: ${theme.breakpointM}){
        width: 100px;
    }
`

const SearchBar = ({
    type,
    setType,
    coverage,
    setCoverage,
    setLat,
    setLng,
    setPage,
    triggerAlert
}) => {

    const [finding, setFinding] = useState(false)
    
    const [localType, setLocalType] = useState(type)
    const [localCoverage, setLocalCoverage] = useState(coverage)
    const [localLat, setLocalLat] = useState("")
    const [localLng, setLocalLng] = useState("")

    const handleSubmit = e => {
        e.preventDefault()
        setType(localType)
        setCoverage(localCoverage)
        setLat(localLat)
        setLng(localLng)
        setFinding(false)
        setPage(1)
    }

    const geolocate =  () => {
        setFinding(true)
        navigator.geolocation.getCurrentPosition(async position => {
            let {latitude, longitude} = position.coords
            let res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
            let { address } = await res.json()
            setLocalCoverage(address.postcode)
            setLocalLat(latitude)
            setLocalLng(longitude)
            setFinding(false)
        }, error => {
            console.log(error)
            triggerAlert("Couldn't find your current location. Please enter it another way.")
            setFinding(false)
        })
    }
    
    return(
        <Form onSubmit={handleSubmit}>
            <Field>
                <Label htmlFor="collection">What</Label>
                <Select 
                    name="collection" 
                    id="collection"
                    value={localType}
                    onChange={e => setLocalType(e.target.value)}
                >
                    {config.collections.map(col =>
                        <option 
                            key={col.value} 
                            value={col.value}
                        >{col.label}</option>
                    )}
                </Select>
            </Field>
            <Field>
                <Label htmlFor="location">Where</Label>
                <AutocompletePlaceInput 
                    name="location" 
                    id="location"
                    placeholder="Town or postcode"
                    value={localCoverage}
                    onChange={value => setLocalCoverage(value)}
                    setLat={setLocalLat}
                    setLng={setLocalLng}
                />
                {navigator.geolocation && 
                    finding ?  
                        <Spinner/> 
                        :
                        <Tooltip label="Use current location">
                            <GeolocateButton onClick={geolocate} type="button">
                                <img src={location} alt="Use current location"/>
                            </GeolocateButton>
                        </Tooltip>
                }
            </Field>
            <Button type="submit">
                <img src={search} alt="search"/>
            </Button>
        </Form>
    )
}

const WrappedInput = props =>
    <AlertContextConsumer>
        {context =>
            <SearchBar triggerAlert={context.triggerAlert} {...props}/>
        }
    </AlertContextConsumer>

export default WrappedInput