import { useState, useEffect } from "react";
import Card from "../components/Card"

const Main = () => {

  const [minPrice, setMinPrice] = useState('0')
  const [maxPrice, setMaxPrice] = useState('79000')
  const [canonFilter, setCanonFilter] = useState(false)
  const [nikonFilter, setNikonFilter] = useState(false)
  const [responseData, setFilterData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const brandSFilterValue = () => {
        
        if(canonFilter === nikonFilter) {
          return ''
        } else if (canonFilter) {
          return 'brands[]=1&'
        } else if (nikonFilter) {
          return 'brands[]=9&'
        }
      }

      const response = await fetch(`https://getlens-master.stage.dev.family/api/pages/obektivy?${brandSFilterValue()}price[min]=${minPrice}&price[max]=${maxPrice}`);
      const data = await response.json();
      setFilterData(data.products)
    }

    fetchData()
  },[canonFilter, nikonFilter, minPrice, maxPrice]);

  const inputHandler = (value, setValue) => {
    const numberPattern = /^[0-9]*$/gm
    numberPattern.test(value) && setValue(value)
  }

  return (
    <div className="component">
      <aside className="filter">
        <div className="filter__title-wrapper">
          <span className="filter__counter">
            Товаров {responseData && responseData.length}
          </span>
          <h2 className="filter__title">
            Камеры
          </h2>
        </div>  
        <div className="filter__range">
          <h4 className="filter__range-title"> Цена, ₽</h4>
          <div className="filter__range-inputs">
            <input
              type="text"
              value={minPrice}
              onChange={(event) => inputHandler(event.target.value, setMinPrice)}
            />
            <input
              type="text"
              value={maxPrice}
              onChange={(event) => inputHandler(event.target.value, setMaxPrice)}
            />
          </div>
        </div>
        <div className="filter__checkboxes">
          <h4 className="filter__checkbox-title">Бренды</h4>
          <ul>
            <li>
              <input
                type="checkbox"
                id="canon"
                checked={canonFilter}
                onChange={(event) => setCanonFilter(event.target.checked) }
              />
              <label htmlFor="canon"> Canon</label>
            </li>
            <li>
              <input
                type="checkbox"
                id="nikon"
                checked={nikonFilter}
                onChange={(event) => setNikonFilter(event.target.checked) }
              />
              <label htmlFor="nikon">Nikon</label>
            </li>
          </ul>
        </div>
      </aside>
      
      <main className="content">
        {responseData && responseData.map(item => (
          <Card
            key={item.id}
            title={item.title}
            price={item.price}
            isNew={item.is_new}
            isSecondHand={item.is_second_hand}
            imageSrc={item.image}
          />
        ))}
      </main>
    </div>
  )
}

export default Main