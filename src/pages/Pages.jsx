import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Dictionary } from "./Dictionary";
import { Home } from "./Home";
import { Word } from "./Word";

export const Pages = () => {
  return (
    <Routes>
      <Route path="*" element={<Home />} />
      <Route path="/dictionary" element={<Dictionary />} />
      
    </Routes>
  );
};
