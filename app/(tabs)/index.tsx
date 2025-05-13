import KeyboardAvoidingView from '@/components/KeyboardAvoidingView'
import ReposRenderItem from '@/components/ReposRenderItem'
import TextInput from '@/components/TextInput'
import { GithubSearchRepoRes } from '@/interfaces/GithubResponseProps'
import axios from '@/utils/axios'
import Ionicons from '@expo/vector-icons/Ionicons'
import React, { useEffect, useMemo, useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'

const HomeScreen = () => {

    const [search, setSearch] = useState<string>('')
    const [data, setData] = useState<GithubSearchRepoRes | undefined>(undefined)
    const [loading, setLoading] = useState<boolean>(false)
    
    const getRepos = async () => {
        try {
            setLoading(true)

            const res = await axios.get<GithubSearchRepoRes>('/search/repositories', {
                params: {
                    q: search.toLowerCase()
                }
            })

            if(res.status === 200) {
                setData(res.data)
            }
        } catch (error: any) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if(search) {
            getRepos()
        }
    }, [search])

    const memoizedData = useMemo(() => data, [data])

    return (
        <KeyboardAvoidingView>
            <View style={styles.container}>
                <View style={styles.saerchContainer}>
                    <TextInput 
                        debounceDelay={800}
                        enableDebounce
                        keyboardType='default'
                        onChangeText={setSearch}
                        value={search}
                        placeholder='Search github repo'
                        autoCapitalize='none'
                        style={styles.input}
                    />
                </View>

                {loading ? (
                    <View style={styles.indicator}>
                        <ActivityIndicator size={20} />
                    </View>
                ) 
                    : 
                (
                    <FlatList 
                        data={memoizedData?.items}
                        onEndReachedThreshold={0.1}
                        renderItem={({ item }) => <ReposRenderItem item={item} />}
                        contentContainerStyle={styles.listContainer}
                        showsVerticalScrollIndicator={false}
                        ListHeaderComponent={
                            <View style={styles.header}>
                                    <Text>Github Repositries</Text>
                                </View>
                            }
                            ListEmptyComponent={
                                <View style={styles.emptyContainer}>
                                    <Ionicons name='git-branch-outline' size={50} />
                                    <Text>Nout Found!</Text>
                                </View>
                            }
                        />
                    )
                }
            </View>
        </KeyboardAvoidingView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    saerchContainer: {
        paddingHorizontal: 16,
        paddingTop: 24,
        paddingBottom: 12,
        padding: 5,
    },
    input: {
        height: 40,
        paddingHorizontal: 10
    },
    indicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    listContainer: {
        paddingHorizontal: 16,
        paddingBottom: 60
    },
    header: {
        marginBottom: 20,
        alignItems: 'center'
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 40,
        marginTop: 40
    }
})