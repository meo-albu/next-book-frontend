import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled, {ThemeProvider} from 'styled-components'

import {autoLogin} from './Store/action/userActions'
import { Header } from './Components/Header/Header';
import { Main } from './Components/Main/Main';
import { Sidebar } from './Components/Sidebar/Sidebar';
import { getBooks } from './Store/action/bookActions';
import { BookModal } from './Components/BookContainer/BookModal/BookModal';
import { Login } from './Components/Auth/Login';
import { Loader } from './Components/Auth/Loader';
import { Register } from './Components/Auth/Register';
import { ShareBook } from './Components/ShareBook/ShareBook';
import { getComments } from './Store/action/commentActions';

export default function App() {
  
  const theme = useSelector(state => state.themeReducer.themeStyle)
  const login = useSelector(state => state.loginModalReducer.isOpen)
  const register = useSelector(state => state.registerModalReducer.isOpen)
  const shareBook = useSelector(state => state.shareBookReducer.isOpen)
  const isLoading = useSelector(state => state.loadingReducer.isLoading)
  const loggedIn = useSelector(state => state.userReducer.loggedIn)
  const isOpen = useSelector(state => state.modalReducer.isOpen)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(autoLogin())
    dispatch(getBooks())
    dispatch(getComments())
  }, [dispatch])

  return (
      <ThemeProvider theme={theme}>
        <GeneralStyles>
          <Header />
          <Main />
          <Sidebar />
          {isOpen && <BookModal />}
          {shareBook && loggedIn && <ShareBook />}
          {login && <Login />}
          {register && <Register />}
          {isLoading && <Loader />}
        </GeneralStyles>
      </ThemeProvider>
  );
}

const GeneralStyles = styled.div`
  *::selection {
    background: ${({theme}) => theme.secondary};
    color: white
  }
`