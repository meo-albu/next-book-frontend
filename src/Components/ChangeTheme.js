import React from 'react'
import styled from 'styled-components'
import {themeColors} from '../Themes/themes'
import {setGreenTheme, setPurpleTheme, setBlueTheme, setOrangeTheme, setPinkTheme} from '../Store/action/themeActions'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'

const buttonVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  }
}

export const ChangeTheme = () => {
  const dispatch = useDispatch()
  const sidebar = useSelector(state => state.sidebarReducer.opened)

  return (
    sidebar &&
    <motion.div
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
        transition={{duration: 1}}
        style={{margin: '10px 0', perspective: '400px'}}
        >
        <motion.span 
          variants={buttonVariants}
          transition={{delay: 0}}>
          <ChangeThemeButton theme={themeColors.greenTheme} onClick={() => dispatch(setGreenTheme())} />
        </motion.span>
        <motion.span 
          variants={buttonVariants}
          transition={{delay: 0.15}}>
          <ChangeThemeButton theme={themeColors.purpleTheme} onClick={() => dispatch(setPurpleTheme())} />
        </motion.span>
        <motion.span 
          variants={buttonVariants}
          transition={{delay: 0.3}}>
          <ChangeThemeButton theme={themeColors.blueTheme} onClick={() => dispatch(setBlueTheme())} />
        </motion.span>
        <motion.span 
          variants={buttonVariants}
          transition={{delay: 0.45}}>
          <ChangeThemeButton theme={themeColors.orangeTheme} onClick={() => dispatch(setOrangeTheme())} />
        </motion.span>
        <motion.span 
          variants={buttonVariants}
          transition={{delay: 0.6}}>
          <ChangeThemeButton theme={themeColors.pinkTheme} onClick={() => dispatch(setPinkTheme())} />
        </motion.span>
    </motion.div>
  )
}

const ChangeThemeButton = styled.span`
  background: ${({theme}) => theme.primary};
  width: 40px;
  height: 40px;
  display: inline-block;
  margin-right: 10px;
  border-radius: 5px;
  box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.1)
  }
`