import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import axios from 'axios'
import { UploadImage } from './UploadImage'
import { useDispatch, useSelector } from 'react-redux'
import { closeShareModal } from '../../Store/action/shareBookActions'
import { getBooks } from '../../Store/action/bookActions'
import { showBookContainer } from '../../Store/action/bookContainerActions'
import { setError } from '../../Store/action/userActions'
import { Error } from '../Auth/Error'
import { openLoader, closeLoader } from '../../Store/action/loadingActions'
import { openToast, closeToast } from '../../Store/action/toastActions'

export const ShareBook = () => {
  const user = useSelector(state => state.userReducer.user)
  const darkTheme = useSelector(state => state.themeReducer.darkTheme)
  const dispatch = useDispatch()
  
  const config = {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
  }
  
  const [isSearching, setIsSearching] = useState(false)
  const [bookTitles, setBookTitles] = useState([])
  const [img, setImg] = useState(null)
  const titleRef = useRef()
  const authorRef = useRef()

  const [categories, setCategories] = useState('')
  const [infoLink, setInfoLink] = useState('')
  
  const setInput = (book) => {
    titleRef.current.value = book.title
    if(book.authors)
      authorRef.current.value = book.authors[0]
    if(book.imageLinks)
      setImg(book.imageLinks.thumbnail)
    if(book.categories)
      setCategories(book.categories)
    if(book.infoLink)
      setInfoLink(book.infoLink)
  }
  
  const findTitle = e => {
    const query = e.target.value

    if(query.length > 0) {
      setIsSearching(true)
      axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
        .then(res => {
          if(res.data.items) {
            setBookTitles(res.data.items)
          }
        })
    }
    if(query.length === 0) {
      setIsSearching(false)
      titleRef.current.value = ''
      authorRef.current.value = ''
      setImg('')
    }
  }

  const shareBook = async e => {
    e.preventDefault()
    // const [title, author, description, image] = e.target.elements
    const [title, author, description] = e.target.elements
    
    dispatch(openLoader())

    // const file = new FormData()
    // for(let imgFile in image.files) {
    //   file.append('files', image.files[imgFile])
    // }

    // if(image.files.length > 0) {
      // axios.post(`${process.env.REACT_APP_API_URL}/upload`, file, config)
      // .then((response) => {
        if(title.value.length > 0 && author.value.length > 0 && description.value.length > 0) {
          const data = {
            title: title.value, 
            author: author.value, 
            description: description.value,
            // image: response.data,
            cover: img,
            genres: categories.toString(),
            infoLink,
            user
          }
      
          axios.post(`${process.env.REACT_APP_API_URL}/books`, data, config).then(() => {
            dispatch(getBooks())
            dispatch(closeShareModal())
            dispatch(closeLoader())
            dispatch(showBookContainer())
            setTimeout(() => {
              dispatch(closeToast())
            }, 4000);
            dispatch(openToast('The book was added!'))
          }).catch(error => {
            dispatch(closeLoader())
            console.log(error.response.data)
          })
        } else {
          dispatch(closeLoader())
          dispatch(setError('All fields are required!')) 
        }
      // }).catch(err => {
      //   dispatch(closeLoader())
      //   dispatch(setError(err.response.data.data.errors[0].message))
      // })
    // } else {
    //   dispatch(closeLoader())
    //   dispatch(setError('Files are empty!'))
    // }
  }

  return (
    <Container img={img}>
      <div>
      <motion.form 
        onSubmit={shareBook}
        initial={{opacity: 0, y: 100}}
        animate={{opacity: 1, y: 0, transition: {duration: 0.4}}}
        exit={{opacity: 0, transition: {duration: 0.3}}}>
            <div>
              {/* <img src={img} alt={img} /> */}
              <h2>Share a book</h2>
              <SearchBook isSearching={isSearching} darkTheme={darkTheme}>
                <input type="text" autoComplete="off" name="title" id="title" placeholder="Title" onChange={findTitle} ref={titleRef} />
                <div>
                  {bookTitles.map((bookTitle, index) => {
                    return <span key={index} onClick={() => {
                      setInput(bookTitle.volumeInfo)
                        setIsSearching(false)
                        }}>
                      {
                      bookTitle.volumeInfo.title.length > 40 ?
                        bookTitle.volumeInfo.title.substring(0, 40) + '...'
                        : bookTitle.volumeInfo.title }</span>
                  })}
                </div>
              </SearchBook>
              <input type="text" autoComplete="off" name="author" placeholder="Author" ref={authorRef} />
              <textarea name="description" placeholder="Why do you love this book?"></textarea>
              {/* <label htmlFor="image">
                  <UploadImage /> &nbsp;&nbsp; add image
              </label>
              <input type="file" name="image" id="image" multiple /> */}
              <input type="submit" value="Share Book" />
              <Error />
              <Close onClick={() => {
                dispatch(closeShareModal())
              }} />
            </div>
            <div>
              <div>
                <UploadImage />
                <span />
              </div>
            </div>
        </motion.form>
      </div>
    </Container>
  )
}

