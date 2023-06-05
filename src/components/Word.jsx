import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import saveClearImage from "../images/save-clear.png";
import saveBlueImage from "../images/save-blue.png";
import soundIcon from "../images/sound.png";
import styled, { createGlobalStyle } from "styled-components";
import { WordDefinition } from "./WordDefinition";
import { useRef } from "react";

export const Word = (props) => {
  const [searchedWord, setSearchedWord] = useState({});
  const [saved, setSaved] = useState([]);
  const [index, setIndex] = useState(0);

  const getSearched = async (name) => {
    const responce = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${name}`
    );

    if (responce.ok) {
      const data = await responce.json();
      setSearchedWord(data[0]);
    } else setSearchedWord({});
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
    <div>
      <GlobalStyle />
      {Object.keys(searchedWord).length ? (
        <Card>
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
                        <img
                          src={soundIcon}
                          alt=""
                          onClick={playAudio}
                        />
                      ) : (
                        ""
                      )}
                      <audio
                        ref={audioRef}
                        src={phonetic.audio}
                      />
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
          <div className="definition">
            <WordDefinition meanings={searchedWord.meanings[index]} />
          </div>
        </Card>
      ) : (
        <p>{"not found"}</p>
      )}
    </div>
  );
};

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Unna:wght@700&display=swap');
`

const Card = styled.div`
  .name {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  .name h2{
    font-family: 'Unna', serif;
    font-size: 2rem;
  }

  .name img {
    max-height: 30px;
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
    padding: 0.375em 0.75em;
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
`;

// Here we must return our card structure with
// information about a word. Main information
