import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { Dictionary } from "./Dictionary";
import { Home } from "./Home";

export const Pages = () => {
  return (
    <Container>
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/dictionary" element={<Dictionary />} />
      </Routes>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;

  max-width: 780px;
  
`
