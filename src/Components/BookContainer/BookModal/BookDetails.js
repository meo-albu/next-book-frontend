import React from 'react'
import styled from 'styled-components'

export const BookDetails = (props) => {
  return (
    <div>
      <Genres>{props.genres}</Genres>
      <H2>{props.title}</H2>
      <p>by {props.author}</p>
      <Description>{props.description}</Description>
    </div>
  )
}

const Genres = styled.p`
  margin-bottom: 30px;
  font-size: 15px;
  font-weight: 600;
  color: ${({theme}) => theme.secondary};

  @media only screen and (max-width: 600px) {
    margin-bottom: 15px;
  }
`

const Description = styled.p`
  font-size: 15px;
  margin-bottom: 40px;

  @media only screen and (max-width: 600px) {
    margin-bottom: 20px;
  }
`

const H2 = styled.h2`
  font-weight: 300;
  font-size: 35px;
  margin-bottom: 5px;
  line-height: 1;

  +p {
    opacity: 0.8;
    margin-bottom: 20px;
    font-size: 15px;
    font-style: italic;
    font-weight: 600;
    color: ${({theme}) => theme.secondary};

    @media only screen and (max-width: 600px) {
      margin-bottom: 15px;
    }
  }

  @media only screen and (max-width: 600px) {
    font-size: 20px;
    margin-bottom: 5px;
  }
`