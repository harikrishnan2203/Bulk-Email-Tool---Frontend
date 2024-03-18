// App.js
import React, { useEffect } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import Home from "./Components/Home/Home.jsx";
import EmailChart from "../src/Components/ServicePages/Chart/Chart";
import SentItems from "../src/Components/ServicePages/SentItems/SentItems";
import Settings from "../src/Components/ServicePages/Settings/Settings";
import Login from "../src/Components/UserPages/Login";
import Signup from "../src/Components/UserPages/Signup";
import { Container } from "react-bootstrap";
import SendMail from "./Components/ServicePages/Compose/SendMail.jsx";
import SendBulkMail from "./Components/ServicePages/Compose/SendBulkMail.jsx";
import ForgotPassword from "./Components/UserPages/ForgotPassword.jsx";
import UpdatePassword from "./Components/UserPages/UpdatePass.jsx";
import EmailVerify from "./Components/UserPages/EmailVerify.jsx";
import ProtectedRoute from "./Components/Utils/ProtectedRoute.js";


function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("Auth-Token")) {
      navigate("/home")
    }
  }, []);
  return (
    <>
      <Container fluid className="p-0">
        <Routes>

              <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path="/send-mail" element={<ProtectedRoute> <SendMail /> </ProtectedRoute>} />
              <Route path="/send-bulk-mail" element={<ProtectedRoute> <SendBulkMail /> </ProtectedRoute>} />
              <Route path="/chart" element={<ProtectedRoute> <EmailChart /> </ProtectedRoute>} />
              <Route path="/sent-items" element={<ProtectedRoute> <SentItems /> </ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute> <Settings /> </ProtectedRoute>} />

              <Route path="/" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/update-password/:string"
                element={<UpdatePassword />}
              />
              <Route path="/signup" element={<Signup />} />
              <Route path="/emailverify/:id" element={<EmailVerify />} />
              <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </Container>
    </>
  );
}

export default App;
