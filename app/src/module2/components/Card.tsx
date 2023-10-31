/*
Challenge: Build the Card component
For now, hard-code in the data (like 
the rating, title, price, etc.)

Notes:
- Only render 1 instance (I already did this for you)
- The star icon and photo (katie-zaferes.png) are in the images 
  folder for your use
- Make sure to include:
    - image
    - star icon (star.png), rating, and review count
    - title
    - cost/person
- The main purpose of this challenge is to show you where our limitations
  currently are, so don't worry about the fact that you're hard-coding all
  this data into the component.
*/


export default function Card(): React.ReactNode {
  return (
    <section className="card">

      <div className="card-img-container">
        <div>
          <img className="img" src="./src/module2/assets/katie-zaferes.png" />
          <div className="card-status"><span>SOLD OUT</span></div>
        </div>
      </div>

      <div className="card-text-container" >
        <img className="star-img" src="./src/module2/assets/star.png" />
        <span> 5.0 </span>
        <span>(6) · USA</span>
        <div className="card-text-title">Life lessons with Katie Zaferes</div>
        <div >
          <span className="card-text-sub1" >From $136 </span>
          <span className="card-text-sub2" >/ person</span>
        </div>
      </div>

    </section>
  );
}