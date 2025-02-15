import { useState } from 'react'
import Logo from '/Logo.png'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';

function App() {
  const [isNear, setIsNear] = useState(false);

  const handleMouseMove = (event) => {
    const textElement = event.target;
    const rect = textElement.getBoundingClientRect();
    const distance = Math.sqrt(
      Math.pow(event.clientX - (rect.left + rect.width / 2), 2) +
      Math.pow(event.clientY - (rect.top + rect.height / 2), 2)
    );

    setIsNear(distance < 100); // Adjust glow sensitivity
  };

  return (
    <>
      <div>
          <img src={Logo} className="logo" alt="FinSpectre" />
      </div>
      <h1 
        className={`mainText ${isNear ? 'dynamicGlow' : ''}`} 
        onMouseMove={handleMouseMove} 
        onMouseLeave={() => setIsNear(false)}
      >
        FIN SPECTRE
      </h1>
      <h2 
        className={`mainText ${isNear ? 'dynamicGlow' : ''}`} 
        onMouseMove={handleMouseMove} 
        onMouseLeave={() => setIsNear(false)}
      >
        SMART WEALTH, SIMPLIFIED
      </h2>
      <Router>
      <Routes>
        <Route path="/" element={<Login />} /> Login
      </Routes>
    </Router>
    </>
  )
}

export default App;
