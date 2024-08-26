
import GlobalApi from '@/app/_utils/GlobalApi';
import React from 'react';
import TopCategoryList from '../_components/TopCategoryList';
import ProductList from '@/app/_components/ProductList';

export async function getStaticPaths() {
  try {
    const categoryList = await GlobalApi.getCategoryList();
    const paths = categoryList.map(category => ({
      params: { categoryName: category.name }
    }));

    return { paths, fallback: 'blocking' };
  } catch (error) {
    console.error("Error fetching category list:", error);
    return { paths: [], fallback: 'blocking' };
  }
}

export async function getStaticProps({ params }) {
  try {
    const param = decodeURIComponent(params.categoryName);
    const productList = await GlobalApi.getProductsByCategory(param);
    const categoryList = await GlobalApi.getCategoryList();

    return {
      props: {
        productList,
        categoryList,
        param
      },
      revalidate: 60 // Optional: Revalidate every 60 seconds
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      notFound: true // Return 404 page if data fetch fails
    };
  }
}

function ProductCategory({ productList, categoryList, param }) {
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

export default ProductCategory;
