import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux'
import rootReducer from './Store/reducers'
// eslint-disable-next-line
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'

const screen = window.screen.availWidth
let store = ''

if(screen > 700) {
  store = createStore(rootReducer, compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ))
} else {
  store = createStore(rootReducer, applyMiddleware(thunk))
}

ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>
  ,
  document.getElementById('root')
)
