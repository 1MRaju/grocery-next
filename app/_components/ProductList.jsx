import React from 'react'
import ProductItem from './ProductItem'

function ProductList({productList,selectedCategory}) {
  const filteredProducts = productList.filter(product => product.attributes.name === selectedCategory);
  return (
    <div>
    <div className='text-green-700 font-bold text-2xl md:text-3xl text-center md:text-left py-8 md:py-4'>
        {selectedCategory&&filteredProducts ? (
          <h2>Our {selectedCategory} Products</h2>
        ) : (
          <h2>Our Popular Products</h2>
        )}
      </div>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 '>
          {productList.map((product, index)=>(
             index<8&&<ProductItem product={product} key={index}/>
          ))}
      </div>

    </div>
  )
}

export default ProductList
