import { KeyboardAvoidingProps } from '@/interfaces/KeyboardAvoidingProps'
import React, { FC } from 'react'
import { Platform, KeyboardAvoidingView as RNKeyboardAvoidingView, StyleSheet } from 'react-native'

const KeyboardAvoidingView: FC<KeyboardAvoidingProps> = ({ children }) => {
    return (
        <RNKeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            {children}
        </RNKeyboardAvoidingView>
    )
}

export default KeyboardAvoidingView

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})