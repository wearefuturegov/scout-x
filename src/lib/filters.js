import onlyOptionsDefaultData from "./../data/_only.json"
import { theme } from "./../themes/theme_generator"

export const onlyOptionsData = [
  ...onlyOptionsDefaultData,
  ...theme.filterOnlyOptions,
]
