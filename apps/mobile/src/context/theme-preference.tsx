import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { useColorScheme } from 'react-native'

export type ThemePreference = 'system' | 'light' | 'dark'

type ThemePreferenceContextValue = {
  /** User choice: follow OS, or fixed light/dark */
  preference: ThemePreference
  /** Effective Paper mode after applying preference + system */
  resolvedMode: 'light' | 'dark'
  setPreference: (next: ThemePreference) => void
}

const ThemePreferenceContext = createContext<
  ThemePreferenceContextValue | undefined
>(undefined)

function resolveMode(
  preference: ThemePreference,
  system: 'light' | 'dark' | null | undefined
): 'light' | 'dark' {
  if (preference === 'light' || preference === 'dark') {
    return preference
  }
  return system === 'dark' ? 'dark' : 'light'
}

export function ThemePreferenceProvider({ children }: { children: ReactNode }) {
  const systemScheme = useColorScheme()
  const [preference, setPreferenceState] = useState<ThemePreference>('system')

  const setPreference = useCallback((next: ThemePreference) => {
    setPreferenceState(next)
  }, [])

  const resolvedMode = useMemo(
    () => resolveMode(preference, systemScheme),
    [preference, systemScheme]
  )

  const value = useMemo(
    () => ({
      preference,
      resolvedMode,
      setPreference,
    }),
    [preference, resolvedMode, setPreference]
  )

  return (
    <ThemePreferenceContext.Provider value={value}>
      {children}
    </ThemePreferenceContext.Provider>
  )
}

export function useThemePreference(): ThemePreferenceContextValue {
  const ctx = useContext(ThemePreferenceContext)
  if (ctx == null) {
    throw new Error(
      'useThemePreference must be used within ThemePreferenceProvider'
    )
  }
  return ctx
}
