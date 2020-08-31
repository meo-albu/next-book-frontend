import React from 'react'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { useSelector, useDispatch } from 'react-redux'
import { closeSidebar } from '../../Store/action/sidebarActions'
import { getBook } from '../../Store/action/bookActions'
import { openModal } from '../../Store/action/modalActions'
import { closeWishlist } from '../../Store/action/wishlistActions'

const svgV = {
  hidden: {
    pathLength: 0,
    opacity: 0
  },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 1,
      ease: "easeInOut"
    }
  }
}

export const Wishlist = () => {
  const likedBooks = useSelector(state => state.wishlistReducer.likedBooks)
  const themeStyle = useSelector(state => state.themeReducer.themeStyle)
  const darkTheme = useSelector(state => state.themeReducer.darkTheme)
  const dispatch = useDispatch()

  return (
    <Container
      initial={{scaleX: 0}}
      animate={{scaleX: 1, transition: {duration: 0.01}}}
    >
      <h3>Whishlist</h3>

      <CloseWishlist onClick={() => dispatch(closeWishlist())}>
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 33 33">
            <g id="Icon_feather-arrow-right-circle" data-name="Icon feather-arrow-right-circle" transform="translate(-1.5 -1.5)">
              <motion.path 
                variants={svgV}
                initial="hidden"
                animate="visible"
                id="Path_18" data-name="Path 18" d="M33,18A15,15,0,1,1,18,3,15,15,0,0,1,33,18Z" fill="none" stroke={darkTheme ? themeStyle.secondary : themeStyle.primary} stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
              <motion.path 
                variants={svgV}
                initial="hidden"
                animate="visible"
                id="Path_19" data-name="Path 19" d="M18,24l6-6-6-6" fill="none" stroke={darkTheme ? themeStyle.secondary : themeStyle.primary} stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
              <motion.path 
                variants={svgV}
                initial="hidden"
                animate="visible"
                id="Path_20" data-name="Path 20" d="M12,18H24" fill="none" stroke={darkTheme ? themeStyle.secondary : themeStyle.primary} stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
            </g>
          </svg>
      </CloseWishlist>

      {likedBooks.map(book => 
        <div key={book.id} onClick={() => {
          dispatch(closeSidebar())
          dispatch(getBook(book.id))
          dispatch(openModal())
          dispatch(closeWishlist())
        }}>
          <div>
            <img src={book.cover} alt={book.cover} />
          </div>
          <div>
            <Title>{book.title}</Title>
            <Author>{book.author}</Author>
            <Description>{book.description.substring(0, 240)}</Description>
          </div>
        </div>
      )}
    </Container>
  )
}

const Container = styled(motion.div)`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: ${({theme}) => theme.background};
  color: ${({theme}) => theme.textColor};
  padding: 30px;
  z-index: 5;
  transition: transform 0.3s;
  transform-origin: right;
  overflow-y: scroll;

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

  @media only screen and (max-width: 600px) {
    padding: 15px;
  }

  >div {
    margin-top: 20px;
    cursor: pointer;
    display: flex;

    >div:first-of-type {
      width: 20%;
      margin-right: 10px;

      img {
        width: 100%;
      }
    }
  }

`

const CloseWishlist = styled.div`
  margin: 0 !important;
  position: absolute;
  right: 15px;
  top: 15px;
`

const Title = styled.p`
  font-size: 13px;
  margin-bottom: 5px;
`

const Author = styled.p`
  font-size: 10px;
  color: ${({theme}) => theme.secondary};
  font-weight: 600;
  font-style: italic;
  margin-bottom: 10px;
`

const Description = styled.p`
  font-size: 11px;
`
