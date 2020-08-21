import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

export const Comment = (props) => {
  const darkTheme = useSelector(state => state.themeReducer.darkTheme)
  const theme = useSelector(state => state.themeReducer.themeStyle)

  return (
      <Container darkTheme={darkTheme}>
        <Image>
        <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 27.471 27.471">
          <path id="Icon_awesome-user-circle" data-name="Icon awesome-user-circle" d="M13.735.563A13.735,13.735,0,1,0,27.471,14.3,13.733,13.733,0,0,0,13.735.563Zm0,5.317a4.874,4.874,0,1,1-4.874,4.874A4.874,4.874,0,0,1,13.735,5.879Zm0,19.052a10.613,10.613,0,0,1-8.114-3.777,6.175,6.175,0,0,1,5.455-3.312,1.355,1.355,0,0,1,.393.061,7.333,7.333,0,0,0,2.265.382A7.305,7.305,0,0,0,16,17.9a1.355,1.355,0,0,1,.393-.061,6.175,6.175,0,0,1,5.455,3.312A10.613,10.613,0,0,1,13.735,24.932Z" transform="translate(0 -0.563)" fill={darkTheme ? theme.primary : theme.secondary}/>
        </svg>
        </Image>
        <div>
          <span>{props.user}</span> <i>- {props.date.substring(0, 10)} | {props.date.substring(11, 16)}</i> 
          <br /> 
          {props.comment}
        </div>
      </Container>
  )
}

const Container = styled.div`
  font-size: 14px;
  margin-bottom: 0 !important;
  margin-left: 5px;
  padding-bottom: 10px !important;
  display: flex;
  align-items: center;

  span {
    color: ${({theme, darkTheme}) => darkTheme ? theme.secondary : theme.primary};
    font-size: 0.8em;
  }

  i {
    opacity: 0.7;
  }
`

const Image = styled.div`
  width: 33px;
`