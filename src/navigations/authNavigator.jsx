import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { SafeAreaView } from 'react-native';
import LoginScreen from '../screens/auth/login';
import RegisterScreen from '../screens/auth/register';
import * as Utils from '../utility';

const Stack = createStackNavigator();

function AuthNavigator() {
    return (
        <SafeAreaView style={{ flex: 1 }} >
            <Stack.Navigator initialRouteName={Utils.Constants.SCREEN_LOGIN} screenOptions={{ headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}>
                <Stack.Screen name={Utils.Constants.SCREEN_LOGIN} component={LoginScreen} />
                <Stack.Screen name={Utils.Constants.SCREEN_REGISTRATION} component={RegisterScreen} />
            </Stack.Navigator>
        </SafeAreaView>
    );
}

export default AuthNavigator;
