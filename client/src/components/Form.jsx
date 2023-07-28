import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createPokemon, getTypes } from '../redux/actions'
import { useNavigate } from 'react-router-dom'
import validation from './validation'

export default function Form() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const types = useSelector(state => state.types)
  const pokemons = useSelector(state => state.pokemons)

  useEffect(() => {
    async function inEffect() {
      try {
        const { data } = await axios.get(`http://localhost:3001/types`)
        dispatch(getTypes(data))
      } catch (error) {
        console.log(error);
      }
    }
    inEffect()
  }, [dispatch])

  const [newPokemon, setNewPokemon] = useState({
    "name": "",
    "img": "",
    "types": ["", ""],
    "hp": "",
    "attack": "",
    "defense": "",
    "speed": "",
    "height": "",
    "weight": "",
  })

  const [errors, setErrors] = useState({
    "name": "",
    "img": "",
    "hp": "",
    "attack": "",
    "defense": "",
    "speed": "",
    "height": "",
    "weight": "",
  })

  const handleChange = function (event) {

    setErrors(validation({
      ...newPokemon,
      [event.target.name]: event.target.value,
      pokemons
    }))
    setNewPokemon({
      ...newPokemon,
      [event.target.name]: event.target.value
    })
  }

  const handleChangeTypeOne = (e, index) => {
    const typesOfPokemon = [...newPokemon.types]
    typesOfPokemon[0] = e.target.value
    setNewPokemon({ ...newPokemon, types: typesOfPokemon })
  }

  const handleChangeTypeTwo = (e, index) => {
    const typesOfPokemon = [...newPokemon.types]
    typesOfPokemon[1] = e.target.value
    setNewPokemon({ ...newPokemon, types: typesOfPokemon })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(createPokemon(newPokemon))
    alert('¡Pokemon creado con éxito!')
    setNewPokemon({
      "name": "",
      "img": "",
      "types": ["", ""],
      "hp": "",
      "attack": "",
      "defense": "",
      "speed": "",
      "height": "",
      "weight": "",
    })
    navigate('/home')
  }

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <label>Nombre</label>
          <input key="name" type="text" name='name' value={newPokemon.name} onChange={handleChange} />
          {errors.name ? <p>{errors.name}</p> : null}
          <label>Imagen</label>
          <input key="img" type="text" name='img' value={newPokemon.img} onChange={handleChange} />
          {errors.img ? <p>{errors.img}</p> : null}
          <label>Vida</label>
          <input key="hp" type="text" name='hp' value={newPokemon.hp} onChange={handleChange} />
          {errors.hp ? <p>{errors.hp}</p> : null}
          <label>Ataque</label>
          <input key="attack" type="text" name='attack' value={newPokemon.attack} onChange={handleChange} />
          {errors.attack ? <p>{errors.attack}</p> : null}
          <label>Defensa</label>
          <input key="defense" type="text" name='defense' value={newPokemon.defense} onChange={handleChange} />
          {errors.defense ? <p>{errors.defense}</p> : null}
          <label>Velocidad</label>
          <input key="speed" type="text" name='speed' value={newPokemon.speed} onChange={handleChange} />
          {errors.speed ? <p>{errors.speed}</p> : null}
          <label>Altura</label>
          <input key="height" type="text" name='height' value={newPokemon.height} onChange={handleChange} />
          {errors.height ? <p>{errors.height}</p> : null}
          <label>Peso</label>
          <input key="weight" type="text" name='weight' value={newPokemon.weight} onChange={handleChange} />
          {errors.weight ? <p>{errors.weight}</p> : null}
          <label >Type 1</label>
          <select key='typesOne' name='types' onChange={handleChangeTypeOne}>
            <option disabled selected>Selecciona los tipos</option>
            {
              types.map((type) => {
                return (
                  <option key={type.id} value={type.name}>{type.name}</option>
                )
              })
            }
          </select>
          <label >Type 2</label>
          <select key='typesTwo' name='types' onChange={handleChangeTypeTwo}>
            <option disabled selected>Selecciona los tipos</option>
            {
              types.map((type) => {
                return (
                  <option key={type.id} value={type.name}>{type.name}</option>
                )
              })
            }
          </select>
          {errors.key === true ? <button disabled>Guardar</button> : <button type='submit'>Guardar</button>}
        </form>
      </div>
    </div>
  )
}
