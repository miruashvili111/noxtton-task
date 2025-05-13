import SafeScreen from '@/components/SafeScreen'
import { Stack } from "expo-router"

export default function RootLayout() {

  return (
    <SafeScreen>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name='(tabs)' />
        <Stack.Screen 
          name='shareFile'
          options={{
            presentation: 'modal',
          }}
        />
      </Stack>
    </SafeScreen>
  )
}
