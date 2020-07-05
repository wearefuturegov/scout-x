import React, { useState } from "react"
import styled from "styled-components"
import theme from "../_theme"
import Map from "./Map"
import downArrow from "./down-arrow.svg"
import upArrow from "./up-arrow.svg"
import tick from "./tick.svg"

const Outer = styled.div`
    margin-top: 30px;
    @media screen and (min-width: ${theme.breakpointM}) {
        margin-top: 40px;
    }
`

const Crosshead = styled.h2`
    margin-bottom: 5px;
    color: ${theme.text};
`

export const A = styled.a`
    color: ${theme.link};
    &:hover{
        text-decoration: none;
    }
    &:focus{
        background: ${theme.focus};
        outline: 3px solid ${theme.focus};
    }
    &:active{
        color: ${theme.text};
    }
`

const Button = styled.button`
    position: relative;
    display: block;
    width: 100%;
    border: none;
    text-align: left;
    border-bottom: 1px solid ${theme.cardShadow};
    font-size: 1rem;
    background: none;
    padding: 15px 0px;
    padding-right: 30px;
    cursor: pointer;
    &:focus{
        outline: 3px solid ${theme.focus};
    }
    &:after{
        content: "";
        display: inline-block;
        width: 18px;
        height: 18px;
        background-image: url(${downArrow});
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        position: absolute;
        right: 0px;
        top: 20px;
    }
    &[aria-expanded=true]{
        &:after{
            background-image: url(${upArrow});
        }
    }
`

const Panel = styled.div`
    padding: 20px 0px;
    div:first-child{
        margin-bottom: 25px;
    }
    &[hidden]{
        display: none;
    }
    @media screen and (min-width: ${theme.breakpointM}) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 35px;
        div:first-child{
            margin-bottom: 0px;
        }
    }
`

const MapContainer = styled.section`
    height: 200px;
    width: 100%;
    background: ${theme.pale};
    .map{
        height: 100%;
    }
`

const AccessList = styled.ul`
    margin-top: 25px;
    list-style: none;
`

const AccessItem = styled.li`
    position: relative;
    line-height: 1.5;
    padding-left: 30px;
    margin-bottom: 10px;
    &:before{
        content: "";
        display: inline-block;
        width: 15px;
        height: 12px;
        background-image: url(${tick});
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        position: absolute;
        left: 0px;
        top: 5px;
    }
    &:last-of-type{
        margin-bottom: 0px;
    }
    &:last-of-type{
        margin-bottom: 0px;
    }
`

const LocationAccordion = ({
    locations
}) => {

    const [active, setActive] = useState(0)
    
    return(
        <Outer>
            <Crosshead>Locations</Crosshead>
            {locations.map((location, i) => 
                <>
                    <Button 
                        onClick={e => active === i ? setActive(false) : setActive(i)} 
                        aria-expanded={active === i}
                    >
                        <h3>{location.name}</h3>
                    </Button>
                    <Panel hidden={active !== i}>
                        <div>
                            {location.mask_exact_address ?
                                <>
                                    <p>Near {location.city}</p>
                                    <p>{location.postal_code}</p>
                                    <p><em>This location is approximate</em></p>
                                </>
                                :
                                <>
                                    <p>{location.address_1}</p>
                                    <p>{location.city}</p>
                                    <p>{location.postal_code}</p>
                                    <p><A href={`https://maps.google.com/maps/search/${location.postal_code}`}>Get directions</A></p>
                                </>
                            }
                            <AccessList>
                            {location.accessibilities.map(point =>
                                <AccessItem key={point.name}>{point.name}</AccessItem>    
                            )}
                            </AccessList>
                        </div>
                        <MapContainer>
                            <Map
                                latitude={parseFloat(location.geometry.coordinates[1])}
                                longitude={parseFloat(location.geometry.coordinates[0])}
                            />
                        </MapContainer>
                    </Panel>
                    
                </>
            )}
        </Outer>
    )
}

export default LocationAccordion