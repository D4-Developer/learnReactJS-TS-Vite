import React, { Dispatch, SetStateAction, useState } from "react";
import memesData from "../../module2/data/memesData";

export default function Form(): React.ReactNode {

  /**
   * Challenge: Save the random meme URL in state
   * - Create new state called `memeImage` with an
   *   empty string as default
   * - When the getMemeImage function is called, update
   *   the `memeImage` state to be the random chosen
   *   image URL
   * - Below the div.form, add an <img /> and set the
   *   src to the new `memeImage` state you created
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

  const [memeImageUrl, setMemeImageUrl]: [string, Dispatch<SetStateAction<string>>] = useState(memesArray[randomNumber].url);

  function getMemeImage(): void {
    randomNumber = Math.floor(Math.random() * memesArray.length);
    setMemeImageUrl(memesArray[randomNumber].url);
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
        <img src={memeImageUrl} className="memeImg" />
      </div>
    </main>
  );
}