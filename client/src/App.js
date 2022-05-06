import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login.component";
import Home from "./Pages/Home.component";
import Auth from './Pages/Auth'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/auth/:paramEmail" element={<Auth />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
};

export default App;

// <BrowserRouter>
//
// </BrowserRouter>
