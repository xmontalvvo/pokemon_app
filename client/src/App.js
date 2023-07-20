import { useEffect } from 'react';
import { Routes, Route, useLocation } from "react-router-dom";
import axios from 'axios'
import { setPokemons } from './redux/actions'
import { useDispatch, useSelector } from 'react-redux';

import NavBar from './components/NavBar.jsx'
import Landing from './components/Landing.jsx'
import Home from './components/Home.jsx';
import Detail from './components/Detail.jsx'
import Form from './components/Form.jsx'

import './App.css';

export default function App() {

  const pokemons = useSelector(state => state.pokemons)

  const dispatch = useDispatch()

  const getPokemonDetails = (pokemon) => {
    return axios.get(pokemon.url)
      .then(res => res.data)
      .catch(err => console.log(err))
  }

  useEffect(() => {
    async function inEffect() {
      try {
        const { data } = await axios.get(`http://localhost:3001/pokemons`)
        const pokemonsDetailed = await Promise.all(data.map(pokemon => getPokemonDetails(pokemon)))
        dispatch(setPokemons(pokemonsDetailed))
      } catch (error) {
        console.log(error);
      }
    }
    inEffect()
  }, [dispatch])


  const { pathname } = useLocation();

  return (
    <>
      {pathname === "/" ? null : <NavBar />}

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home pokemons={pokemons} />} />
        <Route path="/create" element={<Form />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </>
  );
}
