import useSizes from '@/hooks/useSizes'
import { GithubRepository } from '@/interfaces/GithubResponseProps'
import Ionicons from '@expo/vector-icons/Ionicons'
import * as FileSystem from 'expo-file-system'
import { Image } from 'expo-image'
import React, { useState } from 'react'
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const ReposRenderItem = ({ item } : { item: GithubRepository }) => {
    
    const size = useSizes(item.size)
    const [downloadLoading, setDownloadLoading] = useState<boolean>(false)

    const handleDownload = async () => {
        setDownloadLoading(true)
        const url = `${process.env.EXPO_PUBLIC_GITHUB_API_URL}/repos/${item.owner.login}/${item.name}/zipball/${item.default_branch}`
        const localFileUri = `${FileSystem.documentDirectory}${item.name}.zip`

        try {
            const result = await FileSystem.downloadAsync(url, localFileUri, {
                headers: {
                    Authorization: `Bearer ${process.env.EXPO_PUBLIC_GITHUB_TOKEN}`,
                    Accept: 'application/vnd.github+json'
                },
            })

            if (result.status === 200) {
                Alert.alert('Repo Downloaded', `Saved to: ${result.uri}`)
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to download repository')
        } finally {
            setDownloadLoading(false)
        }
    }
    
    return (
        <View key={item.id} style={styles.container}>
            <Text style={styles.title}>{item.name}</Text>

            <View style={styles.onwer}>
                <Image style={styles.avatar} contentFit='cover' source={{ uri: item.owner.avatar_url }} />
                <Text style={styles.onwerTitle}>{item.owner.login}</Text>
            </View>

            <Text style={styles.meta}>Visibility: {item.visibility}</Text>
            <Text style={styles.meta}>Main Branch: {item.default_branch}</Text>
            <Text style={styles.meta}>Language: {item?.language}</Text>
            <Text style={styles.meta}>Size: {size}</Text>

            <Text style={styles.description}>{item.description}</Text>

            {downloadLoading ? 
                <ActivityIndicator size={15} />
            :
                <TouchableOpacity style={styles.touchable} onPress={handleDownload}>
                    <Ionicons name='download-outline' size={20} color='#0577c2' />
                    <Text style={styles.downloadText}>Download</Text>
                </TouchableOpacity>
            }
        </View>
    )
}

export default ReposRenderItem

const styles = StyleSheet.create({
    container: {
        borderRadius: 16,
        marginBottom: 20,
        padding: 16,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#cbcfcc',
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 2
    },
    title: {
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 6
    },
    onwer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6
    },
    onwerTitle: {
        fontSize: 15,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 30
    },
    meta: {
        fontSize: 14,
        marginBottom: 5
    },
    description: {
        fontSize: 14,
        fontStyle: 'italic',
        marginTop: 6,
        marginBottom: 6
    },
    touchable: {
        marginTop: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6
    },
    downloadText: {
        fontSize: 14
    }
})