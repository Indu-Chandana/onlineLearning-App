import React from 'react'
import { Image, Text, TouchableOpacity } from 'react-native'
import { FONTS, SIZES } from "../constants"

const IconLabelButton = ({ containerStyle, icon, iconStyle, label, labelStyle, onPress }) => {
    return (
        <TouchableOpacity style={{
            flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: SIZES.base,
            paddingHorizontal: SIZES.radius, ...containerStyle
        }} onPress={onPress}>

        </TouchableOpacity>
    )
}

export default IconLabelButton