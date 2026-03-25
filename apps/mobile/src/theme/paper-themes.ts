import { MD3LightTheme, MD3DarkTheme, type MD3Theme } from 'react-native-paper'

export const paperThemes = {
  light: { ...MD3LightTheme },
  dark: { ...MD3DarkTheme },
} as const satisfies Record<'light' | 'dark', MD3Theme>

export type AppPaperTheme = (typeof paperThemes)['light']
