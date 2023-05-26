import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Search = ({ startSearch }) => {
  const [input, setInput] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
    startSearch(input);
  };

  return (
    <Form onSubmit={submitHandler}>
      <svg class="icon" aria-hidden="true" viewBox="0 0 24 24">
        <g>
          <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
        </g>
      </svg>
      <input
        onChange={(e) => {
          setInput(e.target.value);
        }}
        placeholder="Search"
        type="search"
        class="input"
        value={input}
      />
    </Form>
  );
};

const Form = styled.form`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  line-height: 28px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  position: relative;
  max-width: 190px;

  .input {
    width: 100%;
    height: 40px;
    line-height: 28px;
    padding: 0 1rem;
    padding-left: 2.5rem;
    border: 2px solid transparent;
    border-radius: 8px;
    outline: none;
    background-color: #f3f3f4;
    color: #0d0c22;
    -webkit-transition: 0.3s ease;
    transition: 0.3s ease;
  }

  .input::-webkit-input-placeholder {
    color: #9e9ea7;
  }

  .input::-moz-placeholder {
    color: #9e9ea7;
  }

  .input:-ms-input-placeholder {
    color: #9e9ea7;
  }

  .input::-ms-input-placeholder {
    color: #9e9ea7;
  }

  .input::placeholder {
    color: #9e9ea7;
  }

  .input:focus,
  input:hover {
    outline: none;
    border-color: #1a6dea;
    background-color: #fff;
    -webkit-box-shadow: 0 0 0 4px #1a6dea1c;
    box-shadow: 0 0 0 4px #1a6dea1c;
  }

  .icon {
    position: absolute;
    left: 1rem;
    fill: #1a6dea;
    width: 1rem;
    height: 1rem;
  }
`;

export default Search;
