import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'

import Animated, {
    interpolate,
    useAnimatedStyle,
    withDelay,
    withTiming
} from 'react-native-reanimated'

import { TextButton, LineDivider } from "../components"
import { COLORS, FONTS, SIZES, icons, constants } from "../constants"

const ClassTypeOption = ({
    containerStyle, classType, isSelected, onPress
}) => {
    return (
        <TouchableOpacity
            style={{
                flex: 1,
                height: 100,
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: SIZES.radius,
                borderRadius: SIZES.radius,
                backgroundColor: isSelected ? COLORS.primary3 : COLORS.additionalColor9,
                ...containerStyle
            }}

            onPress={onPress}
        >
            <Image
                source={classType.icon}
                resizeMode='contain'
                style={{
                    width: 40,
                    height: 40,
                    tintColor: isSelected ? COLORS.white : COLORS.gray80
                }}
            />

            <Text
                style={{
                    marginTop: SIZES.base,
                    color: isSelected ? COLORS.white : COLORS.gray80,
                    ...FONTS.h3
                }}
            >
                {classType.label}
            </Text>
        </TouchableOpacity>
    )
}

const FilterModal = ({
    filterModalSharedValue1,
    filterModalSharedValue2
}) => {

    // 1. Main container slides in from bottom 
    // 2. after that background container fadeIn
    // 3. content container slide up from the bottom

    const [selectedClassType, setSelectedClassType] = useState("");
    const [selectedClassLevel, setSelectedClassLevel] = useState("");
    const [selectedCreatedWithin, setSelectedCreatedWithin] = useState("");

    const filterModalContainerAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(filterModalSharedValue1.value, [SIZES.height, 0], [0, 1]),
            transform: [
                {
                    translateY: filterModalSharedValue1.value
                }
            ]
        }
    })

    const filterModalBgAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(filterModalSharedValue2.value, [SIZES.height, 0], [0, 1])
        }
    })

    const filterModalContentAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(filterModalSharedValue2.value, [SIZES.height, 0], [0, 1]),
            transform: [
                {
                    translateY: filterModalSharedValue2.value
                }
            ]

        }
    })

    return (
        // Main Container
        <Animated.View
            style={[{
                position: 'absolute',
                bottom: 0,
                height: SIZES.height,
                width: SIZES.width
            }, filterModalContainerAnimatedStyle]}
        >
            {/* Background Container */}
            <Animated.View
                style={[{
                    flex: 1,
                    height: SIZES.height,
                    width: SIZES.width,
                    backgroundColor: COLORS.transparentBlack7
                }, filterModalBgAnimatedStyle]}
            >

                {/* Content Container */}
                <Animated.View
                    style={[{
                        position: 'absolute',
                        bottom: 0,
                        height: SIZES.height * 0.9,
                        width: SIZES.width,
                        borderTopLeftRadius: 30,
                        borderTopRightRadius: 30,
                        backgroundColor: COLORS.white
                    }, filterModalContentAnimatedStyle]}
                >
                    {/* Header */}
                    <View
                        style={{
                            marginTop: SIZES.padding,
                            flexDirection: 'row',
                            paddingHorizontal: SIZES.padding
                        }}
                    >
                        <View style={{ width: 60 }} />

                        <Text style={{ flex: 1, textAlign: 'center', ...FONTS.h1 }}>Filter</Text>
                        <TextButton
                            label="Cancel"
                            contentContainerStyle={{
                                width: 60,
                                backgroundColor: null
                            }}
                            labelStyle={{
                                color: COLORS.black,
                                ...FONTS.body3
                            }}
                            onPress={() => {
                                // 1. we modal slide down.
                                // 2. we background back to normal

                                filterModalSharedValue2.value = withTiming(SIZES.height, {
                                    duration: 500
                                }) // It takes 500
                                // we have to wait 500 in below.
                                filterModalSharedValue1.value = withDelay(500, withTiming(SIZES.height, {
                                    duration: 100
                                }))
                            }}
                        />
                    </View>

                    {/* Content */}
                    <ScrollView
                        contentContainerStyle={{
                            paddingHorizontal: SIZES.padding,
                            paddingBottom: 50
                        }}
                    >
                        {/* Class Type */}
                        <View
                            style={{
                                marginTop: SIZES.radius
                            }}
                        >
                            <Text style={{
                                ...FONTS.h3
                            }}>Class Type</Text>

                            <View
                                style={{
                                    flexDirection: 'row',
                                    marginTop: SIZES.radius
                                }}
                            >
                                {constants.class_types.map((item, index) => {
                                    return (
                                        <ClassTypeOption
                                            key={`ClassType-${index}`}
                                            classType={item}
                                            isSelected={selectedClassType == item?.id}
                                            containerStyle={{
                                                marginLeft: index == 0 ? 0 : SIZES.base
                                            }}
                                            onPress={() => {
                                                setSelectedClassType(item?.id)
                                            }}
                                        />
                                    )
                                })}
                            </View>
                        </View>
                    </ScrollView>
                </Animated.View>
            </Animated.View>


        </Animated.View>
    )
}

export default FilterModal