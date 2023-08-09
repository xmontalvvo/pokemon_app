import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createPokemon, getTypes } from '../redux/actions'
import { useNavigate } from 'react-router-dom'
import validation from './validation'

import style from '../styles/Form.module.css'

export default function Form() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const types = useSelector(state => state.types)
  const pokemons = useSelector(state => state.pokemons)

  useEffect(() => {
    async function inEffect() {
      try {
        const { data } = await axios.get(`/types`)
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
    "types": [],
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
    "types": "",
    "hp": "",
    "attack": "",
    "defense": "",
    "speed": "",
    "height": "",
    "weight": "",
  })

  const handleChange = function (event) {
    const { name, value } = event.target;
  
    if (name === 'types') {
      const typesOfPokemon = [...newPokemon.types];
      const index = typesOfPokemon.indexOf(value);
  
      if (index === -1) {
        typesOfPokemon.push(value);
      }
  
      setNewPokemon({ ...newPokemon, types: typesOfPokemon });
    } else {
      setErrors(validation({
        ...newPokemon,
        [name]: value,
        pokemons
      }));
      setNewPokemon({ ...newPokemon, [name]: value });
    }
  }

  useEffect(() => {
    setErrors(validation({
      ...newPokemon,
      pokemons
    }))
  }, [newPokemon, pokemons])

  const handleSubmit = (event) => {
    event.preventDefault()

    const pokemonsNames = pokemons.map(pokemon => pokemon.name)

    if (pokemonsNames.includes(newPokemon.name)) {
      alert(`The pokemon with the name ${newPokemon.name} already exists.`)
    } else {

      dispatch(createPokemon(newPokemon))
      alert('¡Pokemon successfully created!')
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
  }

  return (
    <div className={style.container}>
      <div>
        <form className={style.form} onSubmit={handleSubmit}>
          <label htmlFor="name">
            <span>Name</span>
            <input id="name" placeholder='Enter the name....' autoComplete='off' key="name" type="text" name='name' value={newPokemon.name} onChange={handleChange} />
            {errors.name ? <p>{errors.name}</p> : null}
          </label>
          <label htmlFor='img'>
            <span>Image</span>
            <input id="img" placeholder='Enter the image....' autoComplete='off' key="img" type="text" name='img' value={newPokemon.img} onChange={handleChange} />
            {errors.img ? <p>{errors.img}</p> : null}
          </label>
          <label htmlFor='hp'>
            <span>HP</span>
            <input id="hp" placeholder='Enter life....' autoComplete='off' key="hp" type="number" name='hp' value={newPokemon.hp} onChange={handleChange} />
            {errors.hp ? <p>{errors.hp}</p> : null}
          </label>
          <label htmlFor='attack'>
            <span>Attack</span>
            <input id="attack" placeholder='Enter the attack....' autoComplete='off' key="attack" type="number" name='attack' value={newPokemon.attack} onChange={handleChange} />
            {errors.attack ? <p>{errors.attack}</p> : null}
          </label>
          <label htmlFor='defense'>
            <span>Defense</span>
            <input id="defense" placeholder='Enter the defense....' autoComplete='off' key="defense" type="number" name='defense' value={newPokemon.defense} onChange={handleChange} />
            {errors.defense ? <p>{errors.defense}</p> : null}
          </label>
          <label htmlFor='speed'>
            <span>Speed</span>
            <input id="speed" placeholder='Enter speed....' autoComplete='off' key="speed" type="number" name='speed' value={newPokemon.speed} onChange={handleChange} />
            {errors.speed ? <p>{errors.speed}</p> : null}
          </label>
          <label htmlFor='height'>
            <span>Height</span>
            <input id="height" placeholder='Enter the height....' autoComplete='off' key="height" type="number" name='height' value={newPokemon.height} onChange={handleChange} />
            {errors.height ? <p>{errors.height}</p> : null}
          </label>
          <label htmlFor='weight'>
            <span>Weight</span>
            <input id="weight" placeholder='Enter the weight....' autoComplete='off' key="weight" type="number" name='weight' value={newPokemon.weight} onChange={handleChange} />
            {errors.weight ? <p>{errors.weight}</p> : null}
          </label>
          <div>
            <select key='types' name='types' onChange={handleChange}>
              <option disabled selected>Select type</option>
              {
                types.map((type) => {
                  return (
                    <option key={type.id} value={type.name}>{type.name}</option>
                  )
                })
              }
            </select>
            {errors.types ? <p>{errors.types}</p> : null}
          </div>
          <div className={style.containerTypes}>
            {
              newPokemon.types.map((types, index) => {
                return <div key={index} className={style.errorTypes}><p onClick={()=>{setNewPokemon({...newPokemon, types: newPokemon.types?.filter(type => type !== types)})}}>x</p><h5>{types}</h5></div>
              })
            }
          </div>
          {errors.key === true || errors.key === undefined ? <button style={{ backgroundColor: "#817f7f" }} disabled>Create Pokemon</button> : <button type='submit'>Create Pokemon</button>}
        </form>
      </div>
    </div>
  )
}
