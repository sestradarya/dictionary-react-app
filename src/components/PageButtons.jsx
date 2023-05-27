import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useHref, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

const PageButtons = () => {
  const [activeTab, setActiveTab] = useState("home");

  const navigate = useNavigate();
  const params = useHref();

  useEffect(() => {
    setActiveTab(params === "/dictionary" ? "dictionary" : "home");
  }, [params]);

  const changeTab = (tabName) => {
    setActiveTab(tabName);
    navigate(`/${tabName}`);
  };

  return (
    <Buttons>
      <label
        className="radio"
        onClick={() => {
          changeTab("home");
        }}
      >
        <input
          type="radio"
          name="radio"
          checked={activeTab === "home"}
          onChange={() => {}}
        />
        <span className="name">Home</span>
      </label>
      <label
        className="radio"
        onClick={() => {
          changeTab("dictionary");
        }}
      >
        <input
          type="radio"
          name="radio"
          checked={activeTab === "dictionary"}
          onChange={() => {}}
        />
        <span className="name">Dictionary</span>
      </label>
    </Buttons>
  );
};

const Buttons = styled.div`
  position: relative;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  gap: 0.5rem;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  border-radius: 0.5rem;
  background-color: #eee;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-box-shadow: 0 0 0px 1px rgba(0, 0, 0, 0.06);
  box-shadow: 0 0 0px 1px rgba(0, 0, 0, 0.06);
  padding: 0.25rem;
  width: 300px;
  font-size: 14px;

  .radio {
    -webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    text-align: center;
  }

  .radio input {
    display: none;
  }

  .radio .name {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    cursor: pointer;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    border-radius: 0.5rem;
    border: none;
    padding: 0.5rem 2rem;
    color: rgba(51, 65, 85, 1);
    -webkit-transition: all 0.15s ease-in-out;
    transition: all 0.15s ease-in-out;
  }

  .radio input:checked + .name {
    background-color: #1a6dea;
    font-weight: 600;
    color: white;
  }
`;

export default PageButtons;
