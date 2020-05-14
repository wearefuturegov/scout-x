import React, { useState } from "react"
import styled from "styled-components"
import theme from "../_theme"
import { truncate } from "../../lib/utils"
import upArrow from "./up-arrow.svg"
import downArrow from "./down-arrow.svg"

const Outer = styled.article`
    margin-bottom: 30px;
    color: ${theme.text};
    p{
        line-height: 1.4;
        margin-bottom: 10px;
        &:last-child{
            margin-bottom: 0px;
        }
    }
`

const Button = styled.button`
    color: ${theme.link};
    font-size: 1rem;
    font-weight: bold;
    border: none;
    background: none;
    cursor: pointer;
    &:hover{
        text-decoration: underline;
    }
    &:active{
        color: ${theme.text};
    }
    &:focus{
        background: ${theme.focus};
        outline: 3px solid ${theme.focus};
    }
    &:after{
        content: "";
        margin-left: 5px;
        display: inline-block;
        width: 12px;
        height: 9px;
        background-image: url(${downArrow});
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
    }
    &[aria-expanded=true]:after{
        background-image: url(${upArrow});
    }
`

const Description = ({
    description
}) => {

    const wordLimit = 30

    const [expanded, setExpanded] = useState(false)

    let paragraphs = description.split("\n").filter(paragraph => paragraph )

    return(
        <Outer>
            {description.split(" ").length > wordLimit ?
                <>
                    {expanded ? 
                        paragraphs.map((paragraph, i) =>
                            <p key={i}>{paragraph}</p>
                        )
                        :
                        <p>{truncate(description, wordLimit)}</p>
                    }
                    <Button aria-expanded={expanded ? "true" : "false"}onClick={() => setExpanded(!expanded)}>
                        {expanded ? "Less" : "More" }
                    </Button>
                </>
                :
                paragraphs.map((paragraph, i) =>
                    <p key={i}>{paragraph}</p>
                )
            }
        </Outer>
    )
}

export default Description