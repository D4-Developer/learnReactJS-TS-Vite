import React, { Dispatch, SetStateAction, useState } from "react";
import memesData from "../../module2/data/memesData";

export default function Form(): React.ReactNode {

  /**
   * Challenge: 
   * 1. Set up the text inputs to save to
   *    the `topText` and `bottomText` state variables.
   * 2. Replace the hard-coded text on the image with
   *    the text being saved to state.
   */

  const memesArray: {
    id: string;
    name: string;
    url: string;
    width: number;
    height: number;
    box_count: number;
  }[] = memesData.data.memes;
  let randomNumber: number = Math.floor(Math.random() * memesArray.length);

  const [meme, setMeme]: [
    { topText: string, bottomText: string, randomImg: string },
    Dispatch<SetStateAction<{ topText: string, bottomText: string, randomImg: string }>>
  ] = useState({
    topText: "",
    bottomText: "",
    randomImg: memesArray[randomNumber].url
  });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value }: { name: string, value: string } = event.target;
    setMeme((prevMemeData) => ({
      ...prevMemeData,
      [name]: value
    }));
  }

  function getMemeImage(): void {
    randomNumber = Math.floor(Math.random() * memesArray.length);
    setMeme((prevObj) => ({
      ...prevObj,
      randomImg: memesArray[randomNumber].url
    }));
  }

  return (
    <main className="main-form">
      <div className="form">
        <input
          type="text"
          placeholder="Top text"
          className="topText"
          name="topText"
          value={meme.topText}
          onChange={handleChange} />
        <input
          type="text"
          placeholder="Bottom text"
          className="bottomText"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange} />
        <button
          className="form-btn"
          onClick={getMemeImage} >
          Get a new meme image 🏞️
        </button>

        <div className="meme">
          <img src={meme.randomImg} className="memeImg" />
          <h2 className="meme-text top">{meme.topText}</h2>
          <h2 className="meme-text bottom">{meme.bottomText}</h2>
        </div>
      </div>
    </main>
  );
}