import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Projects from './pages/projects/Projects.js';
import Home from './pages/home/Home.js';
import Navbar from './components/Navbar/Navbar.js';
import Experience from './pages/experience/Experience.js';
import Resume from './pages/resume/Resume.js';
import Draggable from './components/Draggable.js';


const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path='/experience' element={<Experience />} />
        <Route path='/resume' element={<Resume />} />
      </Routes>
      <Draggable />
    </div>
  );
};

export default App;
