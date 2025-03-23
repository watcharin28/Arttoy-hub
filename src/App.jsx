import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login';
import HomePage from './pages/Home';

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/Login" element={<LoginPage />} />
            </Routes>
        </div>
    );
}

export default App;
