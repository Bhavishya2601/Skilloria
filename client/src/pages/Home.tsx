import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { motion } from "framer-motion";
import { TiTick } from "react-icons/ti";
import Footer from "../components/Footer";

import bg1 from '../assets/bg1.jpg'
import bg2 from '../assets/bg2.jpg'
import bg3 from '../assets/bg3.jpg'
import ic1 from '../assets/ic1.png'
import ic2 from '../assets/ic2.png'
import ic3 from '../assets/ic3.png'
import a1 from '../assets/a1.jpg'


interface Image {
  src: string;
}

const Home: React.FC = () => {
  const images: Image[] = [
    { src: bg1 },
    { src: bg2 },
    { src: bg3 },
  ];

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      <div className="relative w-full h-[calc(100vh-80px)] font-manrope overflow-hidden">
        <div
          className="absolute inset-0 bg-black bg-opacity-50 z-0 w-screen bg-cover bg-right transition-all duration-1000 "
          style={{ backgroundImage: `url(${images[currentIndex].src})` }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        <div className="relative z-10 flex pl-64 w-full items-center h-full">
          <motion.h1
            className=" flex flex-col gap-5 h-full text-white z-10 justify-center items-center"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            key={currentIndex}
          >
            <div className="uppercase text-xl w-full">awesome school facilities</div>
            <div className="text-6xl font-bold text-white">
              Join the Biggest Community of <br /> Skilloria
            </div>
            <Link to="/login" className="bg-purple-600 hover:bg-purple-500 font-bold text-white tracking-wide uppercase py-2 px-4 rounded-full self-start text-lg">Get Started</Link>
          </motion.h1>
        </div>
      </div>
      <div className="m-28 p-8 py-16 flex justify-between gap-10 rounded-lg"
        style={{
          boxShadow: "0 0 20px 3px #6C6DFF",
        }}
      >
        <div className="flex flex-col gap-3 justify-center items-center text-center">
          <div>
            <img src={ic1} alt="" className="self-start" />
          </div>
          <div className="font-bold text-2xl">
            Skilled Lecturers
          </div>
          <div>
            The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using.
          </div>
        </div>
        <div className="flex flex-col gap-3 justify-center items-center text-center">
          <div>
            <img src={ic2} alt="" className="self-start" />
          </div>
          <div className="font-bold text-2xl">
            Scholarship Facility
          </div>
          <div>
            The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using.
          </div>
        </div>
        <div className="flex flex-col gap-3 justify-center items-center text-center">
          <div>
            <img src={ic3} alt="" className="self-start" />
          </div>
          <div className="font-bold text-2xl">
            Book Library & Store
          </div>
          <div>
            The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using.
          </div>
        </div>
      </div>
      <div className="mx-28 my-10 flex justify-between gap-10 items-center">
        <div className="flex flex-col gap-5 w-1/2 font-manrope">
          <div className="font-bold text-5xl ">Skills these you really need for learning</div>
          <div>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ab maxime architecto voluptatum asperiore</div>
          <div className="flex flex-col ml-3 gap-2">
            <div className="flex gap-3 items-center">
              <div><TiTick className="text-lg text-white bg-green-600 rounded-full" /></div>
              <div>Smply dummy text elit</div>
            </div>
            <div className="flex gap-3 items-center">
              <div><TiTick className="text-lg text-white bg-green-600 rounded-full" /></div>
              <div>Printing industry architecto</div>
            </div>
            <div className="flex gap-3 items-center">
              <div><TiTick className="text-lg text-white bg-green-600 rounded-full" /></div>
              <div>when an unknown amet consectetur adipisicing</div>
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <img src={a1} alt="" />
        </div>
      </div>
      <div className='min-h-full w-full'>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3437.174971799988!2d76.65720287502891!3d30.5160910960714!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fc32344a6e2d7%3A0x81b346dee91799ca!2sChitkara%20University!5e0!3m2!1sen!2sin!4v1730291514085!5m2!1sen!2sin" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className='h-full min-h-80 w-full'></iframe>
      </div>
      <Footer />
    </>
  );
};

export default Home;
