import { SafeScreenProps } from '@/interfaces/SafeScreenProps'
import React, { FC } from 'react'
import { StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const SafeScreen:FC<SafeScreenProps> = ({ children }) => {

    const inserts = useSafeAreaInsets()

    return (
        <View style={[styles.container, { paddingTop: inserts.top }]}>
            {children}
        </View>
    )
}

export default SafeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})