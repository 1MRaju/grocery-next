import CategoryList from "./_components/CategoryList";
import ProductList from "./_components/ProductList";
import Slider from "./_components/Slider";
import GlobalApi from "./_utils/GlobalApi"; 
import Image from 'next/image';

export default async function Home() {
  const sliderList = await GlobalApi.getSliders();
  const categoryList = await GlobalApi.getCategoryList();
  const productList = await GlobalApi.getAllProducts();
  return (
    <div className="p-5 px-16">
      {/* sliders */}
      <Slider sliderList={sliderList}/> 

      {/* category list */}
      <CategoryList categoryList={categoryList}/>

      {/* product list */}
      <ProductList productList={productList}/>

      {/* banner */}
      <div className="flex md:flex-row flex-col items-center justify-center w-full my-10 gap-5 ">
        <Image width={300} height={200} src='/banner-juice.webp' className='md:w-[50%] h-[220px] rounded-2xl shadow-xl' alt="banner"/>
        <Image width={300} height={200} src='/banner-juice1.webp' className='md:w-[50%] h-[220px] shadow-xl' alt="banner1"/>
      </div>
    </div>
  );
}
