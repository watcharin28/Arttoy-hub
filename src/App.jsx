import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login';
import HomePage from './pages/Home';
import RegisterPage from './pages/Register';

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/Login" element={<LoginPage />} />
                <Route path="/Register" element={<RegisterPage/>} />
            </Routes>
        </div>
    );
}

export default App;
