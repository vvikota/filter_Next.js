import { useState, useEffect } from "react";
import Card from "../components/Card"

// export const getServerSideProps = async () => {
//   const response = await fetch(`https://getlens-master.stage.dev.family/api/pages/obektivy`);
//   const data = await response.json();

//   // console.log(data)

//   if(!data) {
//     return {
//       notFound: true,
//     }
//   }

//   return {
//     props: {responseData: data.products }
//   }
// }

const Main = ({responseData}) => {

  const [priceFilter, setPriceFilter] = useState(['0', '79000'])
  const [brandFilter, setBrandFilter] = useState([false, false])
  const [filterData, setFilterData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://getlens-master.stage.dev.family/api/pages/obektivy`);
      const data = await response.json();
      setFilterData(data)
    }
  });

  
  
  // console.log(responseData)
  return (
    // <div> hello </div>
    <div className="component">
      <aside className="filter">
        <div className="filter__title-wrapper">
          <span className="filter__counter">
            Товаров {responseData && responseData.length}
          </span>
          <h2 className="filter__title">
            {responseData && responseData[0].category.title}
          </h2>
        </div>  
        <div className="filter__range">
          <h4 className="filter__range-title"> Цена, ₽</h4>
          <div className="filter__range-inputs">
            <input
              type="text"
              value={priceFilter[0]}
              onChange={(event) => setPriceFilter([event.target.value, priceFilter[1]])}
            />
            <input
              type="text"
              value={priceFilter[1]}
              onChange={(event) => setPriceFilter([priceFilter[0], event.target.value])}
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
                checked={brandFilter[0]}
                onChange={(event) => setBrandFilter([event.target.checked, brandFilter[1]]) }
              />
              <label htmlFor="canon"> Canon</label>
            </li>
            <li>
              <input
                type="checkbox"
                id="nikon"
                checked={brandFilter[1]}
                onChange={(event) => setBrandFilter([brandFilter[0], event.target.checked]) }
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