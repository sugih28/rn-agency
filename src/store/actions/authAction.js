import axios from 'axios'
import sha1 from 'sha1'
import {AsyncStorage} from 'react-native'

const url = 'justUrl' //<- Change This

export function login(username, password) {
    return(dispatch) => {
        const pass = sha1(password)
        let status = null

        dispatch({
            type: 'LOGIN_PROCESS'
        })

        axios.post(url+'/login', {username: username, password: pass, device_id: 'asd'})
            .then(res => {
                const user = res.data

                if (user) {
                    status = 'loggedIn'
                } else {
                    status = 'loggedOut'
                }

                AsyncStorage.setItem('user', JSON.stringify(user))
                    .then(() => {
                        dispatch({
                            type: 'LOGIN',
                            user,
                            status
                        })
                    }).catch(err => {
                        alert(err)
                    })
            }).catch(err => {
                dispatch({
                    type: 'LOGIN_ERR',
                    err
                })
            })
    }
}

export function checkAuth() {
    return(dispatch) => {
        let status = null

        AsyncStorage.getItem('user')
            .then(res => {
                if (res) {
                    status = 'loggedIn'
                } else {
                    status = 'loggedOut'
                }

                dispatch({
                    type: 'CHECK_AUTH',
                    user: JSON.parse(res),
                    status
                })
            })
    }
}

export function logout() {
    return(dispatch) => {
        let status = null

        AsyncStorage.removeItem('user')
            .then(() => {
                status = 'loggedOut'

                dispatch({
                    type: 'LOGOUT',
                    status
                })
            })
    }
}
