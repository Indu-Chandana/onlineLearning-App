import { View, ScrollView, Text, Image, FlatList } from 'react-native';
import { IconLabel, TextButton, HorizontalCourseCard, LineDivider } from "../../../components"
import { COLORS, FONTS, SIZES, images, icons, dummyData } from "../../../constants"


const CourseChapters = () => {

    function renderHeader() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding,
                    paddingHorizontal: SIZES.padding
                }}
            >
                {/* Title */}
                <Text
                    style={{ ...FONTS.h2 }}
                >
                    {dummyData?.course_details?.title}
                </Text>

                {/* Students & Duration */}
                <View style={{ flexDirection: 'row', marginTop: SIZES.base }}>
                    <Text style={{ color: COLORS.gray30, ...FONTS.body4 }}>
                        {dummyData?.course_details?.number_of_students}
                    </Text>

                    <IconLabel
                        icon={icons.time}
                        label={dummyData?.course_details?.duration}
                        containerStyle={{ marginLeft: SIZES.radius }}
                        iconStyle={{ width: 15, height: 15 }}
                        labelStyle={{ ...FONTS.body4 }}
                    />
                </View>

                {/* Instructor */}
                <View
                    style={{ flexDirection: 'row', marginTop: SIZES.radius, alignItems: 'center' }}
                >
                    {/* Profile Photo */}
                    <Image
                        source={images.profile}
                        style={{ width: 50, height: 50, borderRadius: 25 }}
                    />

                    {/* Name & Title */}
                    <View style={{ flex: 1, marginLeft: SIZES.base, justifyContent: 'center' }}>
                        <Text style={{ ...FONTS.h3, fontSize: 18 }}>{dummyData?.course_details?.instructor?.name}</Text>
                        <Text style={{ ...FONTS.body3 }}>{dummyData?.course_details?.instructor?.title}</Text>
                    </View>

                    {/* Text Button */}
                    <TextButton
                        label="Follow +"
                        contentContainerStyle={{ width: 80, height: 35, borderRadius: 20 }}
                        labelStyle={{ ...FONTS.h3 }}
                    />
                </View>
            </View>
        )
    }

    function renderChapter() {
        return (
            <View>
                {dummyData?.course_details?.videos.map((item, index) => {
                    return (
                        <View 
                        key={`Vides-${index}`}
                        style={{
                            alignItems: 'center',
                            height: 70,
                            backgroundColor: item?.is_playing ? COLORS.additionalColor11 :null
                        }}
                        >
                          <View style={{flexDirection: 'row', paddingHorizontal: SIZES.padding, alignItems: 'center', height: 70}}><Text>hello</Text></View>
                        </View>
                    )
                })}
            </View>
        )
    }

    return (
        <ScrollView>
            {/* Header */}
            {renderHeader()}

            {/* Line Divider */}
            <LineDivider lineStyle={{ height: 1, marginVertical: SIZES.radius }} />

            {/* Chapters */}
            {renderChapter()}

            {/* Popular Courses */}
        </ScrollView>
    )
}

export default CourseChapters