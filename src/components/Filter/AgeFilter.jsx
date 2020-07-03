import React, { useState } from "react"
import styled from "styled-components"
import { Outer, Legend, Label, Field, Header, UnfoldButton, Content } from "./layout"

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
                <Content>
                    Age options
                </Content>
            }
        </Outer>
    )
}

export default AgeFilter