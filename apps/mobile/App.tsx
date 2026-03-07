import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'
import { Button, Provider as PaperProvider, Text } from 'react-native-paper'
import { useCallback, useState } from 'react'
import { useColorScheme, View } from 'react-native'
import { MaterialDesignIconsIconName } from '@react-native-vector-icons/material-design-icons'
import useAppTheme, { theme } from '@/hook/use-app-theme'

const sunIcon: MaterialDesignIconsIconName = 'white-balance-sunny'
const moonIcon: MaterialDesignIconsIconName = 'moon-waning-crescent'

function Root({
  mode,
  setMode,
}: {
  mode: 'light' | 'dark'
  setMode: (mode: 'light' | 'dark') => void
}) {
  const theme = useAppTheme()

  const toggleMode = useCallback(() => {
    const next = mode === 'dark' ? 'light' : 'dark'
    setMode(next)
  }, [mode, setMode])

  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 16,
        backgroundColor: theme.colors.background,
      }}
    >
      <Text
        variant='headlineMedium'
        style={{
          textAlign: 'center',
        }}
      >
        Hello From{' '}
        <Text style={{ fontWeight: 'bold', color: theme.colors.primary }}>
          Coverly
        </Text>{' '}
        Mobile
      </Text>
      <View style={{ gap: 16, flex: 1, justifyContent: 'flex-end' }}>
        <Button mode='contained' dark={mode === 'dark'} uppercase compact>
          Login
        </Button>
        <Button
          mode='outlined'
          uppercase
          onPress={toggleMode}
          icon={mode === 'dark' ? sunIcon : moonIcon}
        >
          <Text>{mode === 'dark' ? 'Light Mode' : 'Dark Mode'}</Text>
        </Button>
      </View>
    </SafeAreaView>
  )
}

export default function App() {
  const systemScheme = useColorScheme()
  const [override, setOverride] = useState<'light' | 'dark' | null>(null)
  const mode = override ?? systemScheme ?? 'light'
  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme[mode]}>
        <Root mode={mode} setMode={setOverride} />
      </PaperProvider>
    </SafeAreaProvider>
  )
}
