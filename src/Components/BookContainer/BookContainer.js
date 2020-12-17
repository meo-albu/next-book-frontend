import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import { hideBookContainer, showBookContainer } from '../../Store/action/bookContainerActions'
import { Book } from './Book/Book'
import { FilterSection } from './FilterSection'

export const BookContainer = () => {
  const themeStyle = useSelector(state => state.themeReducer.themeStyle)
  const darkTheme = useSelector(state => state.themeReducer.darkTheme)
  const bookC = useSelector(state => state.bookContainerReducer.bookContainer)
  const books = useSelector(state => state.bookReducer.books)
  const genres = useSelector(state => state.genreReducer.genres)
  const dispatch = useDispatch()
  const ref = useRef();
  const filterRef = useRef();
  
  const [Books, setBooks] = useState([])
  
  useEffect(() => {
    setBooks([])
    books.forEach(book => {
      setBooks(Books => [...Books, book])
    })
  }, [books])
  
  const searchBook = e => {
    const result = Books.filter(title => {
      return title.title.substring(0, e.target.value.length).toLowerCase() === e.target.value.toLowerCase()
    })
    
    setBooks(result)
    
    if(e.target.value.length === 0) {
      setBooks(books)
      for (let item of filterRef.current.querySelectorAll('[type="checkbox"]')) {
        item.checked = false
      }
    }
  }

  const [Filter, setFilter] = useState([])
  
  useEffect(() => {
    setBooks([])
    Filter.forEach(genre => {
      const result = books.filter(title => {
        return title.genres.includes(genre)
      })
      
      setBooks(Books => [...Books, ...result])
    })

    if(Filter.length === 0)
      setBooks(books)
  }, [Filter, books])
  
  const filterByGenre = e => {
    const name = e.target.name
    if(e.target.checked) {
      setFilter(Filter => [...Filter, name])
    } else {
      setFilter(Filter.filter(item => item !== name))
    }
  }
  
  const showHideBooks = () => {
    !bookC && dispatch(showBookContainer())
    bookC && dispatch(hideBookContainer())
  }

  const variants = {
    open: {
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.07
      }
    }
  }

  return (
    <Container theme={themeStyle} darkTheme={darkTheme} bookC={bookC} ref={ref}>
      <header>
        <motion.div
          animate={{ y: bookC ? [20, 10] : [0, 10] }}
          transition={{
            type: 'spring',
            y: {yoyo: Infinity, duration: 0.6},
            scaleY: {ease: 'easeInOut'} 
          }} 
        >
          <OpenCloseContainer onClick={showHideBooks} theme={themeStyle} darkTheme={darkTheme} bookC={bookC}/>
        </motion.div>
      </header>

      <article>
        <FilterSection>
          <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 20.44 20.445">
            <path id="Icon_ionic-ios-search" data-name="Icon ionic-ios-search" d="M24.7,23.458,19.015,17.72a8.1,8.1,0,1,0-1.23,1.246l5.648,5.7a.875.875,0,0,0,1.235.032A.881.881,0,0,0,24.7,23.458ZM12.649,19.035a6.4,6.4,0,1,1,4.524-1.874A6.358,6.358,0,0,1,12.649,19.035Z" transform="translate(-4.5 -4.493)" fill={themeStyle.primary}/>
          </svg>
            <input type="text" placeholder="Search a book" autoComplete="false" onChange={searchBook} />
          </div>


          <h4>Filter by genre</h4>
          <form onChange={filterByGenre} ref={filterRef}>
            {
              genres.filter((value, index, self) => { 
                return self.indexOf(value) === index
              }).map(genre => {
                return (
                  <motion.div key={genre} whileHover={{x: '5px'}}>
                    <input type="checkbox" name={genre} id={genre} />
                    <label htmlFor={genre}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="5" height="9" viewBox="0 0 6.167 10.786">
                        <path id="Icon_ionic-ios-arrow-forward" data-name="Icon ionic-ios-arrow-forward" d="M15.554,11.587,11.473,7.509a.768.768,0,0,1,0-1.089.777.777,0,0,1,1.092,0l4.624,4.621a.769.769,0,0,1,.022,1.063l-4.644,4.653a.771.771,0,0,1-1.092-1.089Z" transform="translate(-11.246 -6.196)"/>
                      </svg>
                      {genre}
                    </label>
                  </motion.div>
                )
              })
            }
          </form>
        </FilterSection>

        <motion.section initial={false} animate={bookC ? "open" : "closed"}>
          <motion.div variants={variants}>
            {
              Books.map(book => {
                return <Book 
                  key={book.id}
                  id={book.id}
                  title={book.title} 
                  description={book.description}
                  user={book.user.username} 
                  author={book.author} 
                  likes={book.likes} 
                  cover={book.cover}
                  />
              })
            }
          </motion.div>
        </motion.section>
      </article>

    </Container>
  )
}

