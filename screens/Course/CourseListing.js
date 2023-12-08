import { View, Text, Image, FlatList, StyleSheet, } from 'react-native'
import React, { useRef } from 'react'

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
    LineDivider,
    FilterModal
} from "../../components"
import {
    COLORS,
    FONTS,
    SIZES,
    images,
    icons,
    dummyData
} from "../../constants"

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)

const HEADER_HEIGHT = 250;

const CourseListing = ({ navigation, route }) => {

    const { category, sharedElementPrefix } = route.params;

    const flatListRef = useRef()
    const scrollY = useSharedValue(0)
    const onScroll = useAnimatedScrollHandler((event) => {
        scrollY.value = event.contentOffset.y;
    })

    // 'react-native-reanimated' used
    const headerSharedValue = useSharedValue(80);
    const filterModalSharedValue1 = useSharedValue(SIZES.height)
    const filterModalSharedValue2 = useSharedValue(SIZES.height)

    // Back Handler
    function backHandler() {
        navigation.goBack()
    }

    function renderHeader() {

        const inputRange = [0, HEADER_HEIGHT - 50] // for scroll height changes in header. 

        headerSharedValue.value = withDelay(500, withTiming(0, { duration: 500 }))

        // how we fade back Icon and 4nImage - when come to screen
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

        // header height changes
        const headerHeightAnimatedStyle = useAnimatedStyle(() => {
            return {
                height: interpolate(scrollY.value, inputRange, [HEADER_HEIGHT, 120], Extrapolate.CLAMP)
            }
        })

        // when scroll, we hide the image and back icon in the header.
        const headerHideOnScrollAnimatedStyle = useAnimatedStyle(() => {
            return {
                opacity: interpolate(scrollY.value, [80, 0], [0, 1], Extrapolate.CLAMP),
                transform: [
                    {
                        translateY: interpolate(scrollY.value, inputRange, [0, 200], Extrapolate.CLAMP)
                    }
                ]
            }
        })

        // when user scrolling in the list header title comes from the top.
        const headerShowOnScrollAnimatedStyle = useAnimatedStyle(() => {
            return {
                opacity: interpolate(scrollY.value, [80, 0], [1, 0], Extrapolate.CLAMP),
                transform: [
                    {
                        translateY: interpolate(scrollY.value, inputRange, [50, 130], Extrapolate.CLAMP)
                    }
                ]
            }
        })

        return (
            <Animated.View
                style={[{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 250,
                    overflow: 'hidden'
                }, headerHeightAnimatedStyle]}
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
                {/* DEFAULT, This Title is hidden (-80). when user scroll Title comes from the top.  */}
                <Animated.View
                    style={[{
                        position: 'absolute',
                        top: -80,
                        left: 0,
                        right: 0
                    }, headerShowOnScrollAnimatedStyle]}
                >
                    <Text
                        style={{
                            textAlign: 'center',
                            color: COLORS.white,
                            ...FONTS.h2
                        }}
                    >
                        {category?.title}
                    </Text>
                </Animated.View>
                {/* ----------------------------------------------------------------------------------- */}

                <Animated.View
                    style={[{
                        position: 'absolute',
                        bottom: 70,
                        left: 30
                    }, headerHideOnScrollAnimatedStyle]}
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

                            if (scrollY.value > 0 && scrollY.value <= 200) {// when user click on back btn and It was bit scrolled we get it to normal and back.
                                flatListRef.current?.scrollToOffset({
                                    offset: 0,
                                    animated: true
                                })

                                // When we click back btn, we need to reverce animation (phone go down and back btn fade out)
                                setTimeout(() => {
                                    headerSharedValue.value = withTiming(80, {
                                        duration: 500
                                    }, () => {
                                        runOnJS(backHandler)();
                                    })
                                }, 100)

                            } else { // when user srolled and header minimized.
                                backHandler()
                            }
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
                        headerTranslateAnimatedStyle,
                        headerHideOnScrollAnimatedStyle]}
                />
            </Animated.View>
        )
    }

    function renderResults() {
        return (
            <AnimatedFlatList
                ref={flatListRef}
                data={dummyData.courses_list_2}
                keyExtractor={item => `Results-${item.id}`}
                contentContainerStyle={{
                    paddingHorizontal: SIZES.padding
                }}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                keyboardDismissMode="on-drag"
                onScroll={onScroll}
                ListHeaderComponent={
                    <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 270,
                            marginBottom: SIZES.base
                        }}
                    >
                        {/* Results */}
                        <Text
                            style={{
                                flex: 1,
                                ...FONTS.body3
                            }}
                        >
                            5,761 Results
                        </Text>

                        {/* Filter Button */}
                        <IconButton
                            icon={icons.filter}
                            iconStyle={{
                                width: 20,
                                height: 20
                            }}
                            containerStyle={{
                                width: 40,
                                height: 40,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 10,
                                backgroundColor: COLORS.primary
                            }}
                            onPress={() => {
                                filterModalSharedValue1.value = withTiming(0, {
                                    duration: 100
                                }) // this one takes -> duration: 100 
                                filterModalSharedValue2.value = withDelay(100, // we need to wait 100, thats why we use \withDelay(100\
                                    withTiming(0, {
                                        duration: 500
                                    }))
                            }}
                        />
                    </View>
                }

                renderItem={({ item, index }) => (
                    <HorizontalCourseCard
                        course={item}
                        containerStyle={{
                            marginVertical: SIZES.padding,
                            marginTop: index == 0 ? SIZES.radius : SIZES.padding
                        }}
                        onPress={() => navigation.navigate("CourseDetails", {
                            selectedCourse: item
                        })}
                    />
                )}
                ItemSeparatorComponent={() => (
                    <LineDivider
                        lineStyle={{
                            backgroundColor: COLORS.gray20
                        }}
                    />
                )}
            />
        )
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.white
            }}>
            {/* Results */}
            {renderResults()}

            {/* Render Header */}
            {renderHeader()}

            {/* Filter Modal */}
            <FilterModal
                filterModalSharedValue1={filterModalSharedValue1}
                filterModalSharedValue2={filterModalSharedValue2}
            />
        </View>
    )
}



export default CourseListing