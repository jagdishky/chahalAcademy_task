import React from 'react';
import { ActivityIndicator, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { textScale } from '../../styles/responsiveStyles';
import { spacing } from '../../styles/spacing';
import { fontNames } from '../../styles/typography';
import colors from '../../utility/colors';
import RegularText from '../RegularText';

const CommonButton = ({
    backgroundColor,
    title,
    textStyle,
    buttonStyle,
    onPressButton,
    disabled,
    fetching,
    rightImage,
    rightImageStyle,
    marginTop,
    leftImage,
    leftImageStyle,
    activityIndicatorColor,
    isSecondary
}) => {

    return (
        <TouchableOpacity
            disabled={disabled}
            style={[
                styles.buttonStyle,
                buttonStyle,
                { backgroundColor: isSecondary ? backgroundColor || colors.white : backgroundColor || colors.theme, marginTop: marginTop, borderColor: backgroundColor || colors.theme },
                disabled && { backgroundColor: colors.lightTheme02, borderColor: colors.lightTheme02 },
                // isSecondary && { backgroundColor : colors}
            ]}
            onPress={() => {
                if (!fetching) {
                    onPressButton()
                }
            }}
        >
            {!fetching &&
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }} >
                    {leftImage ?
                        <View style={{ alignItems: "flex-end" }}>
                            <Image source={leftImage} style={leftImageStyle} />
                        </View>
                        : null
                    }
                    <RegularText style={[styles.textStyle, isSecondary && { color: colors.theme }, textStyle]}>
                        {title}
                    </RegularText>
                    {rightImage ?
                        <View style={{ alignItems: "flex-end" }} >
                            <Image source={rightImage} style={rightImageStyle} />
                        </View>
                        : null
                    }
                </View>
            }
            {
                fetching == true &&
                <ActivityIndicator color={activityIndicatorColor || colors.white} size='small' />
            }
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    buttonStyle: {
        borderRadius: spacing.RADIUS_8,
        paddingHorizontal: spacing.PADDING_12,
        height: spacing.HEIGHT_48,
        justifyContent: "center",
        borderWidth: spacing.WIDTH_2,
    },
    textStyle: {
        color: colors.white,
        fontSize: textScale(14),
        fontFamily: fontNames.OPEN_SANS_BOLD
    }
});

CommonButton.defaultProps = {
    onPressButton: () => { }
}

export default CommonButton;