const Container = styled.div`
  font-size: 16px;
  position: absolute;
  box-sizing: padding-box;
  transform: ${({bookC}) => bookC ? 'translateY(calc(-100% + 70px))' : 'translateY(0)' };
  transform-origin: top center;
  transition: transform 0.2s;
  height: calc(100% - 70px);
  bottom: calc(-100% + 140px);
  width: 100vw;
  top: auto;
  left: 0;
  background: ${({theme}) => theme.background};
  color: ${({theme}) => theme.textColor};
  box-shadow: ${({darkTheme}) => darkTheme ? '0 0 5px rgba(0, 0, 0, 0.3)' : '0 0 10px rgba(0, 0, 0, 0.2)' };
  padding: 0 calc(12% - 30px) 10px;
  border-radius: ${({bookC}) => bookC ? '0' : '1vw' };
  text-shadow: none;
  
  &>article {
    display: flex;
    overflow-Y: scroll;
    height: 100%;

    @media only screen and (max-width: 600px) {
      display: block;
    }

    &>div {
      flex: 1;
      padding: 30px;

       @media only screen and (max-width: 600px) {
        padding: 0 5px 15px;
      }
    }

    &>section {
      flex: 5;
      height: 100%;
      padding: 30px;
      
      &>div {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 200px));
        gap: 20px;
        justify-content: space-around;

        @media only screen and (max-width: 450px) {
          justify-content: center;
        }
      }

      @media only screen and (max-width: 600px) {
        padding: 0 5px;
      }

    }

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
  }

  &>header {
    padding: 10px 0 20px;
  }

  @media only screen and (max-width: 1400px) {
    text-align: left;
  }

  @media only screen and (max-width: 600px) {
    transform: ${({bookC}) => bookC ? 'translateY(calc(-100% + 70px))' : 'translateY(100%)' };
    padding: 0 5px 40px;
    width: 100vw;
    left: 0;
    right: 0;
    border-width: 1px 0 0 0;
  }
`

const OpenCloseContainer = styled.div`
  position: relative;
  top: 0;
  left: 50%;
  transform: translateX(-50%) ${({bookC}) => bookC ? 'rotateX(180deg)' : 'rotateX(0)' };;
  width: 65px;
  height: 30px;
  transform-origin: center center;
  transition: transform 0.8s;
  cursor: pointer;

  @media only screen and (max-width: 600px) {
    top: -5px;
  }

  &:before,
  &:after {
    content: '';
    position: absolute;
    border-radius: 5px;
    background: ${({theme, darkTheme}) => darkTheme ? theme.secondary : theme.primary};
    width: 50%;
    height: 5px;
    top: 50%;
    transform: translateY(-50%);
    transform-origin: center;
  }

  &:before {
    left: 2px;
    transform: rotate(-15deg)
  }
  &:after {
    right: 2px;
    transform: rotate(15deg)
  }
`