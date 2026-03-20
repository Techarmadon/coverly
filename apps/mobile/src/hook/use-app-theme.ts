import { MD3LightTheme, MD3DarkTheme, useTheme } from "react-native-paper";

/** Theme variants to pass to PaperProvider based on mode */
export const theme = {
  light: { ...MD3LightTheme },
  dark: { ...MD3DarkTheme },
};

export type AppTheme = (typeof theme)["light"];

export function useAppTheme() {
  return useTheme<AppTheme>();
}

export default useAppTheme;
