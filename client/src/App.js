import { useEffect } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import axios from 'axios'
import { searchPokemon, setPokemons } from './redux/actions'
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './components/NavBar.jsx'
import Landing from './components/Landing.jsx'
import Home from './components/Home.jsx';
import Detail from './components/Detail.jsx'
import Form from './components/Form.jsx'
import ErrorNotFound from './components/ErrorNotFound';
import About from './components/About';

import './App.css';

export default function App() {
  
  const dispatch = useDispatch()

  const pokemons = useSelector(state => state.pokemons)

  //:::::::::::::REALIZAR LA BUSQUEDA POR NOMBRE:::::::::::::::::

  async function onSearch(name){
    try {

      const {data} = await axios(`/pokemon/?name=${name}`)

      if (!data.name) {
         alert("There are no characters with that name.")
      } else {
        dispatch(searchPokemon(data))
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  //:::::::::::TRAER POKEMONS PARA EL HOME :::::::::::::::::::::

  useEffect(() => {
    async function inEffect() {
      try {

        const { data } = await axios.get(`/pokemons`)
        dispatch(setPokemons(data))
        
      } catch (error) {
        console.log(error);
      }
    }
    inEffect()
  }, [dispatch])

  const { pathname } = useLocation();

  return (
    <>
      {pathname === "/" ? null : <NavBar onSearch={onSearch} />}

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home pokemons={pokemons} />} />
        <Route path="/create" element={<Form />} />
        <Route path="/about" element={<About />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="*" element={<ErrorNotFound />} />
      </Routes>
    </>
  );
}
