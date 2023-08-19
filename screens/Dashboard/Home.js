import React from 'react';
import {
    View,
    Text,
    ImageBackground, // using this we can eble to work on the top of image. 
    Image,
    ScrollView
} from 'react-native';

// we need to create horizontal scrolling feature with that
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler"

import {
    COLORS,
    FONTS,
    SIZES,
    icons,
    images,
    dummyData
} from "../../constants"
import { IconButton, TextButton } from "../../components"

const Home = () => {

    function renderHeader() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    marginBottom: 10,
                    paddingHorizontal: SIZES.padding,
                    alignItems: 'center'
                }}>
                {/* Greetion */}
                <View style={{ flex: 1 }}>
                    <Text style={{ ...FONTS.h2 }}>Hello, Programmers!</Text>
                    <Text style={{ color: COLORS.gray50, ...FONTS.body3 }}>Satuday, 19th Aug 2023</Text>
                </View>

                {/* Notification */}
                <IconButton
                    icon={icons.notification}
                    iconStyle={{ tintColor: COLORS.black }}
                />
            </View>
        )
    }

    function renderStartLearding() {
        return (
            <ImageBackground
                source={images.featured_bg_image}
                style={{
                    alignItems: 'flex-start',
                    marginTop: SIZES.padding,
                    marginHorizontal: SIZES.padding,
                    padding: 15
                }}
                imageStyle={{
                    borderRadius: SIZES.radius
                }}
            >
                {/* Info */}
                <View>
                    <Text style={{
                        color: COLORS.white,
                        ...FONTS.body2
                    }}>HOW TO</Text>
                    <Text
                        style={{
                            color: COLORS.white,
                            ...FONTS.h2
                        }}
                    >
                        Make your brand more visible with our checklist
                    </Text>
                    <Text style={{
                        marginTop: SIZES.radius,
                        color: COLORS.white,
                        ...FONTS.body4
                    }}>By Scott Harris</Text>
                </View>

                {/* Image */}
                <Image
                    source={images.start_learning}
                    style={{
                        width: '100%',
                        height: 110,
                        marginTop: SIZES.padding
                    }}
                />

                {/* Button */}
                <TextButton
                    label="Start Learning"
                    contentContainerStyle={{
                        height: 40,
                        paddingHorizontal: SIZES.padding,
                        borderRadius: 20,
                        backgroundColor: COLORS.white
                    }}
                    labelStyle={{
                        color: COLORS.black
                    }}
                />
            </ImageBackground>
        )
    }

    function renderCourses() {
        return (
            <FlatList
                horizontal
                data={dummyData.courses_list_1}
                listKey="Courses"
                keyExtractor={item => `Courses-${item.id}`}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    marginTop: SIZES.padding
                }}
                renderItem={({ item, index }) => (
                    <></>
                )}
            />
        )
    }

    return (
        <GestureHandlerRootView style={{ flex: 1, backgroundColor: COLORS.white }}>
            {/* Header */}
            {renderHeader()}

            {/* Content */}
            <ScrollView
                contentContainerStyle={{
                    paddingBottom: 150
                }}
                showsVerticalScrollIndicator={false}
            >
                {/* Start Learning */}
                {renderStartLearding()}

                {/* Courses */}
                {renderCourses()}
            </ScrollView>
        </GestureHandlerRootView>

    )
}

export default Home;