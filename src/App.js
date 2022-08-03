import React, { useState } from "react";
import MainApp from "./components/MainApp";
import LoginForm from "./components/LoginForm";
function App() {
   const [isLogin, setIsLogin] = useState(false);
   return (
      <>
         <MainApp />
      </>
   );
}

export default App;
