import { View, Text, Image, FlatList, StyleSheet } from 'react-native'
import React from 'react'

import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
    runOnJS
} from 'react-native-reanimated'
import { SharedElement } from 'react-navigation-shared-element'

import {
    IconButton,
    HorizontalCourseCard,
    LineDivider
} from "../../components"
import {
    COLORS,
    FONTS,
    SIZES,
    images,
    icons,
    dummyData
} from "../../constants"


const CourseListing = ({ navigation, route }) => {

    const { category, sharedElementPrefix } = route.params;

    function renderHeader() {
        return (
            <Animated.View
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 250,
                    overflow: 'hidden'
                }}
            >
                <SharedElement
                    id={`${sharedElementPrefix}-CategoryCard-Bg-${category?.id}`}
                    style={[StyleSheet.absoluteFillObject]}
                >
                    <Image
                        source={category?.thumbnail}
                        resizeMode='cover'
                        style={{
                            height: '100%',
                            width: "100%",
                            borderBottomLeftRadius: 60
                        }}
                    />
                </SharedElement>

            </Animated.View>
        )
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.white
            }}>
            {/* Render Header */}
            {renderHeader()}
        </View>
    )
}



export default CourseListing