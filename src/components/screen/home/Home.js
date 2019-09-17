import React, { Component } from 'react'
import { View, Image, StatusBar, Alert } from 'react-native'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {logout} from '../../../store/actions/authAction'
import {withTheme, Text, Card, Title, Caption, Avatar, TouchableRipple, Menu, IconButton} from 'react-native-paper'

import imgGraph from '../../../assets/image/line-graph.png'

export class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menuVisible: false
        }
    }

    menuToggle = (show) => {
        this.setState({
            menuVisible: show
        })
    }

    logoutHandle = () => {
        Alert.alert('Apakah anda yakin?', 'logout dari akun ini', [
            {text: 'Ya', onPress: () => this.props.logout()},
            {text: 'Tidak'}
        ])
    }

    render() {
        const {theme, statusAuth, user, navigation} = this.props

        if (statusAuth === 'loggedOut') {
            navigation.navigate('SignOut')
        }
        
        return (
            <View style={{backgroundColor: theme.colors.backgroundColor, flex: 6, flexDirection: 'column'}}>
                <StatusBar backgroundColor={theme.colors.accent} animated={true} />

                <Card style={{backgroundColor: theme.colors.primary, marginBottom: 60}}>
                    <Card.Content style={{flexDirection: 'column'}}>
                        <View style={{alignItems: 'center', paddingBottom: 25}}>
                            <Title style={{color: theme.colors.headerText}}>AGENCY</Title>
                        </View>

                        <View style={{position: 'absolute', top: 5, right: 5}}>
                            <Menu
                                visible={this.state.menuVisible}
                                onDismiss={() => this.menuToggle(false)}
                                anchor={
                                    <IconButton style={{color: theme.colors.headerText}} onPress={() => this.menuToggle(true)} icon="more-vert" />
                                }
                            >
                                <Menu.Item onPress={() => this.logoutHandle()} title="Logout" />
                            </Menu>
                        </View> 

                        <Card style={{marginBottom: -55,}}>
                            <Card.Content style={{flexDirection: 'row'}}>
                                <View style={{justifyContent: 'center', flexDirection: 'column', flex: 1}}>
                                    <Text>{user.nama_agen}</Text>
                                    <Caption>{user.agen_code}</Caption>
                                </View>

                                <Avatar.Image size={50} style={{backgroundColor: '#333', justifyContent: 'flex-end'}} />
                            </Card.Content>
                        </Card>
                    </Card.Content>
                </Card>

                <View style={{flexDirection: 'row'}}>
                    <Card style={{flex: 2, margin: 5,}}>
                        <TouchableRipple onPress={() => alert('H')} rippleColor="rgba(0, 0, 0, .32)" style={{paddingTop: 15, paddingBottom: 15}}>
                            <Card.Content style={{flexDirection: 'column', justifyContent: 'center'}}>

                            </Card.Content>
                        </TouchableRipple>
                    </Card>

                    <Card style={{flex: 2, margin: 5,}}>
                        <TouchableRipple onPress={() => navigation.navigate('Fund')} rippleColor="rgba(0, 0, 0, .32)" style={{paddingTop: 15, paddingBottom: 15}}>
                            <Card.Content style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                <Image style={{width: 50, height: 50, margin: 3}} source={imgGraph} />
                                <Text style={{textAlign: 'center'}}>Fund Performance</Text>
                            </Card.Content>
                        </TouchableRipple>
                    </Card>

                    <Card style={{flex: 2, margin: 5,}}>
                        <TouchableRipple onPress={() => alert('H')} rippleColor="rgba(0, 0, 0, .32)" style={{paddingTop: 15, paddingBottom: 15}}>
                            <Card.Content style={{flexDirection: 'column', justifyContent: 'center'}}>

                            </Card.Content>
                        </TouchableRipple>
                    </Card>
                </View>
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
        logout: () => dispatch(logout())
    }
}

export default compose(
    withTheme,
    connect(mapStateToProps, mapDispatchToProps)
)(Home)