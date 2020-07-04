import React, { useState } from "react"
import styled from "styled-components"
import { Outer, Legend, Label, Header, UnfoldButton, Content } from "./layout"
import theme from "../_theme"

const ColumnContent = styled(Content)`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 25px;
`

const Field = styled.div`
    margin-bottom: 25px;
    @supports (display: grid){
        margin-bottom: 0px;
    }
`

const LabelWithMargin = styled(Label)`
    display: block;
    margin-bottom: 7px;
`

const Input = styled.input`
    font-size: 0.9rem;
    padding: 7px;
    border: 2px solid ${theme.text};
    display: block;
    width: 100%;
    &:focus{
        outline: 3px solid ${theme.focus};
    }
    &::placeholder{
        opacity: 0.3;
    }
`

const AgeFilter = ({
    legend,
    minAge,
    setMinAge,
    maxAge,
    setMaxAge,
    setPage,
    foldable
}) => {

    const [unfolded, setUnfolded] = useState(maxAge || minAge)

    return(
        <Outer>
            <Header>
                {foldable ?
                    <UnfoldButton 
                        type="button"
                        aria-expanded={unfolded ? "true" : "false"} 
                        onClick={() => setUnfolded(!unfolded)}
                    >
                        <Legend>{legend}</Legend>
                    </UnfoldButton>
                    :
                    <Legend>{legend}</Legend>
                }
            </Header>
            {(!foldable || unfolded) && 
                <ColumnContent>
                    <Field>
                        <LabelWithMargin htmlFor="min_age">Minimum</LabelWithMargin>
                        <Input 
                            id="min_age" 
                            value={minAge} 
                            onChange={e => setMinAge(e.target.value)} 
                            type="number" 
                            min="0" 
                            max="120"
                        />
                    </Field>
                    <Field>
                        <LabelWithMargin htmlFor="max_age">Maximum</LabelWithMargin>
                        <Input 
                            id="max_age" 
                            value={maxAge} 
                            onChange={e => setMaxAge(e.target.value)} 
                            type="number" 
                            min="0" 
                            max="120"
                        />
                    </Field>
                </ColumnContent>
            }
        </Outer>
    )
}

export default AgeFilter