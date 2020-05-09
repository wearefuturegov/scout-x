import React, { useState } from "react"
import styled from "styled-components"
import theme from "../_theme"
import downArrow from "./down-arrow.svg"
import upArrow from "./up-arrow.svg"

const Outer = styled.form`
    border: none;
    margin-bottom: 20px;
`

const Header = styled.header`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
`

const UnfoldButton = styled.button`
    display: flex;
    align-items: center;
    border: none;
    font-size: 1rem;
    background: none;
    cursor: pointer;
    &:after{
        content: "";
        display: inline-block;
        height: 10px;
        width: 15px;
        margin-left: 10px;
        background-image: url(${upArrow});
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
    }
    &[aria-expanded=true]:after{
        background-image: url(${downArrow});
    }
    &:focus{
        outline: 3px solid ${theme.focus};
    }
`

const Label = styled.label`
    font-weight: bold;
    color: ${theme.text};
    cursor: pointer;
`

const Field = styled.div`
    position: relative;
    margin-bottom: 7px;
`

const Input = styled.input`
    font-size: 0.9rem;
    padding: 7px;
    border: 2px solid ${theme.text};
    display: block;
    width: 100%;
    padding-right: 65px;
    &:focus{
        outline: 3px solid ${theme.focus};
    }
    &::placeholder{
        opacity: 0.3;
    }
`

const ApplyButton = styled.button`
    font-size: 0.8rem;
    background: ${theme.text};
    color: ${theme.white};
    border: none;
    padding: 8px 12px;
    position: absolute;
    right: 0px;
    top: 0px;
    cursor: pointer;
    font-weight: bold;
    bottom: 0px;
    &:focus{
        outline: 3px solid ${theme.focus};
    }
`

const ClearButton = styled.button`
    color: ${theme.link};
    font-size: 0.9rem;
    background: none;
    border: none;
    cursor: pointer;
    &:hover{
        text-decoration: underline;
    }
    &:focus{
        background: ${theme.focus};
        outline: 3px solid ${theme.focus};
    }
    &:active{
        color: ${theme.text};
    }
`

const Filter = ({
    value,
    setValue,
    setPage
}) => {

    const [unfolded, setUnfolded] = useState(value ? true : false)

    const [localKeywords, setLocalKeywords] = useState(value)

    const handleSubmit = e => {
        e.preventDefault()
        setValue(localKeywords)
        setPage(1)
    }

    const clear = () => {
        setLocalKeywords("")
        setValue("")
        setPage(1)
    }

    return(
        <Outer onSubmit={handleSubmit}>
            <Header>
                <UnfoldButton 
                    type="button"
                    aria-expanded={unfolded ? "true" : "false"} 
                    onClick={() => setUnfolded(!unfolded)}
                >
                    <Label>Keywords</Label>
                </UnfoldButton>
                {localKeywords.length > 0 && 
                    <ClearButton type="button" onClick={clear}>Clear</ClearButton>
                }
            </Header>
            {unfolded &&
                <Field>
                    <Input 
                        id="keywords"
                        type="search"
                        placeholder="Search..."
                        value={localKeywords}
                        onChange={e => setLocalKeywords(e.target.value)} 
                    />
                    <ApplyButton type="submit">Apply</ApplyButton>
                </Field>
            }
        </Outer>
    )
}

export default Filter