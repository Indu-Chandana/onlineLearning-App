import { View, Text } from 'react-native'
import React from 'react'

import { COLORS } from "../constants"

const ProgressBar = ({ containerStyle, progress = 50 }) => {
    return (
        <View
            style={{
                width: '100%',
                height: 13,
                borderRadius: 10,
                backgroundColor: COLORS.white,
                ...containerStyle
            }}
        >

            <View
                style={{
                    position: 'absolute',
                    left: 0,
                    height: "100%",
                    width: progress,
                    borderRadius: 10,
                    backgroundColor: COLORS.primary
                }}
            />
        </View>
    )
}

export default ProgressBar