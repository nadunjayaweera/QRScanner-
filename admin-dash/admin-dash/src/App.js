import React from "react";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Homenote from "./pages/homenotes/Home";
import QRCode from "./pages/qrcode/QRcode";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Login />} />
            <Route path="home" element={<Home />} />
            <Route path="/itemnote" element={<Homenote />} />
            <Route path="/qrcodedata" element={<QRCode />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
