import React from 'react'
import { View, StyleSheet, StatusBar } from 'react-native'
import RegularText from '../../../common/RegularText'
import CommonButton from '../../../common/buttons/CommonButton'
import { logoutUser } from '../../../utility/commonFunctions'
import { spacing } from '../../../styles/spacing'
import colors from '../../../utility/colors'

const HomeScreen = () => {
    return (
        <View style={styles.mainContainer} >
            <StatusBar backgroundColor={colors.white} barStyle={'dark-content'} />
            <RegularText>Home Screen</RegularText>
            <CommonButton title={'Logout'} onPressButton={logoutUser} marginTop={spacing.MARGIN_12} />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: colors.white
    },
})

export default HomeScreen;