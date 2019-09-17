import React from 'react'
import {createAppContainer} from 'react-navigation'
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch'
import {Transition} from 'react-native-reanimated'
import {createStackNavigator} from 'react-navigation-stack'

import Login from '../components/auth/Login'
import CheckAuth from '../components/auth/CheckAuth'
import Home from '../components/screen/home/Home'
import FundPerformance from '../components/screen/home/fund/FundPerformance'

const stackOptions = {
    headerMode: 'none'
}

const stackHome = createStackNavigator({
    Main: Home,
    Fund: FundPerformance
}, stackOptions)

const SignIn = createStackNavigator({
    Home: stackHome
}, stackOptions)

const SignOut = createStackNavigator({
    Login: Login
}, stackOptions)

const AppNavigator = createAnimatedSwitchNavigator({
    SignIn: SignIn,
    SignOut: SignOut,
    CheckAuth: CheckAuth
}, {
    initialRouteName: 'CheckAuth',
    transition: (
        <Transition.Together>
            <Transition.Out
                type="slide-bottom"
                durationMs={400}
                interpolation="easeIn"
            />
            <Transition.In type="fade" durationMs={500} />
        </Transition.Together>
    )
})

export default createAppContainer(AppNavigator)