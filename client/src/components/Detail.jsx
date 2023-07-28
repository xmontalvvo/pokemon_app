import React, { useEffect } from 'react'
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getPokemonId } from '../redux/actions'

import style from '../styles/Detail.module.css'

export default function Detail() {

  const { id } = useParams()

  const dispatch = useDispatch()

  const pokemon = useSelector(state => state.pokemonId)
  useEffect(() => {
    dispatch(getPokemonId(id))
  }, [dispatch, id])

  return (
    <div className={style.detail}>
      <div className={style.info}>
        <p>ID: {id}</p>
        <h2>Nombre: {pokemon.name}</h2>
        <img src={pokemon.img} alt={pokemon.name} />
        <div>
          <p>Ataque: {pokemon.attack}</p>
          <p>Defensa: {pokemon.defense}</p>
          <p>Velocidad: {pokemon.speed}</p>
          <p>Altura: {pokemon.height}</p>
          <p>Peso: {pokemon.weight}</p>
          {pokemon.createInDb ? <p>{pokemon.types.map(type => type.name).join(", ")}</p> : <p>{pokemon.type}</p>}
        </div>
      </div>
    </div>
  )
}
