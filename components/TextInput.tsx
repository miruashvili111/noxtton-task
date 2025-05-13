import { useDebounce } from '@/hooks/useDebounce'
import { TextInputProps } from '@/interfaces/TextInputProps'
import React, { FC, useEffect, useState } from 'react'
import { TextInput as RNTextInput, StyleSheet, View } from 'react-native'

const TextInput: FC<TextInputProps> = ({
    placeholder,
    value,
    onChangeText,
    keyboardType = 'default',
    enableDebounce = false,
    debounceDelay = 100,
    autoCapitalize = 'none',
    autoCorrect = false,
    icon,
    style
}) => {

    const [innerValue, setInnerValue] = useState<string>(value || '')
    const debauncedValue = useDebounce(innerValue, debounceDelay)

    useEffect(() => {

        if(enableDebounce && debauncedValue !== value) {
            onChangeText(debauncedValue)
        }
    }, [debauncedValue])

    useEffect(() => {
        if(!enableDebounce) {
            setInnerValue(value as string)
        }
    }, [value])

    const handleChange = (text: string) => {
        if (enableDebounce) {
            setInnerValue(text)
        } else {
            onChangeText(text)
        }
    }

    return (
        <View style={[styles.container, style]}>
            {icon && <View>{icon}</View>}
            <RNTextInput 
                placeholder={placeholder}
                value={enableDebounce ? innerValue : value}
                onChangeText={handleChange}
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
                autoCorrect={autoCorrect}
                style={styles.input}
            />
        </View>
    )
}

export default TextInput

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#73aaba',
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: 5,
        backgroundColor: '#fff'
    },
    icon: {
        marginRight: 8
    },
    input: {
        flex: 1,
        fontSize: 14
    }
})