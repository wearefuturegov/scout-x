import { theme } from "~/src/themes"
import { useQuery } from "react-query"
import queryString from "query-string"
const useSendNeeds = () => {
  return useQuery({
    queryKey: ["sendNeeds"],
    queryFn: async () => {
      const directory = [theme.slug]
      try {
        // console.log(process.env.REACT_APP_FILTERS_DATASOURCE)
        const res = await fetch(
          `http://localhost:3000/api/v1/send_needs?${queryString.stringify({
            directory,
          })}`
        )
        return await res.json()
      } catch (err) {
        console.log(err)
        return []
      }
    },
  })
}

export default useSendNeeds
