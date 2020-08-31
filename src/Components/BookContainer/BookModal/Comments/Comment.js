import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { openEditCommentModal, openDeleteCommentModal } from '../../../../Store/action/commentActions'

export const Comment = (props) => {
  const darkTheme = useSelector(state => state.themeReducer.darkTheme)
  const theme = useSelector(state => state.themeReducer.themeStyle)
  const id = useSelector(state => state.userReducer.user.id)
  const dispatch = useDispatch()

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
          <div>
            {props.comment}
          </div>
          {
            id === props.userId && (
              <>
                <Edit onClick={() => dispatch(openEditCommentModal(props.commentId)) } >
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 13.002 13.002">
                    <path id="Icon_material-mode-edit" data-name="Icon material-mode-edit" d="M4.5,14.79V17.5H7.208L15.2,9.51,12.488,6.8ZM17.291,7.416a.719.719,0,0,0,0-1.018L15.6,4.708a.719.719,0,0,0-1.018,0L13.261,6.029l2.708,2.708Z" transform="translate(-4.5 -4.496)" fill={darkTheme ? theme.secondary : theme.primary} />
                  </svg>
                </Edit> 
                <Delete onClick={() => dispatch(openDeleteCommentModal(props.commentId))} >
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 21 27">
                    <path id="Icon_material-delete" data-name="Icon material-delete" d="M9,28.5a3.009,3.009,0,0,0,3,3H24a3.009,3.009,0,0,0,3-3v-18H9ZM28.5,6H23.25l-1.5-1.5h-7.5L12.75,6H7.5V9h21Z" transform="translate(-7.5 -4.5)" fill={darkTheme ? theme.secondary : theme.primary} />
                  </svg>
                </Delete>
              </>
            ) 
          }
        </div>
      </Container>
  )
}

const Container = styled.div`
  position: relative;
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

const Delete = styled.button`
  border: 0;
  background: none;
  cursor: pointer;
  position: absolute;
  right: 15px;
  top: 5px;
`

const Edit = styled.button`
  border: 0;
  background: none;
  cursor: pointer;
  position: absolute;
  right: 35px;
  top: 5px;
`