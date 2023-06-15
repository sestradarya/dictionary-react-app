import React from "react";
import styled from "styled-components";

export const WordDefinition = (props) => {
  const { definitions, synonyms, antonyms } = props.meanings;

  return (
    <Definition>
      <div className="definitions">
        <h4>
          DEFINITIONS <span>{definitions.length}</span>
        </h4>
        <div>
          {definitions.map((def) => (
            <div key={def.definition} className="definition">
              <div className="meaning">
                <h5>Meaning</h5>
                <p>{def.definition}</p>
              </div>
              {def.example && <div className="line">
              </div>}
             
              {def.example && (
                <div className="example">
                  <h5>Examples</h5>
                  <p>{def.example}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="syn-ant">
        {synonyms.length ? (
          <div className="synonyms">
            <h4>
              SYNONYMS <span>{synonyms.length}</span>{" "}
            </h4>
            {synonyms.map((syn, i) => (
              <p key={i}>{syn}</p>
            ))}
          </div>
        ) : null}

        {antonyms.length ? (
          <div className="antonyms">
            <h4>
              ANTONYMS <span>{antonyms.length}</span>{" "}
            </h4>
            {antonyms.map((ant, i) => (
              <p key={i}>{ant}</p>
            ))}
          </div>
        ) : null}
      </div>
    </Definition>
  );
};

const Definition = styled.div`
  box-sizing: border-box;
  padding: 10px;
  border-radius: 8px;
  width: 100%;

  @media (min-width: 600px) {
    width: 560px;
  }

  .definitions div{
    display: flex;
    flex-direction: column;

    gap: 1rem;
  }

  .definition {
    padding: 10px;
    background-color: white;
    border-radius: 8px;

    text-align: start;

    
  }

  .meaning{}

  .line{
    background-color: #dcdcdc;
    height: 2px;
    border-radius: 20px; 
  }

  h4 {
    font-size: 1.1rem;
    text-align: start;
    padding: 1rem 0 1rem 0;
    color: #2c2c2c;
  }

  h4 span {
    color: #515151;
    font-size: 1rem;
  }

  h5 {
    color: #2c2c2c;
    font-size: 1rem;

    margin: 0 0 4px 0;
  }

  .syn-ant{
    display: flex;
    justify-content: space-between;

    padding: 1rem;

    text-align: left;
  }
`;
