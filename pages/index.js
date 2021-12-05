import { useState } from "react";
import Card from "../components/Card"
import {useRouter} from 'next/router'

export const getServerSideProps = async (context) => {
  const { brands, minPrice, maxPrice } = context.query
  let query = ''

  if(!brands || brands.length === 0 || brands.length === 2 ){
    query = ''
  } else if (brands.indexOf('canon') >= 0){
    query = `?brands[]=1&price[min]=${minPrice}&price[max]=${maxPrice}`
  } else if (brands.indexOf('nikon') >= 0){
    query = `?brands[]=9&price[min]=${minPrice}&price[max]=${maxPrice}`
  }

  const response = await fetch(`https://getlens-master.stage.dev.family/api/pages/obektivy${query}`)
  const data = await response.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: {responseData: data.products}
  }
}

const Main = ({responseData}) => {
  const router = useRouter()

  const [minPrice, setMinPrice] = useState('0')
  const [maxPrice, setMaxPrice] = useState('79000')
  const [brandsFilter, setBrandsFilter] = useState([])


  const brandsHandleClick = (brand) => {
    setBrandsFilter(prevState => {
      const brandIndex = prevState.indexOf(brand)
       
      if(brandIndex < 0){
        const newState = [...prevState, brand]
        router.push({query: { brands: newState, minPrice: [minPrice], maxPrice: [maxPrice] }})
        return newState

      } else {
        const newState = [...prevState]
        newState.splice(brandIndex, 1)
        router.push({query: { brands: newState, minPrice: [minPrice], maxPrice: [maxPrice] }})
        return newState
      }
    })
  }

  const inputHandler = (value, setValue, type) => {
    const numberPattern = /^[0-9]*$/gm

    if(numberPattern.test(value)){
      setValue(value)
      if(type === 'min'){
        router.push({query: { brands: brandsFilter, minPrice: [value], maxPrice: [maxPrice] }})
      } else {
        router.push({query: { brands: brandsFilter, minPrice: [minPrice], maxPrice: [value] }})
      }
    }
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
              onChange={(event) => inputHandler(event.target.value, setMinPrice, 'min')}
            />
            <input
              type="text"
              value={maxPrice}
              onChange={(event) => inputHandler(event.target.value, setMaxPrice, 'max')}
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
                checked={brandsFilter.indexOf('canon') >= 0}
                onChange={() => brandsHandleClick('canon') }
              />
              <label htmlFor="canon"> Canon</label>
            </li>
            <li>
              <input
                type="checkbox"
                id="nikon"
                checked={brandsFilter.indexOf('nikon') >= 0}
                onChange={() => brandsHandleClick('nikon') }
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