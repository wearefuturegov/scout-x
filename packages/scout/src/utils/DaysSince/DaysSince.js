const daysSince = date => {
  return (
    (new Date().getTime() - new Date(date).getTime()) / (1000 * 60 * 60 * 24.0)
  )
}

export default daysSince
