import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const PageButtons = () => {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <Buttons>
      <Link to={"/"}>
        <button
          className={activeTab === "home" ? "active" : ""}
          onClick={() => {
            setActiveTab("home");
          }}
        >
          Home
        </button>
      </Link>

      <Link to={"/dictionary"}>
        <button
          className={activeTab === "dictionary" ? "active" : ""}
          onClick={() => {
            setActiveTab("dictionary");
          }}
        >
          Dictionary
        </button>
      </Link>
    </Buttons>
  );
};

const Buttons = styled.div`
  button {
    padding: 1rem 1rem;
    color: #313131;
    background: white;
    border: 2px solid black;
    font-weight: 600;
  }

  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
`;

export default PageButtons;