const Container = styled.div`
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;

  &>div {
    @media only screen and (max-width: 600px) {
      width: 100vw;
      height: 100%;
    }
  }

  form {
    position: relative;
    padding: 50px 30px 40px;
    background: ${({theme}) => theme.background};
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.4);
    border-radius: 5px;
    color: ${({theme}) => theme.textColor};
    width: 600px;
    display: flex;
    overflow-y: scroll;
    height: 100%;

    &:hover {
      &::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background: ${({darkTheme}) => darkTheme ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)' };
      }
    }

    &::-webkit-scrollbar {
        width: 5px;
    }

    &::-webkit-scrollbar-thumb {
        transition: 0.5s;
        border-radius: 5px;
        background: ${({darkTheme}) => darkTheme ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' };
    }

    &>div {
      flex: 2
    }

    &>div:last-of-type {
      flex: 1;
      padding: 50px 0 0 50px;

      div {
        border-radius: 6px;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
        height: 250px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;

        span {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          border-radius: 6px;
          background: ${({img}) => img ? `url(${img})` : 'none'};
          background-size: cover;
          background-position: center;
        }

        svg {
          opacity: 0.2;
          width: 80px !important;
        }
      }
    }

    @media only screen and (max-width: 600px) {
      width: 100vw;
      height: 100%;
      border-radius: 0;
      padding: 10px;
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.4);
      display: block;

      &>div:last-of-type {
        padding: 0;

        div {
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
          height: 150px;
          width: 90px;

          svg {
            width: 50px !important;
          }
        }
      }
    }
  }

  textarea,
  input {
    padding: 10px;
    display: block;
    width: 100%;
    margin: 25px 0;
    border-radius: 5px;
    background: none;
    border: 1px solid ${({theme}) => theme.primary};
    color: ${({theme}) => theme.textColor};

    &[type='submit'] {
      background: ${({theme}) => theme.primary};
      cursor: pointer;
      margin: 0;
      color: white;
    }

    &[type="file"] {
      display: none
    }

    @media only screen and (max-width: 600px) {
      margin: 15px 0;
    }
  }

  label {
    margin-bottom: 25px;
    display: block;
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: 13px;
    color: ${({theme}) => theme.secondary};
    
    @media only screen and (max-width: 600px) {
      margin: 15px 0;
    }
  }
`

const Close = styled.div`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;

  &:before,
  &:after {
    width: 2px;
    background: ${({theme}) => theme.primary};
    content: '';
    position: absolute;
    top: 0;
    right: calc(50% - 1px);
    height: 100%;
    transform: rotate(45deg);
    transform-origin: center;
  }

  &:after {
    transform: rotate(135deg);
  }
`

const SearchBook = styled.div`
  position: relative;
  border-radius: 5px;
  box-shadow: ${({isSearching}) => isSearching ? '0 5px 10px rgba(0, 0, 0, 0.5)' : 'none'};
  clear: both;

  input {
    margin-bottom: 0;
    /* border: ${({theme, isSearching}) => isSearching ? '1px solid red' : `1px solid ${theme.primary}`}; */
  }

  div {
    position: relative;
    top: 95%;
    width: 100%;
    background: ${({theme}) => theme.background};
    height: ${({isSearching}) => isSearching ?  '295px' : 0};
    padding: ${({isSearching}) => isSearching ?  '7px 0' : 0};
    border-radius: 15px;
    transition: height 0.5s;
    overflow-y: hidden;
    
    span {
      font-family: Verdana, Geneva, Tahoma, sans-serif;
      display: inline-block;
      width: 100%;
      font-size: 13px;
      padding: 6px 10px;
      cursor: pointer;

      &:hover {
        background: ${({darkTheme}) => darkTheme ?  'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)'};
      }
    }
  }
`