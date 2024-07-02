import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import background from '../assets/landing/background.png';
import mountain1 from '../assets/landing/mountain1.png';
import mountain2 from '../assets/landing/mountain2.png';
import trail from '../assets/landing/trail.png';
import shadow from '../assets/landing/shadow.png';
import sunnyRays from '../assets/landing/sunny-rays.png';

const Landing = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0});

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX - window.innerWidth / 2, y: e.clientY - window.innerHeight / 2 });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mouseMove', handleMouseMove);
    }
  }, [])

  return (
    <div id='landing-page-container'>
    <header>
      <nav>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </nav>
    </header>
    <main>
      <img 
        src={background} 
        className='parallax bg-img' 
        alt="" 
        style={{
          transform: `translateX(calc(-50% + ${-mousePos.x * 0.1}px)) translateY(calc(-50% + ${-mousePos.y * 0.1}px))`
        }} 
      />
      <img 
        src={mountain1} 
        className='parallax mountain1' 
        alt="" 
        style={{
          transform: `translateX(calc(${mousePos.x<0?(-mousePos.x * 0.2):0}px)) translateY(calc(${-mousePos.y * 0.2}px))`
        }} 
      />
      <div 
        className="text parallax"
        style={{
          transform: `translateX(calc(-50% + ${-mousePos.x * 0.2}px)) translateY(calc(-50% + ${-mousePos.y * 0.2}px))`
        }} 
      >
        <h1>Project Tracker</h1>
      </div>
      <img 
        src={mountain2} 
        className='parallax mountain2' 
        alt="" 
        style={{
          transform: `translateX(calc(${mousePos.x>0?(-mousePos.x * 0.3):0}px)) translateY(calc(${-mousePos.y * 0.3}px))`
        }} 
      />
      <img 
        src={trail} 
        className='trail parallax' 
        alt="" 
        style={{
          transform: `translateX(${mousePos.x<0?(-mousePos.x * 0.4):0}px)`
        }} 
      />  
      <img 
        src={shadow} 
        className='static-effect' 
        alt="" 
      />
      <img 
        src={sunnyRays} 
        className='static-effect' 
        alt="" 
      />
      <div className="vignette"></div>
    </main>
    </div>
    
  )
}

export default Landing