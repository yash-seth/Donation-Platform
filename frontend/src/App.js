import "./App.css";
import About from "./Components/About/About";
import Navbar from "./Components/Navbar/Navbar";
import Contact from "./Components/Contact/Contact";
import Donations from "./Components/Donations/Donations";
import Homepage from "./Components/Homepage/Homepage";
import { useAuth0 } from "@auth0/auth0-react";
import { Triangle } from "react-loader-spinner";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const { isAuthenticated, isLoading } = useAuth0();
  return (
    <Router>
      <Navbar />
      {isLoading ? (
        <div id="content-spinner">
          <Triangle
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </div>
      ) : (
        <Routes>
          <Route exact path="/" element={<Homepage />}></Route>
          <Route exact path="/about-us" element={<About />}></Route>
          <Route exact path="/contact-us" element={<Contact />}></Route>
          <Route exact path="/donations" element={<Donations />}></Route>
        </Routes>
      )}
    </Router>
  );
}

export default App;
