import './App.css';
import About from './Components/About/About';
import Navbar from './Components/Navbar/Navbar';
import Contact from './Components/Contact/Contact';
import Donations from './Components/Donations/Donations';
import Homepage from './Components/Homepage/Homepage';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Homepage />}></Route>
        <Route exact path="/about-us" element={<About />}></Route>
        <Route exact path="/contact-us" element={<Contact />}></Route>
        <Route exact path="/donations" element={<Donations />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
