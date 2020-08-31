import errorReducer from './errorReducer'
import userReducer from './userReducer'
import themeReducer from './themeReducer'
import sidebarReducer from './sidebarReducer'
import bookContainerReducer from './bookContainer'
import bookReducer from './bookReducer'
import shareBookReducer from './shareBookReducer'
import modalReducer from './modalReducer'
import loadingReducer from './loadingReducer'
import commentReducer from './commentReducer'
import genreReducer from './genreReducer'
import wishlistReducer from './wishlistReducer'
import toastReducer from './toastReducer'
import {loginModalReducer, registerModalReducer} from './authModalReducer'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    userReducer,
    errorReducer,
    themeReducer,
    sidebarReducer,
    bookContainerReducer,
    bookReducer,
    modalReducer,
    registerModalReducer,
    loginModalReducer,
    loadingReducer,
    shareBookReducer,
    commentReducer,
    genreReducer,
    wishlistReducer,
    toastReducer
})

export default rootReducer