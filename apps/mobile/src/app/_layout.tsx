// import 'dotenv/config'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider as PaperProvider } from 'react-native-paper'
import { StatusBar } from 'expo-status-bar'
import { Stack } from 'expo-router'
import { authClient } from '@/auth-client'
import * as SystemUI from 'expo-system-ui'
import { useEffect } from 'react'
import { View } from 'react-native'
import {
  ThemePreferenceProvider,
  useThemePreference,
} from '@/context/theme-preference'
import { paperThemes } from '@/theme/paper-themes'

function RootLayoutInner() {
  const { resolvedMode } = useThemePreference()
  const paperTheme = paperThemes[resolvedMode]
  const { colors } = paperTheme
  const { data } = authClient.useSession()

  const statusBarStyle = resolvedMode === 'dark' ? 'light' : 'dark'

  useEffect(() => {
    void SystemUI.setBackgroundColorAsync(colors.background)
  }, [colors.background])

  return (
    <PaperProvider theme={paperTheme}>
      <StatusBar style={statusBarStyle} />
      <Stack
        screenOptions={{
          headerTitleStyle: { color: colors.onBackground },
          headerBackground: () => (
            <View style={{ backgroundColor: colors.background }} />
          ),
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Protected guard={!!data}>
          <Stack.Screen name='index' />
        </Stack.Protected>

        <Stack.Protected guard={!data}>
          <Stack.Screen name='(auth)/sign-in' options={{ title: '' }} />
        </Stack.Protected>
      </Stack>
    </PaperProvider>
  )
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemePreferenceProvider>
        <RootLayoutInner />
      </ThemePreferenceProvider>
    </SafeAreaProvider>
  )
}
