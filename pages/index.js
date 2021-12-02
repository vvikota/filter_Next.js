import Image from "next/image"

const Main = () => (
  <div className="component">
    <aside className="filter">
      <div className="filter__title-wrapper">
        <span className="filter__counter">
          Товаров 143
        </span>
        <h2 className="filter__title">Камеры</h2>
      </div>  
      <div className="filter__range">
        <h4 className="filter__range-title"> Цена, ₽</h4>
        <div className="filter__range-inputs">
          <input type="text" value="0"/>
          <input type="text" value="499 000"/>
        </div>
      </div>
      <div className="filter__checkboxes">
        <h4 className="filter__checkbox-title">Бренды</h4>
        <ul>
          <li>
            <input type="checkbox" id="canon"/>
            <label htmlFor="canon"> Canon</label>
          </li>
          <li>
            <input type="checkbox" id="nikon"/>
            <label htmlFor="nikon">Nikon</label>
          </li>
        </ul>
      </div>
    </aside>
    
    <main className="content">
      <div className="card">
        <span className="card__mark-new">НОВИНКА</span>
        <Image src="/image/image 40.jpg" className="card__img" width="242" height="242" alt="pic"/>
        <div className="card__description">
          <div className="card__title">
            Olympus OM-D E-M5 y
          </div>
          <div className="card__price-wrapper">
            <span className="card__price">
              28 000 ₽
            </span>
            <span className="card__mark">Новое</span>
          </div>
          <div className="card__actions">
            <button className="basket-button">В корзину</button>
            <button className="like-button"></button>
          </div>
        </div>  
      </div>
    </main>
  </div>
)

export default Main