import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Navbar from './Pages/NavBar';
import Register from './Pages/Register';
import Footer from './Pages/Footer';
import Login from './Pages/Login';
//import SignUpPage from './pages/SignUpPage';
import NotFound from './Pages/NotFound';
import Profile from './Pages/Profile';
// import Manager from './Pages/Manager';
function App() {
  return (
    <Router>
      
      <div className="min-h-screen flex flex-col">
      <div 
        style={{ 
          position: "fixed", 
          top: 0, 
          left: "50%", 
          transform: "translateX(-50%)", 
          width: "100%", 
          zIndex: 50, 
          background: "#121212", 
          boxShadow: "0 4px 15px rgba(230, 184, 0, 0.3)",
          borderBottom: "3px solid rgba(230, 184, 0, 0.8)",
        }}
      >
        <Navbar />
      </div>
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/*" element={<NotFound />} />
           {/* <Route path="/manager" element={<Manager/>} /> */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
