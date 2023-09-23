// import auth from '@react-native-firebase/auth';
import NavigationService from "../NavigationService";
import { logout, userDetails } from '../redux/slices/userSlice';
import store from "../redux/store";
import { KEY_IS_USER_LOGGED_IN, KEY_LAST_LOGIN_AT, KEY_USER_DATA, KEY_USER_TOKEN, MIX_PANEL_EVENT_NAME } from "./constants";
import { clearAsyncKeyData, clearData, storeItem } from "./customAsyncStorage";
// import * as Sentry from "@sentry/react-native";

//NAVIGATION FUNCTIONS
export const navigate = (routeName, params = {},) => {
    NavigationService.navigate(routeName, params)
}

export const replace = (routeName, params = {}) => {
    NavigationService.replace(routeName, params)
}

export const goBack = () => {
    NavigationService.back()
}

export const openDrawer = () => {
    NavigationService.openDrawer()
}

export const closeDrawer = () => {
    NavigationService.closeDrawer()
}

export const clearStack = (routeName, params) => {
    NavigationService.clearStack(routeName, params)
}

export const push = (routeName, params) => {
    NavigationService.push(routeName, params)
}

//user related functions
export async function onLoginSignupSuccess() {
    await storeItem(KEY_IS_USER_LOGGED_IN, true)
    loginUser()
}

export function loginUser() {
    store.dispatch(userDetails({ isUserLoggedIn: true }))
}

export async function logoutUser(params) {
    store.dispatch(logout())
    store.dispatch(userDetails({ isUserLoggedIn: false }))
    clearData()
}