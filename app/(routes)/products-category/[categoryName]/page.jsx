import GlobalApi from '@/app/_utils/GlobalApi'
import React from 'react'
import TopCategoryList from '../_components/TopCategoryList';
import ProductList from '@/app/_components/ProductList';

async function ProductCategory({params}) {
 const param=decodeURIComponent(params.categoryName);

  const productList = await GlobalApi.getProductsByCategory(params.categoryName)
  const categoryList = await GlobalApi.getCategoryList();
  return (
    <div className='flex flex-col items-center justify-between '>
      <h2 className='w-full p-4 bg-green-600 text-white text-3xl text-center'>{param}</h2> 

        <TopCategoryList categoryList={categoryList}
          selectedCategory={param}/>

      <div className='container px-8 md:px-16 pb-5'>
        <ProductList productList={productList} selectedCategory={param}/>
      </div>
    </div>
  )
}

export default ProductCategory
