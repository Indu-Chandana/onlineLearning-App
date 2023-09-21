import { View, Text, TouchableOpacity, ImageBackground, Image, StyleSheet } from 'react-native'
import React from 'react'
import { SharedElement } from "react-navigation-shared-element"

import { COLORS, FONTS, SIZES } from "../constants"

const CategoryCard = ({
    sharedElementPrefix, //hard Coded, we can differentiate where are the categoryCard is being rendered in the home screen or search screen.
    category, containerStyle, onPress }) => {

    return (
        <TouchableOpacity
            style={{
                height: 150,
                width: 200,
                ...containerStyle
            }}
            onPress={onPress}
        >

            {/* -- Image Background -- */}
            {/* we will be able to create a smooth animation over to the course listing screen over header */}
            <SharedElement
                id={`${sharedElementPrefix}-CategoryCard-Bg-${category?.id}`}
                style={[StyleSheet.absoluteFillObject]}
            >
                <Image
                    source={category?.thumbnail}
                    resizeMode='cover'
                    style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: SIZES.radius
                    }}
                />
            </SharedElement>

            {/* -- Title -- */}
            <View
                style={{
                    position: 'absolute',
                    bottom: 50,
                    left: 5
                }}
            >
                {/* We included in the course listing component as w ell, theirfore we wrap this element. */}
                <SharedElement
                    id={`${sharedElementPrefix}-CategoryCard-Title-${category?.id}`}
                    style={[StyleSheet.absoluteFillObject]}
                >
                    <Text style={{
                        position: 'absolute',
                        color: COLORS.white,
                        ...FONTS.h2
                    }}>
                        {category?.title}
                    </Text>
                </SharedElement>

            </View>


            {/* In this way we can not use react-navigation-shared-element */}
            {/* <ImageBackground
                source={category?.thumbnail}
                resizeMode='cover'
                style={{
                    height: 150,
                    width: 200,
                    paddingVertical: SIZES.padding,
                    paddingHorizontal: SIZES.radius,
                    justifyContent: 'flex-end', // text goes to all the way to down.
                    ...containerStyle
                }}
                imageStyle={{
                    borderRadius: SIZES.radius
                }}
            >
                <Text
                    style={{
                        color: COLORS.white,
                        ...FONTS.h2
                    }}
                >
                    {category?.title}
                </Text>
            </ImageBackground> */}
        </TouchableOpacity>
    )
}

export default CategoryCard