import React, {useState} from 'react'
import {View} from 'react-native'
import { Appbar, Avatar, Menu } from 'react-native-paper';

const Header = ({title, subtitle, drawerToggle, navigation, avatar, backButton, menu}) => {
    const [toggleMenu, setToggleMenu] = useState(false)

    const btnDrawerToggle = (drawerToggle) ? (
        <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} />
    ) : null

    const displayAvatar = (avatar) ? (
        <Avatar.Icon icon="account-circle" size={50} />
    ) : null

    const btnBack = (backButton) ? (
        <Appbar.Action icon="keyboard-backspace" onPress={() => navigation.goBack()} />
    ) : null

    const btnMenu = (menu) ? (
        <Menu
            visible={toggleMenu}
            onDismiss={() => setToggleMenu(false)}
            anchor={
                <Appbar.Action onPress={() => setToggleMenu(true)} icon="more-vert" />
            }
        >
            {menu}
        </Menu>
    ) : null

    return (
        <Appbar.Header>
            {btnDrawerToggle}
            {btnBack}
            <Appbar.Content title={title} subtitle={subtitle} />
            {displayAvatar}
            {btnMenu}
        </Appbar.Header>
    )
}

export default Header
