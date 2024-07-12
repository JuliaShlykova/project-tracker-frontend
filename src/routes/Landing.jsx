import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import background from '../assets/landing/background.jpg';
import mountain1 from '../assets/landing/mountain1.png';
import mountain2 from '../assets/landing/mountain2.png';
import trail from '../assets/landing/trail.png';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';


const Landing = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0});
  const tl = useRef();
  const container = useRef();

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (tl.current.isActive()) return;
      setMousePos({ x: e.clientX - window.innerWidth / 2, y: e.clientY - window.innerHeight / 2 });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mouseMove', handleMouseMove);
    }
  }, [])

  useGSAP(() => {
    let bgHeight = 2800/3200*2000;
    tl.current = gsap
      .timeline({defaults: {ease: "power4.out"}})
      .from('.bg-img', {
        top: bgHeight/2 - 100,
        duration: 4,
        ease: "back.out"
      }, 0)
      .from('.mountain1', {bottom: -1500, duration: 3}, 1)
      .from('.mountain2', {bottom: -1000, duration: 2.5}, 1.5)
      .from('.trail', {bottom: -400, duration: 2}, 2)
      .from('.text', {opacity: 0, duration: 2}, 2)
  }, { scope: container })


  return (
    <div id='landing-page-container'>
    <header>
      <nav>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </nav>
    </header>
    <main ref={container}>
      <img 
        src={background} 
        className='parallax bg-img' 
        alt="" 
        style={{
          transform: `translateX(calc(-50% + ${-mousePos.x * 0.05}px)) translateY(calc(-50% + ${-mousePos.y * 0.05}px))`
        }} 
      />
      <img 
        src={mountain1} 
        className='parallax mountain1' 
        alt="" 
        style={{
          transform: `translateX(calc(${mousePos.x<0?(-mousePos.x * 0.1):0}px)) translateY(calc(${-mousePos.y * 0.05}px))`
        }} 
      />
      <div 
        className="text parallax"
        style={{
          transform: `translateX(calc(-50% + ${-mousePos.x * 0.1}px)) translateY(calc(-50% + ${-mousePos.y * 0.05}px))`
        }} 
      >
        <h1>Project Tracker</h1>
      </div>
      <img 
        src={mountain2} 
        className='parallax mountain2' 
        alt="" 
        style={{
          transform: `translateX(calc(${mousePos.x>0?(-mousePos.x * 0.15):0}px)) translateY(calc(${-mousePos.y * 0.05}px))`
        }} 
      />
      <img 
        src={trail} 
        className='trail parallax' 
        alt="" 
        style={{
          transform: `translateX(${mousePos.x<0?(-mousePos.x * 0.2):0}px)`
        }} 
      /> 
      <div className="vignette"></div>
    </main>
    </div>
    
  )
}

export default Landing