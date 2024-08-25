'use client'
import React from 'react'
import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

function Slider({sliderList}) {
  return (
    <Carousel>
    <CarouselContent>
      {sliderList.map((slider, index)=>(
          <CarouselItem key={index}>
            <Image src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL+slider?.attributes?.image?.data[0]?.attributes?.url}
             width={800}
             height={400}
             alt='slider'
             className='w-full h-[200px] md:h-[400px] object-cover rounded-2xl shadow-md'
            />
          </CarouselItem>
      ))
      }
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>  
  )
}

export default Slider
