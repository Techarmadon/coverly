import { authClient } from '@/auth-client'
import { View } from 'react-native'
import { Button, Text } from 'react-native-paper'

function Home() {
  const handleSignout = async () => {
    await authClient.signOut()
  }

  return (
    <View>
      <Text>Home</Text>
      <Button mode='elevated' onPress={handleSignout}>
        Signout
      </Button>
    </View>
  )
}

export default Home
