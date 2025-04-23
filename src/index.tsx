
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CharacterProfileScreen from './screens/CharacterProfileScreen';
import WorldScreen from './screens/WorldScreen';
import FactionScreen from './screens/FactionScreen';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5000'; // hoặc port backend đang chạy


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/profile/:id" element={<CharacterProfileScreen />} />
        <Route path="/worlds" element={<WorldScreen />} />
        <Route path="/factions" element={<FactionScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

const container = document.getElementById('root');
if (container) {
  const root = ReactDOM.createRoot(container as HTMLElement);
  root.render(<App />);
} else {
  console.error("Không tìm thấy #root trong index.html");
}

