import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import saveGrayImage from "../images/save-gray.png";
import saveRedImage from "../images/save-red.png"

export const Word = (props) => {
  const [searchedWord, setSearchedWord] = useState([]);
  const [saved, setSaved] = useState([]);


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

 

  useEffect(() => {
    if (props.word) {
      getSearched(props.word);
    }
  }, [props.word]);


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

      {searchedWord[0] ? (
        <>
          <h3>{searchedWord[0].word}</h3>
          <p>{searchedWord[0].meanings[0].definitions[0].definition}</p>
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
