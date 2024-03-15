// App.js
import React, { useContext, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import NavBar from "./Components/Navbar/NavBar";
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
import Context from "./Context/Context.js";

function App() {
  // const {navFlag} = useContext(Context);
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  // useEffect(() => {
  //   const authToken = localStorage.getItem("Auth-Token");
  //   if (authToken) {
  //     setLoggedIn(true);
  //   }
  // }, []); // Run once on initial mount

  // useEffect(() => {
  //   if (loggedIn) {
  //     navigate("/home", { replace: true }); // Navigate to home if logged in
  //   } else {
  //     navigate("/");
  //   }
  // }, [loggedIn, navigate]); // Re-run when loggedIn state changes

  return (
    <>
      <Container fluid className="p-0">
        <NavBar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/update-password/:string" element={<UpdatePassword />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/emailverify/:id" element={<EmailVerify />} />
          <Route path="/home" element={<Home />} />
          <Route path="/send-mail" element={<SendMail />} />
          <Route path="/send-bulk-mail" element={<SendBulkMail />} />
          <Route path="/chart" element={<EmailChart />} />
          <Route path="/sent-items" element={<SentItems />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
