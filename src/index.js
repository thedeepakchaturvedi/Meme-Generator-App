import React from "react";
import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import Tempelates from "./components/Tempelates";
import Meme from "./components/Meme";
import "./style.css";

const App = () => {
  const [tempelates, setTempelates] = useState([]);
  const [meme, setMeme] = useState(null);

  async function fetchAPI() {
    var res = await fetch("https://api.imgflip.com/get_memes");
    var data = await res.json();
    console.log(data.data.memes);
    setTempelates(data.data.memes);
  }

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <div>
      <h1>Meme Generator App</h1>
      {meme === null ? (
        <Tempelates tempelates={tempelates} setMeme={setMeme} />
      ) : (
        <Meme meme={meme} setMeme={setMeme} />
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
