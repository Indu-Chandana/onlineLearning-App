
import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet, SafeAreaView
} from 'react-native';
import { connect } from "react-redux"
import { toggleTheme } from "../../stores/themeActions";

import {
    IconButton,
    TextButton,
    LineDivider,
    ProgressBar,
    ProfileValue,
    ProfileRadioButton
} from "../../components"
import { COLORS, FONTS, SIZES, icons, images } from "../../constants"

const Profile = ({ appTheme, toggleTheme }) => {

    const [newCourseNotification, setNewCourseNotification] = React.useState(false);
    const [studyReminder, setStudyReminder] = React.useState(false)


    // Handler
    function toggleThemeHandler() {
        if (appTheme?.name == "light") {
            toggleTheme("dark")
        } else {
            toggleTheme("light")
        }
    }

    function renderHeader() {
        return (
            <SafeAreaView>
                <View
                    style={{
                        flexDirection: 'row',
                        marginTop: 20,
                        paddingHorizontal: SIZES.padding,
                        justifyContent: 'space-between'
                    }}
                >
                    <Text
                        style={{
                            ...FONTS.h1,
                            color: appTheme?.textColor
                        }}>
                        Profile
                    </Text>

                    <IconButton
                        icon={icons.sun}
                        iconStyle={{
                            tintColor: appTheme?.tintColor
                        }}
                        onPress={() => toggleThemeHandler()}
                    />
                </View>
            </SafeAreaView>
        )
    }

    function renderProfileCard() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    marginTop: SIZES.padding,
                    paddingHorizontal: SIZES.radius,
                    paddingVertical: 20,
                    borderRadius: SIZES.radius,
                    backgroundColor: appTheme?.backgroundColor2
                }}
            >

                {/* Profile Image */}
                <TouchableOpacity
                    style={{
                        width: 80,
                        height: 80
                    }}
                >
                    <Image
                        source={images.profile}
                        style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: 40,
                            borderWidth: 1,
                            borderColor: COLORS.white
                        }}
                    />

                    <View
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            alignItems: 'center',
                            justifyContent: 'flex-end'
                        }}
                    >
                        <View
                            style={{
                                width: 30,
                                height: 30,
                                marginBottom: -15,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 15,
                                backgroundColor: COLORS.primary
                            }}
                        >
                            < Image
                                source={icons.camera}
                                resizeMode='contain'
                                style={{
                                    width: 17,
                                    height: 17
                                }}
                            />
                        </View>
                    </View>

                </TouchableOpacity>

                {/* Details */}
                <View
                    style={{
                        flex: 1,
                        marginLeft: SIZES.radius,
                        alignItems: 'flex-start'
                    }}
                >
                    <Text
                        style={{
                            color: COLORS.white,
                            ...FONTS.h2
                        }}
                    >
                        Indu Chandana
                    </Text>
                    <Text
                        style={{
                            color: COLORS.white,
                            ...FONTS.body4
                        }}
                    >
                        Full Stack Developer
                    </Text>

                    {/* progress */}
                    <ProgressBar
                        progress="58%"
                        containerStyle={{
                            marginTop: SIZES.radius
                        }}
                    />

                    <View
                        style={{
                            flexDirection: 'row'
                        }}
                    >
                        <Text style={{
                            flex: 1,
                            color: COLORS.white,
                            ...FONTS.body4
                        }}>Overall progress</Text>

                        <Text style={{
                            color: COLORS.white,
                            ...FONTS.body4
                        }}>58%</Text>
                    </View>

                    {/* Member */}
                    <TextButton
                        label="+ Become Member"
                        contentContainerStyle={{
                            height: 35,
                            marginTop: SIZES.padding,
                            paddingHorizontal: SIZES.radius,
                            borderRadius: 20,
                            backgroundColor: appTheme?.backgroundColor4

                        }}
                        labelStyle={{
                            color: appTheme?.textColor2
                        }}
                    />
                </View>

            </View>
        )
    }

    function renderProfileSection1() {
        return (
            <View
                style={styles.profileSectionContainer}
            >
                <ProfileValue
                    icon={icons.profile}
                    label="Name"
                    value="Indu Chandana"
                />
                <LineDivider />
                <ProfileValue
                    icon={icons.email}
                    label="Email"
                    value="induchandana@gmail.com"
                />

                <LineDivider />
                <ProfileValue
                    icon={icons.password}
                    label="Password"
                    value="updated 2 weeks ago"
                />

                <LineDivider />
                <ProfileValue
                    icon={icons.call}
                    label="Contact Number"
                    value="+94772166742"
                />


            </View>
        )
    }

    function renderProfileSection2() {
        return (
            <View style={styles.profileSectionContainer}>
                <ProfileValue
                    icon={icons.star_1}
                    value="Pages"
                />
                <LineDivider />
                <ProfileRadioButton
                    icon={icons.new_icon}
                    label="New Course Notification"
                    isSelected={newCourseNotification}
                    onPress={() => {
                        setNewCourseNotification(!newCourseNotification)
                    }}
                />
                <LineDivider />
                <ProfileRadioButton
                    icon={icons.reminder}
                    label="Study Reminder"
                    isSelected={studyReminder}
                    onPress={() => {
                        setStudyReminder(!studyReminder)
                    }}
                />
            </View>
        )
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: appTheme?.backgroundColor1
            }}>
            {/* Header */}
            {renderHeader()}

            <ScrollView
                contentContainerStyle={{
                    paddingHorizontal: SIZES.padding,
                    paddingBottom: 180
                }}
            >
                {/* Profile Card */}
                {renderProfileCard()}

                {/* Profile Section 1 */}
                {renderProfileSection1()}

                {/* Profile Section 2 */}
                {renderProfileSection2()}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    profileSectionContainer: {
        marginTop: SIZES.padding,
        paddingHorizontal: SIZES.padding,
        borderWidth: 1,
        borderRadius: SIZES.radius,
        borderColor: COLORS.gray20
    }
})

function mapStateToProps(state) {
    return {
        appTheme: state.appTheme,
        error: state.error
    }
}

function mapDispatchToProps(dispatch) {
    return {
        toggleTheme: (themeType) => { return dispatch(toggleTheme(themeType)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);