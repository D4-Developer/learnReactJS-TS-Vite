import React, { Dispatch, SetStateAction, useState } from "react";
import memesData from "../../module2/data/memesData";

export default function Form(): React.ReactNode {

  /**
   * Challenge: Update our state to save the meme-related
   * data as an object called `meme`. It should have the
   * following 3 properties:
   * topText, bottomText, randomImage.
   * 
   * The 2 text states can default to empty strings for now,
   * amd randomImage should default to "http://i.imgflip.com/1bij.jpg"
   * 
   * Next, create a new state variable called `allMemeImages`
   * which will default to `memesData`, which we imported above (not implementing this for now)
   * 
   * Lastly, update the `getMemeImage` function and the markup 
   * to reflect our newly reformed state object and array in the
   * correct way.
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
        <input type="text" placeholder="Top text" className="topText" />
        <input type="text" placeholder="Bottom text" className="bottomText" />
        <button
          className="form-btn"
          onClick={getMemeImage} >
          Get a new meme image 🏞️
        </button>
        <img src={meme.randomImg} className="memeImg" />
      </div>
    </main>
  );
}