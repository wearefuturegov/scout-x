import React from "react"

import {
  Outer,
  Name,
  Description,
  Tag,
  Shimmer,
} from "./ServiceCardSkeleton.styles"

const ServiceCardSkeletonCard = ({ name, description, index }) => (
  <Outer aria-hidden="true" index={index}>
    <Name />
    <Description />
    <Description />
    <Tag />
    <Tag />
    <Shimmer />
  </Outer>
)

const ServiceCardSkeleton = () => (
  <>
    <ServiceCardSkeletonCard index={0} />
    <ServiceCardSkeletonCard index={0.5} />
    <ServiceCardSkeletonCard index={1} />
  </>
)

export default ServiceCardSkeleton
