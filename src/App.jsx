/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet
} from 'react-native';

import 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import { Provider } from "react-redux";
import flashMessage from './common/CustomFlashAlert';
import AppStack from './navigations';
import reduxStore from './redux/store';
import colors from './utility/colors';
import { loginUser, logoutUser } from './utility/commonFunctions';
import { KEY_IS_USER_LOGGED_IN } from './utility/constants';
import { retrieveItem } from './utility/customAsyncStorage';

const App = () => {

  useEffect(() => {
    getLoginStatus()
  }, [])

  async function getLoginStatus() {
    try {
      const token = await retrieveItem(KEY_IS_USER_LOGGED_IN)
      if (token) {
        loginUser(token)
      }
      else {
        logoutUser()
      }
    } catch (err) {
      flashMessage('Something went wrong', 'danger')
    }
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <Provider store={reduxStore}  >
        <PaperProvider>
          <AppStack />
        </PaperProvider>
      </Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
