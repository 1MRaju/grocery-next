// app/products-category/[categoryName]/page.jsx

import GlobalApi from '@/app/_utils/GlobalApi';
import React from 'react';
import TopCategoryList from '@/app/_components/CategoryList';
import ProductList from '@/app/_components/ProductList';

export async function generateStaticParams() {
  // Fetch the list of categories or paths to generate
  const categoryList = await GlobalApi.getCategoryList();
  return categoryList.map(category => ({
    categoryName: category.name
  }));
}

export default async function ProductCategory({ params }) {
  const param = decodeURIComponent(params.categoryName);

  // Fetch product list and category list
  const productList = await GlobalApi.getProductsByCategory(param);
  const categoryList = await GlobalApi.getCategoryList();

  return (
    <div className='flex flex-col items-center justify-between '>
      <h2 className='w-full p-4 bg-green-600 text-white text-3xl text-center'>{param}</h2>

      <TopCategoryList categoryList={categoryList}
        selectedCategory={param} />

      <div className='container px-8 md:px-16 pb-5'>
        <ProductList productList={productList} selectedCategory={param} />
      </div>
    </div>
  );
}
