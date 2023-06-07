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
      {currentTab === "dictionary" ? (
        <button
          className="cssbuttons-io-button simple"
          onClick={() => {
            setCurrentTab("dictionary");
          }}
        >
          My Dictionary
        </button>
      ) : (
        <button
          className="cssbuttons-io-button"
          onClick={() => {
            setCurrentTab("dictionary");
          }}
        >
          {" "}
          My Dictionary
          <div className="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-arrow-left"
              viewBox="0 0 16 16"
            >
              {" "}
              <path
                fill-rule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
              />{" "}
            </svg>
          </div>
        </button>
      )}

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
  width: 100vw;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;

  .words-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    background-color: #e2e2e2;
    padding: 1rem;

    width: 90%;
  }

  .cssbuttons-io-button {
    width: 55%;
    background: #1a6dea;
    color: white;
    font-family: inherit;
    padding: 0.35em;
    padding-left: 1.2em;
    font-size: 1.05rempx;
    font-weight: 500;
    border-radius: 0.9em;
    border: none;
    letter-spacing: 0.05em;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-shadow: inset 0 0 1.6em -0.6em #714da6;
    box-shadow: inset 0 0 1.6em -0.6em #714da6;
    overflow: hidden;
    position: relative;
    height: 2.8em;
    padding-right: 3.3em;
  }

  .cssbuttons-io-button .icon {
    background: white;
    margin-left: 1em;
    position: absolute;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    height: 2.2em;
    width: 2.2em;
    border-radius: 0.7em;
    -webkit-box-shadow: 0.1em 0.1em 0.6em 0.2em #7b52b9;
    box-shadow: 0.1em 0.1em 0.6em 0.2em #7b52b9;
    right: 0.3em;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
  }

  .cssbuttons-io-button:hover .icon {
    width: calc(100% - 0.6em);
  }

  .cssbuttons-io-button .icon svg {
    width: 1.1em;
    -webkit-transition: -webkit-transform 0.3s;
    transition: -webkit-transform 0.3s;
    transition: transform 0.3s;
    transition: transform 0.3s, -webkit-transform 0.3s;
    color: #7b52b9;
  }

  .cssbuttons-io-button:hover .icon svg {
    -webkit-transform: translateX(0.1em);
    -ms-transform: translateX(0.1em);
    transform: translateX(0.1em);
  }

  .cssbuttons-io-button:active .icon {
    -webkit-transform: scale(0.95);
    -ms-transform: scale(0.95);
    transform: scale(0.95);
  }
  .cssbuttons-io-button.simple {
    padding-right: 0em;
    width: 40%;
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
