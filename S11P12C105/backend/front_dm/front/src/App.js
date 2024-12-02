// App.js

import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import SuccessPage from './SuccessPage';

const App = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/success" element={<SuccessPage />} />
          </Routes>

        </header>
      </div>
    </Router>
  );
};

export default App;
/* //<h1>HI</h1> */