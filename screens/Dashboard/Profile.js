
import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    StyleSheet
} from 'react-native';

import {
    IconButton,
    TextButton,
    LineDivider,
    ProgressBar
} from "../../components"
import { COLORS, FONTS, SIZES, icons, images } from "../../constants"

const Profile = () => {

    function renderHeader() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    marginTop: 50,
                    paddingHorizontal: SIZES.padding,
                    justifyContent: 'space-between'
                }}
            >
                <Text
                    style={{
                        ...FONTS.h1,
                        // color: 'black'
                    }}>
                    Profile
                </Text>

                <IconButton
                    icon={icons.sun}
                    iconStyle={{
                        tintColor: COLORS.black
                    }}
                />
            </View>
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
                    backgroundColor: COLORS.primary3
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
                            backgroundColor: COLORS.white

                        }}
                        labelStyle={{
                            color: COLORS.primary
                        }}
                    />
                </View>

            </View>
        )
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.white
            }}>
            {/* Header */}
            {renderHeader()}

            <ScrollView
                contentContainerStyle={{
                    paddingHorizontal: SIZES.padding,
                    paddingBottom: 150
                }}
            >
                {/* Profile Card */}
                {renderProfileCard()}

            </ScrollView>
        </View>
    )
}

export default Profile;