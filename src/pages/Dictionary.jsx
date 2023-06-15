import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { Word } from "../components/Word";
import saveBlueImage from "../images/save-blue.png";

export const Dictionary = () => {
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(false);

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
    setTimeout(() => {
      setCurrentTab(word);
      setLoading(false);
    }, 2000);
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

      {loading === false ? (
        <div className="words-container">
          {currentTab === "dictionary" ? (
            saved.length ? (
              saved.map((word) => (
                <Box key={word}>
                  <div
                    onClick={() => {
                      renderWord(word);
                      setLoading(true);
                    }}
                  >
                    <p>{word}</p>
                  </div>

                  <img
                    src={saveBlueImage}
                    alt=""
                    onClick={() => {
                      deleteWord(word);
                    }}
                  />
                </Box>
              ))
            ) : (
              <div>
                <StartCard>
                  <div class="bg">
                    <div>
                      <p>Start saving words</p>
                    </div>
                  </div>
                  <div class="blob"></div>
                </StartCard>
              </div>
            )
          ) : (
            <Word word={currentTab} />
          )}
        </div>
      ) : (
        <Loader>
          <div className="justify-content-center jimu-primary-loading"></div>
        </Loader>
      )}
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
    /* align-items: center; */
    gap: 1rem;

    padding: 1rem;

    width: 90%;
  }

  .words-container>div {
    display: flex;
    justify-content: center;
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
  padding: 0.6rem;
  border-radius: 13px;

  -webkit-box-sizing: border-box;
  box-sizing: border-box;

  background: rgba(232, 232, 232, 0.58);
  border: 1px solid white;
  -webkit-box-shadow: 12px 17px 51px rgba(0, 0, 0, 0.22);
  box-shadow: 12px 17px 51px rgba(0, 0, 0, 0.22);
  -webkit-backdrop-filter: blur(6px);
  backdrop-filter: blur(6px);
  border-radius: 17px;
  text-align: center;
  cursor: pointer;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  font-weight: bolder;
  color: #333333;

  :hover {
    border: 1px solid #1a6dea;
    -webkit-transform: scale(1.05);
    -ms-transform: scale(1.05);
    transform: scale(1.05);
  }

  :active {
    -webkit-transform: scale(0.95) rotateZ(1.7deg);
    -ms-transform: scale(0.95) rotate(1.7deg);
    transform: scale(0.95) rotateZ(1.7deg);
  }

  div {
    flex: 1 0 auto;
    display: flex;
    flex-direction: start;
  }

  div p {
    font-weight: 700;
    font-size: 1.1rem;
  }

  img {
    max-height: 35px;
  }
`;

const Loader = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  .jimu-primary-loading:before,
  .jimu-primary-loading:after {
    position: absolute;
    top: 0;
    content: "";
  }

  .jimu-primary-loading:before {
    left: -19.992px;
  }

  .jimu-primary-loading:after {
    left: 19.992px;
    -webkit-animation-delay: 0.32s !important;
    animation-delay: 0.32s !important;
  }

  .jimu-primary-loading:before,
  .jimu-primary-loading:after,
  .jimu-primary-loading {
    background: #076fe5;
    -webkit-animation: loading-keys-app-loading 0.8s infinite ease-in-out;
    animation: loading-keys-app-loading 0.8s infinite ease-in-out;
    width: 13.6px;
    height: 32px;
  }

  .jimu-primary-loading {
    text-indent: -9999em;
    margin: auto;
    position: absolute;
    right: calc(50% - 6.8px);
    top: calc(50% - 16px);
    -webkit-animation-delay: 0.16s !important;
    animation-delay: 0.16s !important;
  }

  @-webkit-keyframes loading-keys-app-loading {
    0%,
    80%,
    100% {
      opacity: 0.75;
      -webkit-box-shadow: 0 0 #076fe5;
      box-shadow: 0 0 #076fe5;
      height: 32px;
    }

    40% {
      opacity: 1;
      -webkit-box-shadow: 0 -8px #076fe5;
      box-shadow: 0 -8px #076fe5;
      height: 40px;
    }
  }

  @keyframes loading-keys-app-loading {
    0%,
    80%,
    100% {
      opacity: 0.75;
      -webkit-box-shadow: 0 0 #076fe5;
      box-shadow: 0 0 #076fe5;
      height: 32px;
    }

    40% {
      opacity: 1;
      -webkit-box-shadow: 0 -8px #076fe5;
      box-shadow: 0 -8px #076fe5;
      height: 40px;
    }
  }
`;

const StartCard = styled.div`
  position: relative;
  width: 200px;
  height: 150px;
  border-radius: 14px;
  z-index: 1111;
  overflow: hidden;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;
  box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;

  .bg {
    position: absolute;
    top: 5px;
    left: 5px;
    width: 190px;
    height: 140px;
    z-index: 2;
    background: rgba(255, 255, 255, 0.95);
    -webkit-backdrop-filter: blur(24px);
    backdrop-filter: blur(24px);
    border-radius: 10px;
    overflow: hidden;
    outline: 2px solid white;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .bg p {
    font-size: 1.3rem;
  }

  .bg p span {
    font-style: italic;
    color: #1a6dea;
  }

  .blob {
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background-color: #1a6dea;
    opacity: 1;
    -webkit-filter: blur(12px);
    filter: blur(12px);
    -webkit-animation: blob-bounce 5s infinite ease;
    animation: blob-bounce 5s infinite ease;
  }

  @-webkit-keyframes blob-bounce {
    0% {
      -webkit-transform: translate(-100%, -100%) translate3d(0, 0, 0);
      transform: translate(-100%, -100%) translate3d(0, 0, 0);
    }
    25% {
      -webkit-transform: translate(-100%, -100%) translate3d(100%, 0, 0);
      transform: translate(-100%, -100%) translate3d(100%, 0, 0);
    }
    50% {
      -webkit-transform: translate(-100%, -100%) translate3d(100%, 100%, 0);
      transform: translate(-100%, -100%) translate3d(100%, 100%, 0);
    }
    75% {
      -webkit-transform: translate(-100%, -100%) translate3d(0, 100%, 0);
      transform: translate(-100%, -100%) translate3d(0, 100%, 0);
    }
    100% {
      -webkit-transform: translate(-100%, -100%) translate3d(0, 0, 0);
      transform: translate(-100%, -100%) translate3d(0, 0, 0);
    }
  }

  @keyframes blob-bounce {
    0% {
      -webkit-transform: translate(-100%, -100%) translate3d(0, 0, 0);
      transform: translate(-100%, -100%) translate3d(0, 0, 0);
    }
    25% {
      -webkit-transform: translate(-100%, -100%) translate3d(100%, 0, 0);
      transform: translate(-100%, -100%) translate3d(100%, 0, 0);
    }
    50% {
      -webkit-transform: translate(-100%, -100%) translate3d(100%, 100%, 0);
      transform: translate(-100%, -100%) translate3d(100%, 100%, 0);
    }
    75% {
      -webkit-transform: translate(-100%, -100%) translate3d(0, 100%, 0);
      transform: translate(-100%, -100%) translate3d(0, 100%, 0);
    }
    100% {
      -webkit-transform: translate(-100%, -100%) translate3d(0, 0, 0);
      transform: translate(-100%, -100%) translate3d(0, 0, 0);
    }
  }
`;

// To add an animation on delition
