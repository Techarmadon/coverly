// import 'dotenv/config'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider as PaperProvider } from 'react-native-paper'
import { StatusBar } from 'expo-status-bar'
import { Stack } from 'expo-router'
import { authClient } from '@/auth-client'
import * as SystemUI from 'expo-system-ui'
import { useColorScheme, View } from 'react-native'
import useAppTheme from '@/hook/use-app-theme'

export default function RootLayout() {
  const systemScheme = useColorScheme()
  const theme = useAppTheme()
  const { data } = authClient.useSession()
  const { colors } = theme

  SystemUI.setBackgroundColorAsync(colors.background)

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <StatusBar
          style={systemScheme ?? 'dark'}
          backgroundColor={colors.background}
        />
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
    </SafeAreaProvider>
  )
}
