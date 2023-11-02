import memesData from "../../module2/data/memesData";

export default function Form(): React.ReactNode {

  /**
     * Challenge: Get a random image from the `memesData` array
     * when the "new meme image" button is clicked.
     * 
     * Log the URL of the image to the console. (Don't worry
     * about displaying the image yet)
     */

  function getMemeImage(): void {
    const memesArray = memesData.data.memes;
    const randomNumber = Math.floor(Math.random() * memesArray.length);

    console.log(memesArray[randomNumber].url);
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
      </div>
    </main>
  );
}