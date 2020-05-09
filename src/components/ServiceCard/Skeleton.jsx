import React from "react"
import theme from "../_theme"
import styled from "styled-components"

const Outer = styled.li`
    display: none;
    @supports(mix-blend-mode: overlay){
        display: block;
        padding: 25px;
        background: ${theme.white};
        margin-bottom: 15px;
        position: relative;
    }
    opacity: 0;
    animation-fill-mode: forwards;
    animation: pulse 1.5s infinite;
    animation-delay: ${props => props.index}s;
    @keyframes pulse{
        0%{
            opacity: 1;
        }
        50%{
            opacity: 0.5;
        }
        100%{
            opacity: 1;
        }
    }
    @supports(mix-blend-mode: lighten){
        animation: none;
        opacity: 1;
    }
`

const Shimmer = styled.div`
    @supports(mix-blend-mode: lighten){
        position: absolute;
        left: 0px;
        top: 0px;
        height: 100%;
        width: 100%;
        background: linear-gradient(to right, ${theme.pale} 0%, ${theme.cardShadow} 20%, ${theme.pale} 40%, ${theme.pale} 100%);
        animation: shimmer 1s infinite;
        animation-fill-mode: forwards;
        animation-timing-function: linear;
        mix-blend-mode: lighten;
        @keyframes shimmer {
            from {
                background-position-x: 0px;
            }
            to {
                background-position-x: 500px;
            }
        }
    }
`

const Name = styled.div`
    height: 25px;
    width: 50%;
    background: ${theme.cardShadow}80;
    margin-bottom: 15px;
    border-radius: 10px;
`

const Description = styled.div`
    height: 10px;
    margin-bottom: 5px;
    background: ${theme.cardShadow}80;
    border-radius: 10px;
`

const Tag = styled.div`
    margin-top: 15px;
    height: 27px;
    width: 80px;
    margin-right: 10px;
    display: inline-block;
    background: ${theme.cardShadow}80;
    border-radius: 2px;
    border-radius: 10px;
`

const SkeletonCard = ({
    name,
    description,
    index
}) =>
    <Outer aria-hidden="true" index={index}>
        <Name/>
        <Description/>
        <Description/>
        <Tag/><Tag/>
        <Shimmer/>
    </Outer>

const Skeleton = () =>
    <>
        <SkeletonCard index={0}/>
        <SkeletonCard index={0.5}/>
        <SkeletonCard index={1}/>
    </>

export default Skeleton