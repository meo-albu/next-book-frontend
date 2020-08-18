import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { GoBack } from './GoBack'
import * as Vibrant from 'node-vibrant'
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { closeModal } from '../../../Store/action/modalActions';
import { Heart } from './Heart';
import { WishIcon } from './WishIcon';
import axios from 'axios'
import { getBooks } from '../../../Store/action/bookActions';
import { openLoginModal } from '../../../Store/action/authModalActions';
import { Comment } from './Comments/Comment';
import { AddComment } from './Comments/AddComment';

const options = {
  colorCount: 5,
  quality: 4
}

export const BookModal = () => {
  const theme = useSelector(state => state.themeReducer.themeStyle)
  const darkTheme = useSelector(state => state.themeReducer.darkTheme)
  const {isOpen, bookDetails} = useSelector(state => state.modalReducer)
  const user = useSelector(state => state.userReducer.user)
  const loggedIn = useSelector(state => state.userReducer.loggedIn)
  const dispatch = useDispatch()
  const [gradient, setGradient] = useState('')

  const [liked, setLiked] = useState(false)
  const [likeId, setLikeId] = useState(null)
  const [likesCount, setLikesCount] = useState(0)
  const [config, setConfig] = useState()
  
  const url = bookDetails && bookDetails.cover
  const vibrantUrl = bookDetails && `https://cors-anywhere.herokuapp.com/${bookDetails.cover}`

  useEffect(() => {
    setConfig({
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })
  }, [loggedIn])
  
  useEffect(() => {
    const vibrant = new Vibrant(vibrantUrl, options)
    isOpen && 
      vibrant.getPalette((err, palette) => {
        const colors = []
        let i = 0
        for (const swatch in palette)
            if (palette.hasOwnProperty(swatch) && palette[swatch]) {
                colors[i] = {color: palette[swatch].getHex(), population: palette[swatch].getPopulation()}
                i++
            }
            colors.sort(function (a, b) {
              return a.population - b.population;
            });
            setGradient(`linear-gradient(${colors[5].color}, ${colors[4].color})`)
            
            if(err) setGradient(theme.gradient.replace('90deg, ', ''))
          })
  }, [theme.gradient, isOpen, vibrantUrl])

  useEffect(() => {
    setLikesCount(bookDetails.likes.length)
    bookDetails.likes.forEach(like => {
      if(like.user === user.id) {
        setLikeId(like.id)
        setLiked(true)
      }
    })
  }, [bookDetails.likes, user.id])

  const postLike = () => {
    console.log('postLike')
    axios.post(`${process.env.REACT_APP_API_URL}/likes`, {
      book: bookDetails,
      user
    }, config).then(response => {
        setLikesCount(likesCount + 1)
        setLikeId(response.data.id)
        setLiked(true)
        dispatch(getBooks())
      })
      .catch(err => console.log(err.response))
  }

  const deleteLike = (id) => {
    console.log('deleteLike')
    axios.delete(`${process.env.REACT_APP_API_URL}/likes/${id}`, config)
    .then(() => {
        setLikesCount(likesCount - 1)
        setLiked(false)
        dispatch(getBooks())
      })
  }

  const handleLike = () => {
    loggedIn ? 
      liked ? deleteLike(likeId) : postLike()
      : dispatch(openLoginModal())
  }

  return (
    <AnimatePresence>
      {isOpen &&
        <>
          <Container
              liked={liked}
              darkTheme={darkTheme} 
              gradient={gradient} 
              initial={{opacity: 0, y: 100, translateX: '-50%', translateY: '-50%'}}
              animate={{opacity: 1, y: 0, translateX: '-50%', translateY: '-50%', transition: {duration: 0.4}}}
              exit={{opacity: 0, transition: {duration: 0.3}}}
            >
            <GoBack />
            <div className="img">
              <img src={url} alt="img"/>
              <WishIcon /> 
            </div>
            <div>
              <h2>{bookDetails.title}</h2>
              <p>by {bookDetails.author}</p>

              <article>{bookDetails.description}</article>
              <hr />

              <span>Recommended by <u>{bookDetails.user.username}</u></span>
              <div className="heart" onClick={handleLike}>
                <Heart liked={liked} /> {likesCount > 0 && likesCount}
              </div>
              <br />

              <ul>
                {bookDetails.image.map(image => {
                  return <li key={image.id}><img src={process.env.REACT_APP_API_URL + image.url} alt={image.name} /></li>
                })}
              </ul>

              <h4>Comments:</h4>
              {
                bookDetails.comments.map(comment => {
                  return (
                    <Comment key={comment.id} comment={comment} />
                  )
                })
              }

              <AddComment book={bookDetails} />

            </div>
          </Container>
          <Bg 
            onClick={() => dispatch(closeModal())}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0, transition: {duration: 0.3}}}/>
        </>}
    </AnimatePresence>
  )
}

