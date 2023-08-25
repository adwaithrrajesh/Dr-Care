import React from 'react';
import{BsChevronCompactLeft,BsChevronCompactRight} from 'react-icons/bs'
import { useState } from 'react';

const Banner = () => {

  const slide = [
    {
      URL:'https://img.freepik.com/premium-photo/abstract-blur-beautiful-luxury-hospital-clinic-interior-background_103324-624.jpg'
    },
    {
      URL:'https://t3.ftcdn.net/jpg/02/16/47/22/360_F_216472247_cT66WDoS0fp1s3wC7eaykMJNDGVbOBPq.jpg'
    },
    {
      URL:'https://www.aamc.org/sites/default/files/styles/scale_and_crop_1200_x_666/public/Article-Academic-Health-Centers-927897070.jpg?itok=v3CKK79s'
    }
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  const prevSlide = () =>{
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? slide.length - 1 : currentIndex -1 
    setCurrentIndex(newIndex)
  }

  const nextSlide = () =>{
    const isLastSlide = currentIndex  === slide.length -1 
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  const goToSlide = (slideIndex) =>{
    setCurrentIndex(slideIndex)
  }



  return (
    <div className='max-w-[2000px] h-[700px] w-full m-auto relative'>
      <div style={{backgroundImage : `url(${slide[currentIndex].URL})`}} className='w-full h-full bg-center bg-cover duration-500'>
      </div>
      {/* Left arrow */}
      <div className='group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
        <BsChevronCompactLeft onClick={prevSlide} size={30}/>
      </div>
      {/* Right Arrow */}
      <div className='group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
        <BsChevronCompactRight onClick={nextSlide} size={30}/>
      </div>
     

    </div>
  );
}

export default Banner;
