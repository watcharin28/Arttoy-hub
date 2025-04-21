import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import RegisterPage from './pages/Register';

function App() {
    return (
        <div>
            <Routes>
                <Route path="/user/profile" element={<HomePage />} />
                <Route path="/Login" element={<LoginPage />} />
                <Route path="/Register" element={<RegisterPage/>} />
            </Routes>
        </div>
    );

}

export default App;
