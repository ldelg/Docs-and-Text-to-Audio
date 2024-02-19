import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import SpeechSynthesis from "./components/speechSynthesis/SpeechSynthesis";
import SpeechRecognition from "./components/speechRecognition/SpeechRecognition";
import About from "./components/About/About";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<SpeechSynthesis />}></Route>
        <Route path="/Speech2Text" element={<SpeechRecognition />}></Route>
        <Route path="/About" element={<About />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
