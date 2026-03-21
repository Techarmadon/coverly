import { ExpoConfig, ConfigContext } from 'expo/config'

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  slug: 'coverly',
  name: ' Coverly',
  version: '0.0.1',
  scheme: 'coverly',
  newArchEnabled: true,
  orientation: 'portrait',
  userInterfaceStyle: 'automatic',
  experiments: { typedRoutes: true },
  ios: {
    bundleIdentifier: 'techarmadon.coverly.app',
  },
  android: {
    package: 'techarmadon.coverly.app',
  },
  plugins: ['expo-secure-store', 'expo-web-browser', 'expo-router'],
})
