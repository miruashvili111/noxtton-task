import { ScrollViewProps } from '@/interfaces/ScrollViewProps'
import React, { FC } from 'react'
import { ScrollView as RNScrollView, StyleSheet } from 'react-native'

const ScrollView: FC<ScrollViewProps> = ({ children, style }) => {
    return (
        <RNScrollView
            contentContainerStyle={styles.container}
            style={[styles.scrollViewStyle, style]}
        >
            {children}
        </RNScrollView>
    )
}

export default ScrollView

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16
    },
    scrollViewStyle: {
        flex: 1
    }
})