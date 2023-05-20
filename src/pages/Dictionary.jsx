import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Dictionary = () => {
  const [saved, setSaved] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("savedWords"));
    if (items) {
      setSaved(items);
    }
    console.log(saved);
  }, []);

  const renderWord = (word) => {
    navigate("word/" + word);
  };

  return (
    <div>
      <h2>My Dictionary</h2>
      {saved.map((word) => (
        <Link to={'/word/' + word}>
          <h4
            key={word}
          >
            {word}
          </h4>
        </Link>
      ))}
    </div>
  );
};

