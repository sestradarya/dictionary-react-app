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
      <div className="words-container">
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
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;

  .words-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    background-color: #e2e2e2;
    padding: 1rem;
  }
`;

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  padding: 0.4rem;
  border-radius: 13px;

  div {
    flex: 1 0 auto;
    display: flex;
    flex-direction: start;
  }

  img {
    max-height: 35px;
  }
`;

// To add an animation on delition
