import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Search from "../components/Search";
import { Word } from "../components/Word";



export const Home = () => {
  const [word, setWord] = useState("");

  const startSearch = (newWord) => {
    setWord(newWord);
  };

  async function getRandom() {
    const responce = await fetch(
      `https://random-word-api.vercel.app/api?words=1`
    );

    const data = await responce.json();
    setWord(data[0]);
  }

  useEffect(() => {
    getRandom();
  }, []);

  return (
    <div>
      <Search startSearch={startSearch} />
      <Word word={word} />
    </div>
  );
};
