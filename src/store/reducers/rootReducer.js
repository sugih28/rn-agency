import {combineReducers} from 'redux'
import authReducer from './authReducer'
import fundReducer from './fundReducer'

const rootReducer = combineReducers({
    auth: authReducer,
    fund: fundReducer
})

export default rootReducer