const initState = {
    user: {},
    status: '',
    loading: false
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case 'LOGIN_PROCESS': 
            return {
                ...state,
                loading: true
            }
        case 'LOGIN':
            return {
                ...state,
                user: action.user,
                status: action.status,
                loading: false
            }  
        case 'LOGIN_ERR':
            alert(action.err)
            return {
                ...state,
                status: 'error',
                loading: false
            }
        case 'CHECK_AUTH':
            return {
                ...state,
                user: action.user,
                status: action.status
            }  
        case 'LOGOUT':
            return {
                ...state,
                user: {},
                status: action.status
            }        
        default:
            return state
    }
}

export default authReducer