export default function Card(props: {
  img: string,
  rating: number,
  reviewCount: number
  location: string
  title: string,
  price: number,
  openSpots: number
}): React.ReactNode {
  let badgeText: string | undefined = undefined;
  if (props.openSpots === 0) {
    badgeText = "SOLD OUT"
  } else if (props.location === "Online") {
    badgeText = "ONLINE"
  }

  return (
    <section className="card">
      <div className="card-img-container">
        <div>
          <img className="img" src={`./src/module2/assets/${props.img}`} />
          {badgeText !== undefined && <div className="card-status"><span>{badgeText}</span></div>}
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