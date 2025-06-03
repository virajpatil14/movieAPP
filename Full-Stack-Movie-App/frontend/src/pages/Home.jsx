
import React, { useEffect } from 'react' 
import Navbar from '../components/Navbar'
import { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import Movie from '../components/movie';
import { api_base_url } from '../helper';

const Home = () => {

  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const getMovies = () => {
    fetch(api_base_url + "/getMovies").then(res => res.json()).then(data => {
      console.log(data.movies);
      if (data.success) {
        setData(data.movies);
      }
      else {
        setError(data.msg);
      }
    })
  };

  useEffect(() => {
    getMovies();
  }, [])


  return (
    <>
      <Navbar />
      <div className='px-[100px] mt-3'>

        <Swiper navigation={true} loop={true} autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }} modules={[Autoplay, Navigation]} className="mySwiper">
          <SwiperSlide>
            <img src="https://w0.peakpx.com/wallpaper/243/525/HD-wallpaper-star-wars-the-last-jedi-poster-2017-movie-action.jpg" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://w0.peakpx.com/wallpaper/591/586/HD-wallpaper-movie-honey-i-shrunk-the-kids.jpg" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://www.femalefirst.co.uk/image-library/land/1000/b/brave-feature-poster.jpg" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://w0.peakpx.com/wallpaper/301/719/HD-wallpaper-star-wars-iii-kid-s-poster-star-wars-revenge-of-the-sith-cinema-chewbacca-george-lucas-entertainment-movies-wookies-kids.jpg" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://c4.wallpaperflare.com/wallpaper/725/81/137/drama-fantasy-film-movie-wallpaper-preview.jpg" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="https://qqcdnpictest.mxplay.com/pic/9b087afcd756b6a1fbdb177ce9ecb64e/en/16x9/1600x900/test_pic1747384651705.webp" alt="" />
          </SwiperSlide>

        </Swiper>

        <div className='mb-10'>
          <h3 className='text-2xl my-5'>Kids</h3>

          <Swiper
            slidesPerView={6}
            spaceBetween={0}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Autoplay, Pagination]}
            className="!h-[40vh]"
          >
            {
              data ? data.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <Movie movie={item} />
                  </SwiperSlide>
                )
              }) : "No Movies Found"
            }
          </Swiper>



          <h3 className='text-2xl my-5'>Action</h3>

          <Swiper
            slidesPerView={6}
            spaceBetween={0}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Autoplay, Pagination]}
            className="!h-[40vh]"
          >
            {
              data ? data.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <Movie movie={item} />
                  </SwiperSlide>
                )
              }) : "No Movies Found"
            }
          </Swiper>

        </div>
      </div>
    </>
  )
}

export default Home 