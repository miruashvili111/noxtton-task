import Ionicons from '@expo/vector-icons/Ionicons'
import * as FileSystem from 'expo-file-system'
import { Link } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Alert, FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

interface FileItem {
    name: string
    uri: string
}

const DownloadScreen = () => {
    
    const [files, setFiles] = useState<FileItem[]>([])
    const [refreshing, setRefreshing] = useState<boolean>(false)

    const handleReadFiles = async () => {
        try {
            const dir = FileSystem.documentDirectory
            const fileNames = await FileSystem.readDirectoryAsync(dir!)
            const zipFIles = fileNames.filter((file) => file.toLowerCase().endsWith('.zip'))
            const fileItems = zipFIles.map((file) => ({
                name: file,
                uri: `${dir}${file}`
            }))
            setFiles(fileItems)
        } catch (error) {
            Alert.alert('File Save', 'Faild file save!')
        }
    }

    const handleDeleteFile = async (fileUri: string, fileName: string) => {
        try {  
            await FileSystem.deleteAsync(fileUri, { idempotent: true })
            setFiles((prevFiles) => prevFiles.filter((el) => el.uri !== fileUri))
            Alert.alert('File Deleted', `${fileName} success deleted`)
        } catch (error) {
            Alert.alert('File Deleted', 'Faild file deleted!')
        }
    }

    useEffect(() => {
        handleReadFiles()
    }, [files])  

    const handleRefresh = async () => {
        setRefreshing(true)
        await handleReadFiles()
        setRefreshing(false)
    }

    return (
        <View style={styles.container}>
            <FlatList 
                data={files}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                    <View style={styles.fileItem}>
                        <Text style={styles.fileName}>{item.name}</Text>
                        <View style={styles.touchabeContainer}>
                            <Link href='/shareFile'>
                                <Ionicons name='share-outline' size={20} />
                            </Link>
                            <TouchableOpacity onPress={() => handleDeleteFile(item.uri, item.name)}>
                                <Ionicons name='trash-outline' size={20} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Ionicons name='folder-outline' size={20} />
                        <Text>Files not found!</Text>
                    </View>
                }
            />
        </View>
    )
}

export default DownloadScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    },
    fileItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        backgroundColor: '#fff',
    },
    fileName: {
        fontSize: 16,
        fontWeight: '500'
    },
    touchabeContainer: {
        flexDirection: 'row',
        gap: 5
    }
})