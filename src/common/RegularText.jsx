import React from 'react';
import { StyleSheet, Text } from 'react-native';
import colors from '../utility/colors';
import { fontNames } from '../styles/typography';

const RegularText = (props) => {
    return (
        <Text {...props} style={[styles.text, props.style]} >
            {props.children}
        </Text>
    )
}


RegularText.prototype = {
    style: 'Object'
}

RegularText.defaultProps = {
    children: "",
}

const styles = StyleSheet.create({
    text: {
        color: colors.grey900,
        fontFamily: fontNames.OPEN_SANS_REGULAR,
    }
})

export default RegularText;