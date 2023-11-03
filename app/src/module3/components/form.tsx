import React, { Dispatch, SetStateAction, useState } from "react";
// import memesData from "../../module3/data/memesData";

export default function Form(): React.ReactNode {

  /**
   * Challenge: 
   * As soon as the Meme component loads the first time,
   * make an API call to "https://api.imgflip.com/get_memes".
   * 
   * When the data comes in, save just the memes array part
   * of that data to the `allMemes` state
   * 
   * Think about if there are any dependencies that, if they
   * changed, you'd want to cause to re-run this function.
   * 
   * Hint: for now, don't try to use an async/await function.
   * Instead, use `.then()` blocks to resolve the promises
   * from using `fetch`. We'll learn why after this challenge.
   */


  const [allMemes, setAllMeme]: [
    {
      id: string;
      name: string;
      url: string;
      width: number;
      height: number;
      box_count: number;
    }[] | [], Dispatch<SetStateAction<{
      id: string;
      name: string;
      url: string;
      width: number;
      height: number;
      box_count: number;
    }[]>> | Dispatch<SetStateAction<[]>>
  ] = useState([]);

  const [meme, setMeme]: [
    { topText: string, bottomText: string, randomImg: string },
    Dispatch<SetStateAction<{ topText: string, bottomText: string, randomImg: string }>>
  ] = useState({
    topText: "",
    bottomText: "",
    randomImg: "http://i.imgflip.com/1bij.jpg"
  });

  React.useEffect(function () {
    console.log("Effect ran")
    fetch("https://api.imgflip.com/get_memes")
      .then(res => res.json())
      .then(data => { console.log(data); setAllMeme(data.data.memes); })
  }, []);


  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value }: { name: string, value: string } = event.target;
    setMeme((prevMemeData) => ({
      ...prevMemeData,
      [name]: value
    }));
  }

  function getMemeImage(): void {
    const randomNumber: number = Math.floor(Math.random() * allMemes.length);

    setMeme((prevObj) => ({
      ...prevObj,
      randomImg: allMemes[randomNumber].url
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