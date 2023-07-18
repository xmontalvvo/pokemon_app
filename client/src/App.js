import './App.css';

import { Routes, Route, useLocation } from "react-router-dom";
import NavBar from './components/NavBar.jsx'
import Landing from './components/Landing.jsx'
import Home from './components/Home.jsx';
import Detail from './components/Detail.jsx'
import Form from './components/Form.jsx'

export default function App() {
  const { pathname } = useLocation();

  return (
    <>
      {pathname === "/" ? null : <NavBar />}

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<Form />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </>
  );
}
