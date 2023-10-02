import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import SeeMore from "views/complaints/SeeMore.js";
import Login from "views/login/Login.js";
import Register from "views/login/Register.js";
import Reset from "views/login/PasswordReset.js";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      {/* Rota para a página de login como rota raiz */}
      <Route path="/*" element={<Login />} />
      {/* Caminho para a página de inscrição */}
      <Route path="/register" element={<Register />} />
      {/* Caminho para a página de redefinição de senha */}
      <Route path="/reset" element={<Reset />} />
      {/* Rota para o layout de admin */}
      <Route path="/admin/*" element={<AdminLayout />} />
      {/* Rota para a página "SeeMore" no layout de admin */}
      <Route path="/admin/SeeMore/:id" element={<SeeMore />} />
      {/* Rota padrão redireciona para a página de login */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);
