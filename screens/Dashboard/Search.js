import React from 'react';
import {
    View,
    Text,
    Image,
    TextInput
} from 'react-native';
import { Shadow } from "react-native-shadow-2"
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler"

import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
} from 'react-native-reanimated';

import { TextButton, CategoryCard } from "../../components"
import { COLORS, FONTS, SIZES, icons, dummyData } from "../../constants"

const Search = () => {

    const scrollViewRef = React.useRef()

    function renderTopSeatches() {
        return (
            <GestureHandlerRootView style={{}}>
                <View
                    style={{
                        marginTop: SIZES.padding
                    }}
                >
                    <Text
                        style={{
                            marginHorizontal: SIZES.padding,
                            ...FONTS.h2
                        }}
                    >
                        Top Searches
                    </Text>

                    <FlatList
                        horizontal
                        data={dummyData.top_searches}
                        listKey="TopSearches"
                        keyExtractor={item => `TopSearches-${item.id}`}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            marginTop: SIZES.radius
                        }}
                        renderItem={({ item, index }) => (
                            <TextButton
                                label={item.label}
                                contentContainerStyle={{
                                    paddingVertical: SIZES.radius,
                                    paddingHorizontal: SIZES.padding,
                                    marginLeft: index == 0 ? SIZES.padding : SIZES.radius,
                                    marginRight: index == dummyData.top_searches.length - 1 ? SIZES.padding : 0,
                                    borderRadius: SIZES.radius,
                                    backgroundColor: COLORS.gray10
                                }}
                                labelStyle={{
                                    color: COLORS.gray50,
                                    ...FONTS.h3
                                }}
                            />
                        )}
                    />
                </View>
            </GestureHandlerRootView>
        )
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.white
            }}
        >
            <Animated.ScrollView
                ref={scrollViewRef}
                contentContainerStyle={{
                    marginTop: 100,
                    paddingBottom: 300,
                }}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                keyboardDismissMode="on-drag"
            // onScroll
            //onScrollEndDrag
            >
                {/* Top Searches */}
                {renderTopSeatches()}
            </Animated.ScrollView>
        </View>
    )
}

export default Search;