import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Search from "../components/Search";

export const Word = () => {
  const [searchedWord, setSearchedWord] = useState([]);
//   const [randomWord, setRandomWord] = useState('')

  const params = useParams();

  const getSearched = async (name) => {
    const responce = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${name}`
    );

    if (responce.ok) {
      const data = await responce.json();
      setSearchedWord(data);
    } else setSearchedWord([])
  };

//   const getRandom = async () => {
//     const responce = await fetch(`https://random-word-api.vercel.app/api?words=1`)

//     const data = await responce.json()
//     setRandomWord(data)
//     // navigate('word/' + randomWord)
//   }

  useEffect(() => {
    if (params.name) {
      getSearched(params.name);
    }
  }, [params.name]);

//   useEffect(() => {
//     getRandom()
    
//   }, [])

  return (
    <div>
        {/* <p>{randomWord}</p> */}
        {
            
            searchedWord[0] ? 
                <p>{searchedWord[0].word}</p>
                :<p>{'not found'}</p>
        }
      
    </div>
  );
};
// Here we must return our card structure with
// information about a word. Main information
