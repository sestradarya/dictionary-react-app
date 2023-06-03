import React from 'react'
import styled from 'styled-components'

export const WordDefinition = (props) => {
  return (
    <Definition>
        <p>{props.definition.definitions[0].definition}</p>
    </Definition>
  )
}


const Definition  = styled.div`

`