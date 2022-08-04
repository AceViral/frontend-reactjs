import React, { useState } from "react";
import MainApp from "./components/MainApp";
import LoginForm from "./components/LoginForm";
import { Route, Routes } from "react-router-dom";
import SignupForm from "./components/SignupForm";

function App() {
   const [token, setToken] = useState(window.localStorage.getItem("token"));
   return (
      <Routes>
         <Route path="/" element={<SignupForm />} />
         <Route
            path="/login"
            element={<LoginForm token={token} setToken={setToken} />}
         />
         <Route path="/main" element={<MainApp />} />
      </Routes>
   );
}

export default App;
