import React from 'react'
import { useState } from 'react'
import {useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Search = () => {

    const [input, setInput] = useState('')
    const navigate = useNavigate()

    const submitHandler = (event) => {
        event.preventDefault();
        navigate('word/' + input)
    }

  return (
    <Form onSubmit={submitHandler}>
      <input type="text" value={input} onChange={(e) => {setInput(e.target.value)}}/>
    </Form>
  )
}

const Form = styled.form`
    margin: 1rem 20rem 2rem;
    position: relative;

  input {
    border: none;
    background: linear-gradient(35deg, #494949, #313131);
    font-size: 1.2rem;
    color: white;
    padding: 1rem 2rem;
    border: none;
    border-radius: 2rem;
    outline: none;
    width: 100%;
  }
  svg {
    position: absolute;
    top: 50%;
    left: -1%;
    transform: translate(100%, -50%);
    color: white;
  }
`



export default Search
