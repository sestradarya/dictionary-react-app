import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

export const Word = () => {

    const [searchedWord, setSearchedWord] = useState('')

    const params = useParams()

    const getSearched = async (name) => {
        const responce = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${name}`)

        const data = await responce.json()

        console.log(data)
    }

    useEffect(() => {
        getSearched(params.name)
    }, [params.name])



  return (
    <div>
        
    </div>
  )
}
 // Here we must return our card structure with
 // information about a word. Main information