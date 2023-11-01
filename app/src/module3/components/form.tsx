export default function Form(): React.ReactNode {
  return (
    <main className="main-form">
      <form action="" className="form">
        <input type="text" placeholder="Top text" className="topText" />
        <input type="text" placeholder="Bottom text" className="bottomText" />
        <button className="form-btn">Get a new meme image 🏞️</button>
      </form>
    </main>
  );
}