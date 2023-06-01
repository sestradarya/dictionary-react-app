import React from 'react'

export const WordDefinition = (props) => {
  return (
    <div>
        <p>{props.definition.definitions[0].definition}</p>
    </div>
  )
}
