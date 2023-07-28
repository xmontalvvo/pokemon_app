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

import './App.css';

export default function App() {

  const pokemons = useSelector(state => state.pokemons)

  //console.log(":::::::: ",pokemons);

  const dispatch = useDispatch()

  //:::::::::::::REALIZAR LA BUSQUEDA POR NOMBRE:::::::::::::::::

  async function onSearch(name){
    try {

      const {data} = await axios(`http://localhost:3001/pokemon/?name=${name}`)
      if (data.name) {
        dispatch(searchPokemon(data))
      } else {
        window.alert("¡No hay personajes con ese nombre!")
      }

    } catch (error) {
      console.log(error)
    }
  }

  // const { name } = useParams()

  // const pokemonsSearchName = useSelector(state => state.pokemonsByName)
  // //console.log(pokemonsSearchName);

  // useEffect(() => {
  //   async function searcher() {
  //     try {
  //       const { data } = await axios.get(`http://localhost:3001/pokemon/?name=${name}`)
  //       //console.log(":::::::EN APP ", data.name);
  //       dispatch(searchPokemon(data))

  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   searcher()
  // }, [dispatch, name])

  //:::::::::::TRAER POKEMONS PARA EL HOME :::::::::::::::::::::

  useEffect(() => {
    async function inEffect() {
      try {
        const { data } = await axios.get(`http://localhost:3001/pokemons`)
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
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </>
  );
}
