import React from 'react'
import styled from 'styled-components'

export const FilterSection = ({children}) => {
  return (
    <Container>
      {children}
    </Container>
  )
}

const Container = styled.div`
  &>div {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    margin-left: 5px;

    svg {
      margin-right: 10px;
    }

    input {
      background: transparent;
      border: 0;
      color: ${({theme}) => theme.textColor};
    }
  }

  h4 {
    color: ${({theme}) => theme.primary};
    border-bottom: 1px solid ${({theme}) => theme.primary};
    margin-bottom: 10px;
    padding: 5px;
  }

  form div {
    font-size: 13px;
    margin-left: 5px;

    label {
      cursor: pointer;
      display: inline-block;
      padding: 5px 0;
      transition: color 0.2s;
    }

    svg {
      margin-right: 5px;
      fill: ${({theme}) => theme.textColor};

      path {
        transition: fill 0.2s !important;
      }
    }

    input {
      opacity: 0;
      width: 0;
      position: relative;
      font-size: 13px;
      transition: margin-left 0.5s;

      :hover + label {
        color: ${({theme}) => theme.primary};

        svg {
          fill: ${({theme}) => theme.primary};
        }
      }
      
      &:checked {
        margin-left: 10px;
      }

      &:checked + label {
        color: ${({theme}) => theme.primary};

        svg {
          fill: ${({theme}) => theme.primary};
        }
      }
    }
  }
`
