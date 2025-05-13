import { ReactNode } from 'react'
import { StyleProp, TextInputProps as TextInputProp, ViewStyle } from 'react-native'

export interface TextInputProps {
    placeholder?: string
    value?: string
    onChangeText: (value: string) => void
    keyboardType: TextInputProp['keyboardType']
    enableDebounce: boolean
    debounceDelay: number
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'
    autoCorrect?: boolean
    icon?: ReactNode
    style?: StyleProp<ViewStyle>
}