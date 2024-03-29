import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import Search from "../components/Search";
import { Word } from "../components/Word";



export const Home = () => {
  const [word, setWord] = useState({});

  const startSearch = (newWord) => {
    setWord({name: newWord, random: false});
  };

  async function getRandom() {
    const responce = await fetch(
      `https://random-word-api.vercel.app/api?words=1`
    );

    const data = await responce.json();
    setWord({name: data[0], random: true});
  }

  useEffect(() => {
    getRandom();
  }, []);

  return (
    <Container>
      <Search startSearch={startSearch} />
      <Word word={word.name} random={word.random}/>
    </Container>
  );
};


const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 1.5rem;

  width: 100%;
`

