import { defaultDarkTheme, defaultLightTheme } from "@ocean-ui/ocean";

// export const primary = "#df2a78";
export const primary = "#1900ff";

export const getTheme = (theme) => ({
  ...(theme
    ? theme === "dark"
      ? defaultDarkTheme
      : defaultLightTheme
    : window.matchMedia("(prefers-color-scheme: dark)")
    ? defaultDarkTheme
    : defaultLightTheme),
  primary: primary,
});
