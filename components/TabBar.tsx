import Ionicons from '@expo/vector-icons/Ionicons'
import { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import React, { FC, JSX } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const TabBar: FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {

    const icons: { [key: string]: (props: any) => JSX.Element } = {
        index: (props: any) => <Ionicons name='home-outline' size={20} {...props} />,
        downloadScreen: (props: any) => <Ionicons name='download-outline' size={20} {...props} />
    }

    const renderIcon = (routeName: string, isFoucse: boolean) => {
        const IconComponent = icons[routeName]
        if(!IconComponent) return null

        return IconComponent({ color: isFoucse ? '#00c5ff' : '#021334' })
    }

    return (
        <View style={styles.container}>
            {state.routes.map((route, i) => {

                const { options } = descriptors[route.key]
                const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name
                const isFocus = state.index === i

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true
                    })

                    if(!isFocus && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params)
                    }
                }

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key
                    })
                }

                return (
                    <TouchableOpacity 
                        key={route.name}
                        style={styles.touchable}
                        accessibilityRole='button'
                        accessibilityState={isFocus ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        onPress={onPress}
                        onLongPress={onLongPress}
                    >
                        {renderIcon(route.name, isFocus)}
                        <Text style={{ color: isFocus ? '#00c5ff' : '#021334' }}>
                            {label as string}
                        </Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

export default TabBar

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        bottom: 50,
        marginHorizontal: 40,
        paddingVertical: 15,
        borderRadius: 20,
        backgroundColor: '#fff'
    },
    touchable: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})