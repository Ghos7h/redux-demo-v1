import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../store/cartSlice';
import { STATUSES, fetchProducts } from '../store/productSlice';


const Products = () => {

  const {data:products, status} = useSelector(state => state.product)
  const dispatch = useDispatch();

  // const [products, setProducts] = useState([]);

  useEffect(()=>{
    dispatch(fetchProducts())
    // const fetchProducts = async () => {
    //   const res = await fetch('https://fakestoreapi.com/products');
    //   const data = await res.json();
    //   console.log('data = ', data);
    //   // setProducts((prev)=>  prev = data);
    //   setProducts(data);
    //   console.log('products' , [products])
    // }
    // fetchProducts();
  },[])

  const handleAdd = (product) => {
    // store product inside redux store
    dispatch(add(product));
  }

  if (status === STATUSES.LOADING) {
    return <h2>Loading....</h2>;
  }

  if (status === STATUSES.ERROR) {
    return <h2>Something went wrong!</h2>;
  }
  return (
    <div className='productsWrapper'>
      {
        products.map((product) =>{
          <div className='card' key={product.id}>
            <img src={product.image} />
            <h4>{product.title}</h4>
            <h5>{product.price}</h5>
            <button className='btn' onClick={()=>handleAdd(product)}>Add to cart</button>
          </div>
        })
      }
    </div>
  )
}

export default Products