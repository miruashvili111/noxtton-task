import TabBar from '@/components/TabBar'
import { Tabs } from 'expo-router'
import React from 'react'

const RootLayout = () => {

    return (
        <Tabs
            screenOptions={{ headerShown: false }}
            tabBar={props => <TabBar {...props} />}
        >
            <Tabs.Screen name='index' options={{ title: 'Home' }} />
            <Tabs.Screen name='downloadScreen' options={{ title: 'Downloads' }} />
        </Tabs>
    )
}

export default RootLayout