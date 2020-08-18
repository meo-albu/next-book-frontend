import React from 'react'
import { motion } from 'framer-motion'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { closeSidebar } from '../../Store/action/sidebarActions'

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

export const CloseSidebarButton = () => {
  const dispatch = useDispatch()
  const sidebar = useSelector(state => state.sidebarReducer.opened)
  const themeStyle = useSelector(state => state.themeReducer.themeStyle)
  const darkTheme = useSelector(state => state.themeReducer.darkTheme)

  return (
      sidebar &&
      <Container onClick={() => dispatch(closeSidebar())}>
        <svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33">
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
      </Container>
  )
}

const Container = styled.div`
    margin-bottom: 15px;
    width: 30px;

    svg {
      width: 100%;
      cursor: pointer;
      &:hover {
        fill: rgba(255, 255, 255, 0.1);
      }
    }
`