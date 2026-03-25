import { useTheme } from 'react-native-paper'
import type { AppPaperTheme } from '@/theme/paper-themes'

/** Paper theme from the nearest `PaperProvider` (use inside screens/layout under provider). */
export function useAppTheme() {
  return useTheme<AppPaperTheme>()
}

export default useAppTheme
