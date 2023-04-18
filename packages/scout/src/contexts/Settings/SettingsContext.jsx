import React, { useState, useContext } from "react"

const SettingsStateContext = React.createContext({})

// Export the provider, one for the state and another for the API to save on re-renders
const SettingsProvider = ({ value, children }) => {
  const defaultSettings = {
    targetElement: "#root",
    basePath: "",
    embedded: false,
    sidebar: true,
  }
  const initSettings = { ...defaultSettings, ...value }

  const [settings, setSettings] = useState(initSettings)

  const settingsState = React.useMemo(
    () => ({
      settings,
    }),
    [settings]
  )

  // console.log("Current settings: ", settings)

  return (
    <SettingsStateContext.Provider value={settingsState}>
      {children}
    </SettingsStateContext.Provider>
  )
}

const useSettingsState = () => {
  const context = useContext(SettingsStateContext)

  if (!context) {
    throw new Error("useSettingsState must be used within the SettingsProvider")
  }

  return context
}

export { SettingsProvider, useSettingsState }
