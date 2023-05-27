import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { Word } from "../components/Word";
import saveBlueImage from "../images/save-blue.png";

export const Dictionary = () => {
  const [saved, setSaved] = useState([]);

  const [currentTab, setCurrentTab] = useState("dictionary");

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("savedWords"));
    if (items) {
      setSaved(items);
    }
    console.log(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("savedWords", JSON.stringify(saved));
  }, [saved]);

  const renderWord = (word) => {
    setCurrentTab(word);
  };

  const deleteWord = (wordName) => {
    setSaved((prev) => prev.filter((el, i) => el !== wordName));
  };

  return (
    <Container>
      <h2>My Dictionary</h2>
      {currentTab === "dictionary" ? (
        saved.map((word) => (
          <Box key={word}>
            <div
              onClick={() => {
                renderWord(word);
              }}
            >
              <p>{word}</p>
            </div>

            <img
              src={saveBlueImage}
              alt=""
              onClick={() => {
                deleteWord(word);
                console.log("hoor");
              }}
            />
          </Box>
        ))
      ) : (
        <Word word={currentTab} />
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
`;

const Box = styled.div`
  display: flex;
  justify-content: space-between;

  div{
    flex: 1 0 auto;
    display: flex;
    flex-direction: start
  }
`;


// To add an animation on delition
