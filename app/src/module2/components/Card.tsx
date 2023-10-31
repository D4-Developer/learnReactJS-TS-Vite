export default function Card(props: {
  key: number,
  item: {
    id: number,
    title: string,
    description: string,
    price: number,
    coverImg: string,
    stats: {
      rating: number,
      reviewCount: number
    },
    location: string,
    openSpots: number
  }
}): React.ReactNode {

  let badgeText: string | undefined = undefined;
  if (props.item.openSpots === 0) {
    badgeText = "SOLD OUT"
  } else if (props.item.location === "Online") {
    badgeText = "ONLINE"
  }

  return (
    <section className="card">
      <div className="card-img-container">
        <div>
          <img className="img" src={`./src/module2/assets/${props.item.coverImg}`} />
          {badgeText !== undefined && <div className="card-status"><span>{badgeText}</span></div>}
        </div>
      </div>

      <div className="card-text-container" >
        <img className="star-img" src="./src/module2/assets/star.png" />
        <span> {props.item.stats.rating} </span>
        <span>({props.item.stats.reviewCount}) · {props.item.location}</span>
        <div className="card-text-title">{props.item.title}</div>
        <div >
          <span className="card-text-sub1" >From ${props.item.price} </span>
          <span className="card-text-sub2" >/ person</span>
        </div>
      </div>

    </section>
  );

}