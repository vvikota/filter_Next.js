import Image from "next/image"
import image40 from "../public/image/image 40.jpg"

const Card = ({title, price, isNew, isSecondHand, imageSrc}) => {
  const refactPrice = price.split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ")

  const myLoader = () =>  `${imageSrc.desktop.webp_x1}`

  return (
  <div className="card">
    {isNew ?  <span className="card__mark-new">НОВИНКА</span> : null}
    
    <Image
      src={image40}
      className="card__img"
      width={242}
      height={242}
      alt="pic"
      placeholder="blur"
      loader={myLoader}
    />
    <div className="card__description">
      <div className="card__title">
        {title}
      </div>
      <div className="card__price-wrapper">
        <span className="card__price">
          {refactPrice} ₽
        </span>
        <span className="card__mark">
          {isSecondHand ? '' : 'Новое'}
        </span>
      </div>
      <div className="card__actions">
        <button className="basket-button">В корзину</button>
        <button className="like-button"></button>
      </div>
    </div>  
  </div>
)}


export default Card