import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
//import Navbar from './components/Navbar';
//import Footer from './components/Footer';
import Login from './Pages/Login';
//import SignUpPage from './pages/SignUpPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* <Navbar /> */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;