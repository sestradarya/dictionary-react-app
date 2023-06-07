import React from "react";
import styled from "styled-components";

export const WordDefinition = (props) => {
  const { definitions, synonyms, antonyms } = props.meanings;

  return (
    <Definition>
      <div className="definitions">
        <h4>DEFINITIONS {definitions.length}</h4>
        {definitions.map((def) => (
          <div key={def.definition} className="definition">
            <div className="meaning">
              <h5>Meaning</h5>
              <p>{def.definition}</p>
            </div>
            {def.example && (
              <div className="example">
                <h5>Examples</h5>
                <p>{def.example}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {synonyms.length ? (
        <div className="synonyms">
          <h4>SYNONYMS {synonyms.length}</h4>
          {synonyms.map(syn => <p key={syn}>{syn}</p>)}
        </div>
      ) : null}

      {antonyms.length ? (
        <div className="antonyms">
          <h4>ANTONYMS {antonyms.length}</h4>
          {antonyms.map(ant => <p key={ant}>{ant}</p>)}
        </div>
      ) : null}
    </Definition>
  );
};

const Definition = styled.div`
  background-color: #eba7a7;
  box-sizing: border-box;
  padding: 10px;
  margin-top: 20px;
  border-radius: 8px;
  width: 100%;

  @media(min-width: 715px){
    width: 560px;
  }



  .definition {
    margin: 10px;
    background-color: white;
    border-radius: 8px;
  }

  .definitions h4{
    font-size: .9rem;
    text-align: start;
  }
`;
