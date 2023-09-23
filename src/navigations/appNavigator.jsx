import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { SafeAreaView, View } from 'react-native';
import HomeScreen from '../screens/app/home';
import * as Utils from '../utility';

const Stack = createStackNavigator();

function AppNavigation() {
  return (
    <View style={{ flex: 1 }} >
      <SafeAreaView style={{}} />
      <Stack.Navigator
        initialRouteName={Utils.Constants.SCREEN_HOME}
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}>
        <Stack.Screen name={Utils.Constants.SCREEN_HOME} component={HomeScreen} />
      </Stack.Navigator>
      < SafeAreaView style={{}} />
    </View>
  );
}

export default AppNavigation;