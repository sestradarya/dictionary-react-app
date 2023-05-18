import React from "react";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Search from "../components/Search";
import { Word } from "./Word";

export const Home = () => {


  return (
    <div>
      <Search />
      <Routes>
        <Route path="/word/:name" element={<Word />} />
      </Routes>
      
    </div>
  );
};
