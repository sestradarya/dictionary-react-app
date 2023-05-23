import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Word } from "./Word";

export const Dictionary = () => {
  const [saved, setSaved] = useState([]);

  const [currentTab, setCurrentTab] = useState('dictionary')


  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("savedWords"));
    if (items) {
      setSaved(items);
    }
    console.log(saved);
  }, []);

  const renderWord = (word) => {
    setCurrentTab(word)
  };

  return (
    <div>
      <h2>My Dictionary</h2>
      {currentTab === 'dictionary'? saved.map((word) => (
        <Box key={word} onClick={() => {renderWord(word)}}>
            <h4>{word}</h4>
        </Box>
      )): <Word word={currentTab}/>}
      
    </div>
  );
};

const Box = styled.div``;

