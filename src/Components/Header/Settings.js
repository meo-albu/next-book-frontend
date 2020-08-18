import React from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { openSidebar } from '../../Store/action/sidebarActions'

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

export const Settings = () => {
  const dispatch = useDispatch()
  const themeStyle = useSelector(state => state.themeReducer.themeStyle)

  return (
    <Container onClick={() => dispatch(openSidebar())}>
      <svg xmlns="http://www.w3.org/2000/svg" width="31.236" height="31.236" viewBox="0 0 31.236 31.236">
        <g id="Icon_feather-settings" data-name="Icon feather-settings" transform="translate(-0.5 -0.5)">
          <motion.path 
            variants={svgV}
            initial="hidden"
            animate="visible"
            id="Path_13" data-name="Path 13" d="M25.952,20.1a2.193,2.193,0,0,0,.439,2.419l.08.08a2.659,2.659,0,1,1-3.761,3.761l-.08-.08a2.211,2.211,0,0,0-3.748,1.568v.226a2.658,2.658,0,1,1-5.316,0v-.12a2.193,2.193,0,0,0-1.435-2.007,2.193,2.193,0,0,0-2.419.439l-.08.08A2.659,2.659,0,1,1,5.872,22.71l.08-.08a2.211,2.211,0,0,0-1.568-3.748H4.158a2.658,2.658,0,0,1,0-5.316h.12a2.193,2.193,0,0,0,2.007-1.435,2.193,2.193,0,0,0-.439-2.419l-.08-.08A2.659,2.659,0,1,1,9.527,5.872l.08.08a2.193,2.193,0,0,0,2.419.439h.106A2.193,2.193,0,0,0,13.46,4.384V4.158a2.658,2.658,0,1,1,5.316,0v.12a2.211,2.211,0,0,0,3.748,1.568l.08-.08a2.659,2.659,0,1,1,3.761,3.761l-.08.08a2.193,2.193,0,0,0-.439,2.419v.106a2.193,2.193,0,0,0,2.007,1.329h.226a2.658,2.658,0,1,1,0,5.316h-.12A2.193,2.193,0,0,0,25.952,20.1Z" transform="translate(0 0)" stroke={themeStyle.secondary} stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
          <motion.path 
            variants={svgV}
            initial="hidden"
            animate="visible"
            id="Path_12" data-name="Path 12" d="M21.474,17.487A3.987,3.987,0,1,1,17.487,13.5,3.987,3.987,0,0,1,21.474,17.487Z" transform="translate(-1.369 -1.369)" fill="none" stroke={themeStyle.secondary} stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
        </g>
      </svg>
    </Container>
  )
}

const Container = styled.div`
    svg {
      cursor: pointer;
      &:hover {
        fill: rgba(255, 255, 255, 0.1);
      }
    }
`