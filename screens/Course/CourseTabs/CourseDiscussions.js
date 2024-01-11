import React from "react";
import { View, Text, TextInput, Keyboard, FlatList, Image } from 'react-native'

import { IconButton, IconLabelButton } from "../../../components";
import { COLORS, FONTS, SIZES, icons, dummyData } from "../../../constants"

const CommentSection = ({ commentItem, CommentOption, replies }) => {
    return (
        <View style={{ flexDirection: 'row', marginTop: SIZES.padding }}>
            {/* Profile Photo */}
            <Image
                source={commentItem?.profile}
                style={{ width: 40, height: 40, borderRadius: 20 }}
            />

            {/* Name & Comment */}
            <View style={{ flex: 1, marginTop: 3, marginLeft: SIZES.radius, }}>
                {/* Name */}
                <Text style={{ ...FONTS.h3 }}>{commentItem?.name}</Text>

                {/* Comment */}
                <Text style={{ ...FONTS.body4 }}>{commentItem?.comment}</Text>

                {/* Comment Option */}
                {CommentOption}
            </View>


        </View>
    )
}


const CourseDiscussions = () => {

    function renderDiscussions() {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    data={dummyData?.course_details?.discussions}
                    keyExtractor={item => `Discussions-main-${item.id}`}
                    contentContainerStyle={{ paddingHorizontal: SIZES.padding, paddingBottom: 70 }}
                    renderItem={({ item, index }) => (
                        <CommentSection
                            commentItem={item}
                            CommentOption={
                                <View style={{
                                    flexDirection: 'row', marginTop: SIZES.radius, paddingVertical: SIZES.base, borderTopWidth: 1,
                                    borderBottomWidth: 1, borderColor: COLORS.gray20
                                }}>
                                    {/* Comment */}
                                    <IconLabelButton containerStyle={{ width: 100, height: 40, backgroundColor: 'red' }} />

                                    {/* Like */}

                                    {/* Date */}
                                </View>
                            }
                        />
                    )}
                />
            </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
            {/* Discussions */}
            {renderDiscussions()}

            {/* Footer */}
        </View>
    )
}

export default CourseDiscussions