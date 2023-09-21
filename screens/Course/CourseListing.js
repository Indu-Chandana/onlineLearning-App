import { View, Text, Image, FlatList, StyleSheet, } from 'react-native'
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

    // 'react-native-reanimated' used
    const headerSharedValue = useSharedValue(80);

    // Back Handler
    function backHandler() {
        navigation.goBack()
    }

    function renderHeader() {

        headerSharedValue.value = withDelay(500, withTiming(0, { duration: 500 }))

        // how we fade back Icon and 4nImage 
        const headerFadeAnimatedStyle = useAnimatedStyle(() => {
            return {
                opacity: interpolate(headerSharedValue.value,
                    [80, 0], [0, 1])
            }
        })

        // 4n slideIn Animation
        const headerTranslateAnimatedStyle = useAnimatedStyle(() => {
            return {
                transform: [
                    {
                        translateY: headerSharedValue.value
                    }
                ]
            }
        })

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
                {/* Background Image */}
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

                {/* Title */}
                <Animated.View
                    style={{
                        position: 'absolute',
                        bottom: 70,
                        left: 30
                    }}
                >
                    <SharedElement
                        id={`${sharedElementPrefix}-CategoryCard-Title-${category?.id}`}
                        style={[StyleSheet.absoluteFillObject]}
                    >
                        <Text
                            style={{
                                position: 'absolute',
                                ...FONTS.h1,
                                color: COLORS.white,
                            }}
                        >
                            {category?.title}
                        </Text>
                    </SharedElement>
                </Animated.View>

                {/* Back */}
                <Animated.View
                    style={headerFadeAnimatedStyle}
                >
                    <IconButton
                        icon={icons.back}
                        iconStyle={{ tintColor: COLORS.black }}
                        containerStyle={{
                            position: 'absolute',
                            top: 40,
                            left: 20,
                            width: 50,
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 25,
                            backgroundColor: COLORS.white
                        }}
                        onPress={() => {
                            backHandler()
                        }}
                    />
                </Animated.View>

                {/* Category Image */}
                <Animated.Image
                    source={images.mobile_image}
                    resizeMode="contain"
                    style={[{
                        position: 'absolute',
                        right: 40,
                        bottom: -40,
                        width: 100,
                        height: 200
                    }, headerFadeAnimatedStyle,
                        headerTranslateAnimatedStyle]}
                />
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