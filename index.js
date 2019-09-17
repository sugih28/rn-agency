import {AppRegistry} from 'react-native';
import React from 'react'
import App from './App';
import {name as appName} from './app.json';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper'
import { createStore, applyMiddleware } from 'redux'
import {Provider as StoreProvider} from 'react-redux'
import thunk from 'redux-thunk'
import rootReducer from './src/store/reducers/rootReducer'

const store = createStore(rootReducer, applyMiddleware(thunk))

const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: '#ec407a',
      accent: '#db3069',
      backgroundColor: '#333',
      surface: '#424242',
      text: '#9e9e9e',
      backgroundInput: '#4c4c4c',
      placeholder: '#9e9e9e',
      headerText: '#fff'
    }
}

export default function Main() {
    return (
        <StoreProvider store={store}>
            <PaperProvider theme={theme}>
                <App />
            </PaperProvider>
        </StoreProvider>
    )
}

AppRegistry.registerComponent(appName, () => Main);
