import { flag } from "flags/next"

// This flag controls the visibility of a promotional banner.
// It's a boolean flag, so it can be either on (true) or off (false).
export const showBanner = flag<boolean>({
  key: "show-banner",
  description: "Controls the visibility of the promotional banner at the top of the page.",
  defaultValue: false,
  options: [
    { value: true, label: "Show Banner" },
    { value: false, label: "Hide Banner" },
  ],
})

// This flag determines the appearance of the primary action button.
// It uses string values to map to different button styles.
export const buttonColor = flag<"default" | "destructive" | "outline">({
  key: "button-color",
  description: "Changes the color of the main call-to-action button.",
  defaultValue: "default",
  options: [
    { value: "default", label: "Default" },
    { value: "destructive", label: "Destructive" },
    { value: "outline", label: "Outline" },
  ],
})

// This flag enables or disables a new, experimental feature section.
// It's a simple boolean toggle for a larger piece of UI.
export const enableNewFeature = flag<boolean>({
  key: "enable-new-feature",
  description: 'Toggles the new "Super-Secret Feature" section.',
  defaultValue: false,
  options: [
    { value: true, label: "Enable" },
    { value: false, label: "Disable" },
  ],
})
