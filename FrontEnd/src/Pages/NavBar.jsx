import { useNavigate } from "react-router-dom";
import './NavBar.css';
import { useState, useEffect } from 'react';
import Logo from '/Logo.png'


const Navbar = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    //setIsLoggedIn(false);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }

        // Add event listener for logout
        const handleLogoutEvent = () => {
            setIsLoggedIn(false);
        };
        window.addEventListener('logout', handleLogoutEvent);

        // Clean up the event listener on unmount
        return () => {
            window.removeEventListener('logout', handleLogoutEvent);
        };
    }, [localStorage]); // Add localStorage as a dependency

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate("/login");
    };

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
        <nav className="navbar">
            <img src={Logo} className="logo" alt="FinSpectre" style={{ width: '50px', height: '50px' }} />
            <h1 
            className={`mainText ${isNear ? 'dynamicGlow' : ''}`} 
            onMouseMove={handleMouseMove} 
            onMouseLeave={() => setIsNear(false)}
            >
            FINSPECTRE
            </h1>
            <div className="nav-links">
                <button onClick={() => navigate("/")} className="nav-btn">Home</button>
                {isLoggedIn ? (
                    <span>
                    <button onClick={() => navigate("/profile")} className="nav-btn">Profile</button>
                    <button onClick={() => navigate("/manager")} className="nav-btn">Manager</button> 
                    </span>
                ) : (  
                    <button onClick={() => navigate("/login")} className="nav-btn">Login</button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
