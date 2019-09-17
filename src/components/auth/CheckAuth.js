import React, { Component } from 'react'
import { Text, View, StatusBar } from 'react-native'
import {connect} from 'react-redux'
import {checkAuth} from '../../store/actions/authAction'
import LottieView from 'lottie-react-native'

export class CheckAuth extends Component {
    componentDidMount() {
        this.props.checkAuth()
        setTimeout(() => this.redirectRoute(), 1500)
    }

    redirectRoute = () => {
        let {statusAuth, navigation} = this.props

        if (statusAuth === 'loggedIn') {
            navigation.navigate('SignIn')
        } else if (statusAuth === 'loggedOut') {
            navigation.navigate('SignOut')
        }
    }

    render() {
        let {user} = this.props        

        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <StatusBar hidden={true} animated={true} />
                <LottieView source={require('../../assets/animation/loading-bar.json')} autoPlay loop />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        statusAuth: state.auth.status
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        checkAuth: () => dispatch(checkAuth())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckAuth)
