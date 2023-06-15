import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import saveClearImage from "../images/save-clear.png";
import saveBlueImage from "../images/save-blue.png";
import soundIcon from "../images/sound.png";
import styled from "styled-components";
import { WordDefinition } from "./WordDefinition";
import { useRef } from "react";

export const Word = (props) => {
  const [searchedWord, setSearchedWord] = useState({});
  const [saved, setSaved] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const getSearched = async (name) => {
    setLoading(true);
    const responce = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${name}`
    );

    if (responce.ok) {
      const data = await responce.json();
      setLoading(false);
      setSearchedWord(data[0]);
      setNotFound(false)
    } else {
      setSearchedWord({});
      setNotFound(true);
    }
  };

  const saveWord = () => {
    setSaved((prev) => [searchedWord.word, ...prev]);
  };

  const deleteWord = () => {
    setSaved((prev) => prev.filter((el, i) => el !== searchedWord.word));
  };

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

  const audioRef = useRef(null);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <>
      {notFound? <StartCard>
          <div class="bg">
            <div>
              <p>
                Nothing found <span> Please, change a request</span>
              </p>
            </div>
          </div>
          <div class="blob"></div>
        </StartCard>:
      Object.keys(searchedWord).length ? (
        loading === false ? (
          <Card>
            {props.random && (
              <button className="random-badge">Word of the day</button>
            )}
            <div className="name">
              <h2>{searchedWord.word}</h2>
              {saved.includes(searchedWord.word) ? (
                <img src={saveBlueImage} alt="" onClick={deleteWord} />
              ) : (
                <img src={saveClearImage} alt="" onClick={saveWord} />
              )}
            </div>

            {searchedWord.phonetics && searchedWord.phonetics.length ? (
              <div className="phonetics">
                {searchedWord.phonetics.map((phonetic, i) => {
                  if (phonetic.text) {
                    return (
                      <div className="phonetic" key={i}>
                        <p>{phonetic.text}</p>
                        {phonetic.audio ? (
                          <img src={soundIcon} alt="" onClick={playAudio} />
                        ) : (
                          ""
                        )}
                        <audio ref={audioRef} src={phonetic.audio} />
                      </div>
                    );
                  }
                })}
              </div>
            ) : (
              ""
            )}
            <div className="mydict">
              <div>
                {searchedWord.meanings.map((meaning, i) => (
                  <label key={i}>
                    <input
                      type="radio"
                      name="radio"
                      checked={index == i ? true : false}
                      readOnly
                    />
                    <span
                      onClick={() => {
                        setIndex(i);
                      }}
                    >
                      {meaning.partOfSpeech}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            <WordDefinition meanings={searchedWord.meanings[index]} />
          </Card>
        ) : (
          <Loader>
            <div className="justify-content-center jimu-primary-loading"></div>
          </Loader>
        )
      ) : (
        <Loader>
            <div className="justify-content-center jimu-primary-loading"></div>
          </Loader>
      )}
    </>
  );
};

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  gap: 1rem;

  width: 100%;

  .name {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  .name h2 {
    font-family: "Unna", serif;
    font-size: 1.8rem;
    color: #2c2c2c;
  }

  .name img {
    max-height: 30px;
  }

  .name img:hover {
    cursor: pointer;
  }

  .phonetics {
    display: flex;
    gap: 0.6rem;
    flex-wrap: wrap;
  }

  .phonetic {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    color: #12499a;
  }

  .phonetic img {
    max-height: 20px;
  }

  .phonetic img:hover {
    cursor: pointer;
  }

  :focus {
    outline: 0;
    border-color: #1a6dea;
    -webkit-box-shadow: 0 0 0 4px #b5c9fc;
    box-shadow: 0 0 0 4px #b5c9fc;
  }

  .mydict div {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-top: 0.5rem;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
  }

  .mydict input[type="radio"] {
    clip: rect(0 0 0 0);
    -webkit-clip-path: inset(100%);
    clip-path: inset(100%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }

  .mydict input[type="radio"]:checked + span {
    -webkit-box-shadow: 0 0 0 0.0625em #0043ed;
    box-shadow: 0 0 0 0.0625em #0043ed;
    background-color: #1a6dea;
    z-index: 1;
    color: #fff;
  }

  label span {
    display: block;
    cursor: pointer;
    background-color: #fff;
    padding: 0.2em 0.75em;
    position: relative;
    margin-left: 0.0625em;
    -webkit-box-shadow: 0 0 0 0.0625em #b5bfd9;
    box-shadow: 0 0 0 0.0625em #1a6dea;
    letter-spacing: 0.05em;
    color: #1a6dea;
    text-align: center;
    -webkit-transition: background-color 0.5s ease;
    transition: background-color 0.5s ease;
  }

  label:first-child span {
    border-radius: 0.375em 0 0 0.375em;
  }

  label:last-child span {
    border-radius: 0 0.375em 0.375em 0;
  }

  .random-badge {
    position: fixed;
    top: 195px;
    right: 100px;

    padding: 10px 10px;
    font-size: 1rem;
    outline: none;
    border: none;
    border-radius: 10px;
    transition: 0.5s;
    background: #ffffff;
    color: #90e018;
    box-shadow: 0 0 10px #e0e0e0, inset 0 0 10px #e0e0e0;
  }

  .random-badge:hover {
    animation: a 0.5s 1 linear;
  }

  @keyframes a {
    0% {
      transform: scale(0.7, 1.3);
    }

    25% {
      transform: scale(1.3, 0.7);
    }

    50% {
      transform: scale(0.7, 1.3);
    }

    75% {
      transform: scale(1.3, 0.7);
    }

    100% {
      transform: scale(1, 1);
    }
  }

  @media (max-width: 680px) {
    .random-badge {
      right: 0px;
    }
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

// Here we must return our card structure with
// information about a word. Main information
