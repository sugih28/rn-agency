import React, { Component } from 'react'
import { Text, View, ScrollView, StatusBar } from 'react-native'
import {Title, withTheme, Card, TextInput, Button, ActivityIndicator, Headline} from 'react-native-paper'
import axios from 'axios'
import sha1 from 'sha1'
import {connect} from 'react-redux'
import {compose} from 'redux'
import {login} from '../../store/actions/authAction'
import LottieView from 'lottie-react-native'

export class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            loading: false
        }
    }

    textHandle = (text, name) => {
        this.setState({
            [name]: text
        })
    }

    loginHandle = () => {
        this.props.login(this.state.username, this.state.password)
    }

    render() {
        let {theme, user, statusAuth, loadingAuth, navigation} = this.props

        if (statusAuth === 'loggedIn') {
            navigation.navigate('SignIn')
        }

        const displayButton = (!loadingAuth) ? (
            <Button style={{width: '100%'}} onPress={() => this.loginHandle()} mode="contained">LOGIN</Button>
        ) : (
            <LottieView source={require('../../assets/animation/dots-spinner.json')} autoPlay loop />
        )

        return (
            <View style={{flex: 6, flexDirection: 'column', backgroundColor: theme.colors.backgroundColor}}>
                <StatusBar backgroundColor={theme.colors.accent} animated={true} />

                <View style={{flex: 4, justifyContent: 'center', alignItems: 'center'}}>
                    <Title style={{position: 'absolute', top: 10, color: theme.colors.headerText}}>Log In</Title>
                    <Headline style={{color: theme.colors.headerText}}>AGENCY</Headline>
                </View>

                <View style={{position: 'absolute', bottom: 0, left: 0, right: 0}}>
                    <Card style={{margin: 15}}>
                        <Card.Content>
                            <TextInput value={this.state.username} style={{backgroundColor: theme.colors.backgroundInput}} autoCapitalize="none" label="Username" onChangeText={(text) => this.textHandle(text, 'username')} />
                            <TextInput value={this.state.password} style={{backgroundColor: theme.colors.backgroundInput}} autoCapitalize="none" secureTextEntry={true} label="Password" onChangeText={(text) => this.textHandle(text, 'password')} />

                            {displayButton}
                        </Card.Content>
                    </Card>
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        statusAuth: state.auth.status,
        loadingAuth: state.auth.loading
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (username, password) => dispatch(login(username, password))
    }
}

export default compose(
    withTheme,
    connect(mapStateToProps, mapDispatchToProps)
)(Login)
