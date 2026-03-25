import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, SegmentedButtons, Text, TextInput } from 'react-native-paper'
import { useState } from 'react'
import { View } from 'react-native'
import useAppTheme from '@/hook/use-app-theme'
import {
  type ThemePreference,
  useThemePreference,
} from '@/context/theme-preference'
import { authClient } from '@/auth-client'

function SignIn() {
  const theme = useAppTheme()
  const { preference, setPreference, resolvedMode } = useThemePreference()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    console.log('Logging in...')
    const { error } = await authClient.signIn.email({ email, password })
    if (error) {
      console.log('Error logging in: ', error)
    }
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
      }}
    >
      <SafeAreaView style={{ flex: 1, padding: 16 }}>
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
        <View style={{ marginVertical: 16 }}>
          <Text variant='labelLarge' style={{ marginBottom: 8 }}>
            Appearance
          </Text>
          <SegmentedButtons
            value={preference}
            onValueChange={(value) =>
              setPreference(value as ThemePreference)
            }
            buttons={[
              { value: 'system', label: 'System' },
              { value: 'light', label: 'Light' },
              { value: 'dark', label: 'Dark' },
            ]}
          />
        </View>
        <View>
          <TextInput
            placeholder='Email'
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            placeholder='Password'
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <View style={{ gap: 16, flex: 1, justifyContent: 'flex-end' }}>
          <Button
            mode='contained'
            dark={resolvedMode === 'dark'}
            uppercase
            compact
            onPress={handleLogin}
          >
            Login
          </Button>
        </View>
      </SafeAreaView>
    </View>
  )
}

export default SignIn
