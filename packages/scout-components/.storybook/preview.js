/** @type { import('@storybook/react').Preview } */

import customViewports from "../src/stories/helpers/custom-viewports"

const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
      expanded: true,
      layout: "padded",
      html: {
        root: "#story", // target id for html tab (should be direct parent of <Story /> for easy copy/paste)
      },
      viewport: { viewports: customViewports },
      options: {
        storySort: (storyA, storyB) => {
          if (storyA[1].title.includes("Examples")) {
            // if both are stories, sort alphabetically
            if (storyB[1].title.includes("Examples")) return -1
            // if only 1 is a story, push the examples story down
            else return 1
          }
          // sort as usual = alphabetical
          return -1
        },
      },
    },
  },
}

const themes = ["outpost"]

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Switch themes",
    defaultValue: "outpost",
    toolbar: {
      icon: "circlehollow",
      items: [...themes, "all"],
      title: "Theme",
    },
  },
}

export const decorators = [
  (Story, context) => {
    return (
      <div className="theme-wrap">
        {themes.map((theme, i) => {
          if (
            context.globals.theme === theme ||
            context.globals.theme === "all"
          ) {
            return (
              <div id="story" className="story-wrap">
                <Story {...context} />
              </div>
            )
          }
        })}
      </div>
    )
  },
]

export default preview
