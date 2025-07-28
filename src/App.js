import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Booking from './pages/Booking';
import Contact from './pages/Contact';
import './App.css';



export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white text-gray-800">
        <header className="bg-green-200 p-4 shadow">
          <h1 className="text-2xl font-bold">Falak hennaarts</h1>
          <nav className="mt-2 flex gap-4">
            <Link to="/">Home</Link>
            <Link to="/gallery">Gallery</Link>
            <Link to="/booking">Book a Slot</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </header>

        <main className="p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <footer className="bg-green-100 p-4 text-center mt-4">
          &copy; 2025 Henna by Falak
        </footer>
      </div>
    </Router>
  );
}
