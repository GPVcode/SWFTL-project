import './CSS/App.css';
import React from 'react';
// import Navbar from "./components/Navbar.jsx";
import Navbar from './components/Navbar/Navbar';
import HomePage from "./components/HomePage.jsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/register" element={<Register />} /> */}
        {/* <Route path="/oauth/google/callback" element={<GoogleOAuthCallback />} /> */}
        {/* <Route path="/events" element={<EventList />} /> Display a list of events */}
        {/* <Route path="/events/:eventId" element={<MatchList />} /> Display matches for a selected event */}
      </Routes>
      <Footer />
  </Router>
  );
}

export default App;
