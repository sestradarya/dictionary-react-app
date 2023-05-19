import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Search from "../components/Search";
import saveGrayImage from "../images/save-gray.png";
import saveRedImage from "../images/save-red.png"

export const Word = () => {
  const [searchedWord, setSearchedWord] = useState([]);
  //   const [randomWord, setRandomWord] = useState('')
  const [saved, setSaved] = useState([]);

  const params = useParams();

  const getSearched = async (name) => {
    const responce = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${name}`
    );

    if (responce.ok) {
      const data = await responce.json();
      setSearchedWord(data);
    } else setSearchedWord([]);
  };

  const saveWord = () => {
    setSaved(prev => [searchedWord[0].word, ...prev])
  }

  const deleteWord = () => {
    setSaved(prev => prev.filter((el, i) => el !== searchedWord[0].word))
  }

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

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("savedWords"));
    if (items) {
      setSaved(items);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("savedWords", JSON.stringify(saved));
  }, [saved]);

  return (
    <div>
      {/* <p>{randomWord}</p> */}

      {searchedWord[0] ? (
        <>
          <p>{searchedWord[0].word}</p>
          {saved.includes(searchedWord[0].word)?
          (<img src={saveRedImage} alt="" onClick={deleteWord}/>)
          :(<img src={saveGrayImage} alt="" onClick={saveWord}/>)
          }
        </>
      ) : (
        <p>{"not found"}</p>
      )}
    </div>
  );
};
// Here we must return our card structure with
// information about a word. Main information
