import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View } from 'react-native';
import { navigationRef } from '../NavigationService';
import * as Utils from '../utility';
import AuthNavigator from './authNavigator';
import AppNavigator from './appNavigator';
import { useSelector } from 'react-redux';

const Stack = createStackNavigator();

function AppStack({ }) {

    const { isUserLoggedIn } = useSelector((state) => state.USER_SLICE)
    
    return (
        <View style={{ flex: 1, }} >
            {
                isUserLoggedIn !== undefined &&
                <NavigationContainer ref={navigationRef}  >
                    <Stack.Navigator initialRouteName={Utils.Constants.KEY_APP_NAVIGATOR} screenOptions={{ headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS }}>
                        {
                            !isUserLoggedIn ?
                                <Stack.Screen name={Utils.Constants.KEY_AUTH} component={AuthNavigator} />
                                :
                                <Stack.Screen name={Utils.Constants.KEY_APP_NAVIGATOR} component={AppNavigator} />
                        }
                    </Stack.Navigator>
                </NavigationContainer>
            }
        </View>
    );
}

export default AppStack;