const Container = styled(motion.div)`
  position: fixed;
  top: calc(50% + 50px);
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 80vw;
  height: 80vh;
  background: ${({theme}) => theme.background};
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.6);
  z-index: 500;
  border-radius: 15px;
  overflow: hidden;
  padding: 5% 5% 5% 27%;
  color: ${({theme}) => theme.textColor};
  font-size: 18px;
  line-height: 1.7;
  font-weight: 400;

  ul {
    li {
      overflow: hidden;
      border-radius: 5px;
      box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
      width: 120px;
      height: 120px;
      display: inline-block;
      margin-right: 18px;
      
      img {
        width: 120px;
        height: 120px;
        object-fit: cover;
      }
    }
  }

  @media only screen and (max-width: 600px) {
    width: 100vw;
    top: 50%;
    height: 100%;
    border-radius: 0;
    padding: 45% 3% 3% 3%;
    font-size: 14px;
  }

  h2 {
    font-weight: 500;
    font-size: 35px;
    margin-bottom: 10px;

    @media only screen and (max-width: 600px) {
      font-size: 20px;
      margin-bottom: 5px;
    }
  }

  p {
    opacity: 0.8;
    margin-bottom: 20px;

    @media only screen and (max-width: 600px) {
      margin-bottom: 5px;
    }
  }

  &>div:last-of-type {
    overflow-y: scroll;
    height: 100%;
    padding-right: 10px;

    .heart {
      /* position:absolute; */
      bottom: 20px;
      left: 22%;
      display: flex;
      align-items: center;
      font-size: 12px;

      svg {
        margin-right: 5px;
        position: relative;
        z-index: 5;
      }
    }

    hr {
      margin: 25px 0;
      border: 0;
      opacity: 0.5;
      border-bottom: 0.5px solid ${({theme, darkTheme}) => darkTheme ? theme.secondary : theme.primary};
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

    &::-webkit-scrollbar-track {
    }

    &::-webkit-scrollbar-thumb {
        transition: 0.5s;
        border-radius: 5px;
        background: ${({darkTheme}) => darkTheme ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' };
    }
  }

  &>div>span {
    display: block;
    margin-bottom: 25px;
    font-size: 14px;

    u {
      color: ${({theme, darkTheme}) => darkTheme ? theme.secondary : theme.primary}
    }

    @media only screen and (max-width: 600px) {
      margin-bottom: 5px;
    }
  }

  .img {
    position: absolute;
    left: 10%;
    top: 50%;
    transform: translateY(-50%);
    width: 20%;
    box-shadow: 0 0 25px rgba(0, 0, 0, 0.6);
    
    img {
      display: block;
      width: 100%;
      position: relative;
    }

    svg {
      position: absolute;
      bottom: 0;
      right: 20px;
      z-index: -1;
      transform: ${({liked}) => liked ? 'translateY(60%)' : 'translateY(0)'};
      transition: transform 0.3s;
    }

    @media only screen and (max-width: 600px) {
      top: 20px;
      left: auto;
      right: 20px;
      width: 25%;
      transform: none;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.6);

      svg {
        width: 20px;
        right: 5px;
        transform: ${({liked}) => liked ? 'translateY(55%)' : 'translateY(0)'};
      }
    }
  }

  &:before {
    position: absolute;
    content: '';
    top: -1px;
    left: -1px;
    bottom: -1px;
    width: 25%;
    background: ${({gradient}) => gradient};

    @media only screen and (max-width: 600px) {
      right: -1px;
      bottom: auto;
      width: auto;
      height: 110px;
      background: ${({gradient}) => gradient};
      background: ${({gradient}) => [gradient.slice(0, 16), '170deg, ', gradient.slice(16)].join('')};
    }
  }
`

const Bg = styled(motion.div)`
  position: fixed;
  top: 70px;
  bottom: -20vh;
  left: -20vw;
  right: -20vw;
  background: rgba(0, 0, 0, 0.9);
  z-index: 300;
`