import {
    View, Text,
    ImageBackground,
    TouchableOpacity,
    Animated,
    Keyboard
} from 'react-native'
import React, { useRef, useState } from 'react'
import Video from 'react-native-video';

import {
    IconButton,
    LineDivider
} from "../../components"
import {
    COLORS,
    FONTS,
    SIZES,
    icons,
    constants,
    dummyData
} from "../../constants"

const CourseDetails = ({ navigation, route }) => {

    const { selectedCourse } = route.params;

    const [playVideo, setPlayVideo] = useState(false);

    // use that for the content section
    const flatListRef = useRef();
    const scrollX = useRef(new Animated.Value(0)).current

    function renderHeaderComponents() {
        return (
            <>
                {/* Back */}
                <View style={{
                    flex: 1
                }}>
                    <IconButton
                        icon={icons.back}
                        iconStyle={{
                            width: 25,
                            height: 25,
                            tintColor: COLORS.black
                        }}
                        containerStyle={{
                            width: 40,
                            height: 40,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: COLORS.white,
                            borderRadius: 20
                        }}
                        onPress={() => navigation.goBack()}
                    />
                </View>

                {/* Share & Favourite */}
                <View
                    style={{
                        flexDirection: 'row'
                    }}
                >
                    <IconButton
                        icon={icons.media}
                        iconStyle={{
                            tintColor: COLORS.white
                        }}
                        containerStyle={{
                            width: 50,
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    />
                    <IconButton
                        icon={icons.favourite_outline}
                        iconStyle={{
                            tintColor: COLORS.white
                        }}
                        containerStyle={{
                            width: 50,
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    />
                </View>
            </>
        )
    }

    function renderHeader() {
        if (playVideo) {
            return (
                <View
                    style={{
                        flexDirection: 'row',
                        paddingHorizontal: SIZES.radius,
                        paddingBottom: SIZES.base,
                        height: 55,
                        backgroundColor: COLORS.black,
                        alignItems: 'flex-end'

                    }}
                >
                    {renderHeaderComponents()}
                </View>
            )
        } else {
            return (
                <View
                    style={{
                        position: 'absolute',
                        top: SIZES.height > 800 ? 10 : 5,
                        left: 0,
                        right: 0,
                        flexDirection: 'row',
                        paddingHorizontal: SIZES.padding,
                        zIndex: 1
                    }}
                >
                    {renderHeaderComponents()}
                </View>
            )
        }

    }

    function renderVideoSection() {
        return (
            <View
                style={{
                    height: SIZES.height > 800 ? 220 : 200,
                    backgroundColor: COLORS.gray90,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                <ImageBackground
                    source={selectedCourse?.thumbnail}
                    style={{
                        width: "100%",
                        height: "100%",
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    {/* Play Button */}
                    <IconButton
                        icon={icons.play}
                        iconStyle={{
                            width: 25,
                            height: 25,
                            tintColor: COLORS.white
                        }}
                        containerStyle={{
                            width: 55,
                            height: 55,
                            backgroundColor: COLORS.primary,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 30,
                            // marginTop: SIZES.padding
                        }}
                        onPress={() => setPlayVideo(true)}
                    />
                </ImageBackground>

                {playVideo &&

                    <Video source={{ uri: "https://www.w3schools.com/tags/mov_bbb.mp4" }}
                        style={{
                            position: 'absolute',
                            top: 0,
                            bottom: 0,
                            left: 0,
                            right: 0,
                            backgroundColor: COLORS.black
                        }}
                        controls={true}
                        resizeMode="contain"
                        onLoad={() => console.log('video loaded!')}
                        onError={e => console.log('video load failed!', e)}
                    />
                }
            </View>
        )
    }

    function renderContect() {
        return (
            <View
                style={{
                    flex: 1
                }}
            >
                {/* Tabs */}
                <View
                    style={{
                        height: 60,
                        backgroundColor: 'red'
                    }}
                >

                </View>

                {/* Line Divider */}
                <LineDivider lineStyle={{ backgroundColor: COLORS.gray20 }} />

                {/* Content */}
                <Animated.FlatList
                    ref={flatListRef}
                    horizontal
                    pagingEnabled
                    snapToAlignment="center"
                    snapToInterval={SIZES.width}
                    decelerationRate="fast"
                    keyboardDismissMode="on-drag"
                    showsHorizontalScrollIndicator={false}
                    data={constants.course_details_tabs}
                    keyExtractor={item => `CourseDetailTabs-${item.id}`}
                    onScroll={Animated.event([
                        { nativeEvent: { contentOffset: { x: scrollX } } }
                    ], {
                        useNativeDriver: false
                    })}
                    renderItem={({ item, index }) => {
                        return (
                            <View
                                style={{
                                    width: SIZES.width
                                }}
                            >
                                {/* Hello */}

                            </View>
                        )
                    }}
                />
            </View>
        )
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.white
            }}
        >

            {/* Header Bar */}
            {renderHeader()}

            {/* Video */}
            {renderVideoSection()}

            {/* Content */}
            {renderContect()}
        </View>
    )
}

export default CourseDetails