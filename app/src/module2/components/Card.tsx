export default function Card(props: {
  img: string,
  rating: number,
  reviewCount: number
  location: string
  title: string,
  price: number,
}): React.ReactNode {
  return (
    <section className="card">

      <div className="card-img-container">
        <div>
          <img className="img" src={`./src/module2/assets/${props.img}`} />
          <div className="card-status"><span>SOLD OUT</span></div>
        </div>
      </div>

      <div className="card-text-container" >
        <img className="star-img" src="./src/module2/assets/star.png" />
        <span> {props.rating} </span>
        <span>({props.reviewCount}) · {props.location}</span>
        <div className="card-text-title">{props.title}</div>
        <div >
          <span className="card-text-sub1" >From ${props.price} </span>
          <span className="card-text-sub2" >/ person</span>
        </div>
      </div>

    </section>
  );
}