import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Search from "../components/Search";
import { Word } from "./Word";

export const Home = () => {
  const [word, setWord] = useState('')

  const startSearch = (newWord) => {
    setWord(newWord)
  }


  return (
    <div>
      <Search startSearch={startSearch}/>
      <Word word={word}/>
    </div>
  );
};

