import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { Container, } from "@mui/material";
import Login from "./pages/Login";
import MyFiles from "./pages/MyFile";
import Favorites from "./pages/Favorites";  

export default function App() {
  return (
    <BrowserRouter>
      <Container>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
         <Route path="/myFiles" element={<MyFiles />} />
         <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}
