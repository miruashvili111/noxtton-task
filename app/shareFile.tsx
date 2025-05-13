import KeyboardAvoidingView from '@/components/KeyboardAvoidingView'
import TextInput from '@/components/TextInput'
import b4a from 'b4a'
import RPC from 'bare-rpc'
import React, { useState } from 'react'
import { Alert, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Worklet } from 'react-native-bare-kit'
import bundle from './app.bundle.mjs'

const shareFile = () => {

    const [inviteKey, setInviteKey] = useState<string>('')

    const startWorklet = async () => {
        try {
            const newWorklet = new Worklet()
            newWorklet.start('/app.bundle', bundle, [Platform.OS])

            const { IPC } = newWorklet

            IPC.setEncoding('utf8')
            IPC.on('data', (data: string) => {
                const response = JSON.parse(data)
                if(response.response === 'DHT backend ready') {
                    console.log(response)
                    Alert.alert('DHT', 'DHT backend ready')
                }
            })
        } catch (error) {
            Alert.alert('Worklet Faild', 'Worklet start faild')
        }
    }

    return (
        <KeyboardAvoidingView>
            <View style={styles.container}>

                <Text>Share File</Text>
                <Text>Enter invite key</Text>
                <TextInput 
                    debounceDelay={200}
                    enableDebounce
                    keyboardType='default'
                    onChangeText={setInviteKey}
                    value={inviteKey}
                    placeholder='Insert key'
                    autoCapitalize='none'
                />

                <TouchableOpacity onPress={startWorklet}>
                    <Text>
                        Connect
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    )
}

export default shareFile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16
    }
})