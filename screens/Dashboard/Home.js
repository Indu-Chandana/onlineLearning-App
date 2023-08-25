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
import { IconButton, TextButton, VerticalCourseCard, LineDivider, CategoryCard } from "../../components"

// HOC component
const Section = ({ containerStyle, title, onPress, children }) => {
    return (
        <View
            style={{
                ...containerStyle
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    paddingHorizontal: SIZES.padding,

                }}>
                <Text style={{
                    flex: 1,
                    ...FONTS.h2
                }}>
                    {title}
                </Text>

                <TextButton
                    contentContainerStyle={{
                        width: 80,
                        borderRadius: 30,
                        backgroundColor: COLORS.primary
                    }}
                    label="See All"
                    onPress={onPress}
                />
            </View>

            {children}
        </View>
    )
}

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
                    <VerticalCourseCard
                        containerStyle={{
                            marginLeft: index == 0 ? SIZES.padding : SIZES.radius, // if is the first item.
                            marginRight: index == dummyData.courses_list_1.length - 1 ? SIZES.padding : 0 // if it is last one
                        }}
                        course={item}
                    />
                )}
            />
        )
    }
    function renderCategories() {
        return (
            <Section
                title='Categories'>
                <FlatList
                    horizontal
                    data={dummyData.categories}
                    listKey="Categories"
                    keyExtractor={item => `Categories-${item.id}`}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        marginTop: SIZES.radius
                    }}
                    renderItem={({ item, index }) => (
                        // console.log('item::', item.title)
                        <CategoryCard
                            category={item}
                            containerStyle={{
                                marginLeft: index == 0 ? SIZES.padding : SIZES.base, // if it is first val 
                                marginRight: index == dummyData.categories.length - 1 ? SIZES.padding : 0 // if it is last val
                            }}
                        />
                    )}
                />
            </Section>
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

                <LineDivider
                    lineStyle={{
                        marginVertical: SIZES.padding
                    }}
                />

                {/* Categories */}
                {renderCategories()}
            </ScrollView>
        </GestureHandlerRootView>

    )
}

export default Home;