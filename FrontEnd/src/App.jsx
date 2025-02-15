import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Navbar from './Pages/NavBar';
import Register from './Pages/Register';
//import Footer from './components/Footer';
import Login from './Pages/Login';
//import SignUpPage from './pages/SignUpPage';
import NotFound from './Pages/NotFound';
function App() {
  return (
    <Router>
      
      <div className="min-h-screen flex flex-col">
      <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </main>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;