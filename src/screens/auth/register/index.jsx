import React, { useEffect, useState } from 'react'
import { Image, Keyboard, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import flashMessage from '../../../common/CustomFlashAlert'
import RegularText from '../../../common/RegularText'
import CommonButton from '../../../common/buttons/CommonButton'
import CommonTextInput from '../../../common/inputBoxes/CommonTextInput'
import { textScale } from '../../../styles/responsiveStyles'
import { spacing } from '../../../styles/spacing'
import { fontNames } from '../../../styles/typography'
import colors from '../../../utility/colors'
import { goBack, onLoginSignupSuccess } from '../../../utility/commonFunctions'
import { APP_PADDING_HORIZONTAL } from '../../../utility/constants'
import { Images } from '../../../utility/imagePaths'
import { validateConfirmPassword, validateEmail, validatePassword } from '../../../utility/validations'

const RegisterScreen = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')
    const [isKeyBoardVisible, setIsKeyboardVisible] = useState(false)
    const [isButtonLoading, setIsButtonLoading] = useState(false)

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setIsKeyboardVisible(true); // or some other action
            },
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setIsKeyboardVisible(false); // or some other action
            },
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    async function onPressSignup() {
        try {
            setIsButtonLoading(true)
            const emailValidation = validateEmail(email.trim())
            const passwordValidation = validatePassword(password)
            const confirmPasswordValidation = validateConfirmPassword(password, confirmPassword)

            if (!emailValidation.success) setEmailError(emailValidation.msg); else setEmailError('')
            if (!passwordValidation.success) setPasswordError(passwordValidation.msg); else setPasswordError('')
            if (!confirmPasswordValidation.success) setConfirmPasswordError(confirmPasswordValidation.msg); else setConfirmPasswordError('')

            if (!emailValidation.success || !passwordValidation.success || !confirmPasswordValidation.success) return

            await onLoginSignupSuccess()
        } catch (err) {
            flashMessage('Something went wrong', 'danger')
            setIsButtonLoading(false)
        }
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }} >
            <ScrollView style={styles.mainContainer} >
                <TouchableOpacity onPress={goBack} style={{ alignSelf: 'flex-start', borderWidth: 0 }}  >
                    <Image source={Images.IMG_ARROW_RIGHT} style={styles.backIcon} />
                </TouchableOpacity>
                {
                    // !isKeyBoardVisible &&
                    <View style={styles.imageContainer} >
                        <Image source={Images.IMG_SINGUP_BANNER} />
                    </View>
                }
                <RegularText style={styles.title} >Fill details to signup</RegularText>
                <CommonTextInput
                    label={'Email'}
                    value={email}
                    error={emailError}
                    onChangeText={(text) => setEmail(text)}
                />
                <CommonTextInput
                    label={'Password'}
                    value={password}
                    error={passwordError}
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                />
                <CommonTextInput
                    label={'Confirm Password'}
                    value={confirmPassword}
                    error={confirmPasswordError}
                    onChangeText={(text) => setConfirmPassword(text)}
                />

                <CommonButton
                    title={'Sign up'}
                    marginTop={spacing.MARGIN_16}
                    onPressButton={onPressSignup}
                    fetching={isButtonLoading}
                />
                <View style={{ flex: 1 }} />

            </ScrollView>
            {
                !isKeyBoardVisible &&
                <RegularText style={styles.termsAndConditionText} >{"By signing up, you agree to App"} <RegularText style={styles.termsAndConditionText_bold} >{'terms and condition'}</RegularText></RegularText>
            }
            {/* </KeyboardAvoidingView> */}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.appBackgroundColor,
        padding: APP_PADDING_HORIZONTAL,
    },
    backIcon: {
        transform: [{ rotate: '180deg' }],
        tintColor: colors.black
    },
    imageContainer: {
        justifyContent: "center",
        alignSelf: 'center',
    },
    title: {
        fontSize: textScale(14),
        fontWeight: 800,
        fontFamily: fontNames.OPEN_SANS_MEDIUM,
        marginBottom: spacing.MARGIN_12
    },
    termsAndConditionText: {
        textAlign: 'center',
        fontSize: textScale(10),
        fontFamily: fontNames.OPEN_SANS_SEMI_BOLD,
        color: colors.grey600,
        marginVertical: APP_PADDING_HORIZONTAL
    },
    termsAndConditionText_bold: {
        fontFamily: fontNames.OPEN_SANS_SEMI_BOLD,
        color: colors.black
    },
})

export default RegisterScreen