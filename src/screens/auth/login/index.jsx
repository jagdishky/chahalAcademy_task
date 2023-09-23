import React, { useEffect, useState } from 'react'
import { Image, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, StatusBar, StyleSheet, TouchableOpacity, View, ScrollView } from 'react-native'
import flashMessage from '../../../common/CustomFlashAlert'
import RegularText from '../../../common/RegularText'
import CommonButton from '../../../common/buttons/CommonButton'
import CommonTextInput from '../../../common/inputBoxes/CommonTextInput'
import commonStyle from '../../../styles/commonStyles'
import { textScale } from '../../../styles/responsiveStyles'
import { spacing } from '../../../styles/spacing'
import { fontNames } from '../../../styles/typography'
import colors from '../../../utility/colors'
import { navigate, onLoginSignupSuccess } from '../../../utility/commonFunctions'
import { APP_PADDING_HORIZONTAL, SCREEN_REGISTRATION } from '../../../utility/constants'
import { Images } from '../../../utility/imagePaths'
import { isInputEmpty, validateEmail } from '../../../utility/validations'

const LoginScreen = () => {

    const [email, setEmail] = useState('')
    const [emailError, setEmailError] = useState('')
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const [isKeyBoardVisible, setIsKeyboardVisible] = useState(false)
    const [isButtonLoading, setIsButtonLoading] = useState(false)


    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setIsKeyboardVisible(true);
            },
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setIsKeyboardVisible(false);
            },
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    function onPressLogin() {
        navigate(SCREEN_REGISTRATION)
    }

    async function onPressSignin() {
        try {
            setIsButtonLoading(true)
            const isEmailValidation = validateEmail(email.trim())
            const isPasswordValidation = isInputEmpty(password)

            if (!isEmailValidation.success) setEmailError(isEmailValidation.msg); else setEmailError('')
            if (!isPasswordValidation.success) setPasswordError('Please enter password'); else setPasswordError('')

            if (!isEmailValidation.success || !isPasswordValidation.success) {
                setIsButtonLoading(false)
                return
            }

            await onLoginSignupSuccess()
        }
        catch (error) {
            flashMessage("Something went wrong", 'danger')
            setIsButtonLoading(false)
        }

    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }} >
            <StatusBar backgroundColor={colors.white} barStyle={'dark-content'} />
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1, }} >
                <View style={styles.mainContainer} >
                    <RegularText style={styles.welcomeText} >{'Welcome Back'}</RegularText>
                    <RegularText style={styles.toAppText} >{'To App'}</RegularText>
                    {
                        !isKeyBoardVisible &&
                        <View style={styles.imageContainer} >
                            <Image source={Images.IMG_LOGIN_BANNER} style={styles.banner} />
                        </View>
                    }
                    <View style={styles.inputContainer} >
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
                            onChangeText={(text) => setPassword(text)}
                            secureTextEntry={true}
                        />
                    </View>
                    <CommonButton
                        title={'Signin'}
                        fetching={isButtonLoading}
                        marginTop={spacing.MARGIN_10}
                        onPressButton={() => onPressSignin()}
                    />
                    <View style={styles.otherBtnContainer} >
                        <TouchableOpacity onPress={onPressLogin}  >
                            <RegularText style={styles.forgotBtn_text} >New user? <RegularText>Register</RegularText></RegularText>
                        </TouchableOpacity>
                        <TouchableOpacity  >
                            <RegularText style={styles.forgotBtn_text} >{'Forgot Password'}?</RegularText>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }} />
                    <RegularText style={styles.termsAndConditionText} >{"By Signing in, you agree to App"} <RegularText style={styles.termsAndConditionText_bold} >{'terms and condition'}</RegularText></RegularText>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.appBackgroundColor,
        paddingHorizontal: APP_PADDING_HORIZONTAL,
    },
    welcomeText: {
        fontSize: textScale(18),
        fontFamily: fontNames.OPEN_SANS_BOLD,
        marginTop: '5%',
    },
    toAppText: {
        fontSize: textScale(12),
        fontFamily: fontNames.OPEN_SANS_REGULAR,
        marginBottom: '5%'
    },
    imageContainer: {
        justifyContent: "center",
        alignSelf: 'center',
    },
    banner: {
    },
    inputContainer: {
        // marginTop: '5%'
    },
    agencyCheckBoxContainer: {

    },
    otherBtnContainer: {
        ...commonStyle.flexDirectionRow,
        justifyContent: 'space-between',
        marginTop: spacing.MARGIN_6,
    },
    forgotBtn_text: {
        color: colors.grey600,
        paddingVertical: spacing.PADDING_6,
        fontSize: textScale(14)
    },
    registerText: {
        fontSize: textScale(14),
        color: colors.grey600,
        textAlign: 'center'
    },
    termsAndConditionText: {
        textAlign: 'center',
        fontSize: textScale(10),
        fontFamily: fontNames.OPEN_SANS_SEMI_BOLD,
        color: colors.grey600,
        paddingVertical: '2%'
    },
    termsAndConditionText_bold: {
        fontFamily: fontNames.OPEN_SANS_SEMI_BOLD,
        color: colors.black
    },
})

export default LoginScreen