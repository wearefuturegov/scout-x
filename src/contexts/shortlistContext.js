import React, { useState, useEffect } from "react"

const ShortlistContext = React.createContext()

export const ShortlistContextProvider = ({
    children
}) => {

    const [ shortlist, setShortlist ] = useState([])

    // unbake
    useEffect(()=>{
        initialiseShortlist()
        setShortlist(JSON.parse(window.localStorage.getItem("shortlist")))
    }, [])

    // bake
    useEffect(()=>{
        initialiseShortlist()
        window.localStorage.setItem("shortlist", JSON.stringify(shortlist))
    }, [shortlist])

    const initialiseShortlist = () => {
        if(!window.localStorage.getItem("shortlist")){
            window.localStorage.setItem("shortlist", JSON.stringify([]))
        }
    }

    const addToShortlist = (service) => {
        setShortlist([...shortlist, {
            ...service,
            distance: null
        }])
    }

    const removeFromShortlist = (id) => {
        setShortlist(shortlist.filter(service => service.id !== id))
    }

    const isInShortlist = (id) => {
        return shortlist.filter(item => item.id === id).length > 0
    }

    window.isInShortlist = isInShortlist

    return (
        <ShortlistContext.Provider
            value={{
                shortlist: shortlist,
                addToShortlist: addToShortlist,
                removeFromShortlist: removeFromShortlist,
                isInShortlist: isInShortlist
            }}
        >
            {children}
        </ShortlistContext.Provider>
    )
}

export const ShortlistContextConsumer = ShortlistContext.Consumer