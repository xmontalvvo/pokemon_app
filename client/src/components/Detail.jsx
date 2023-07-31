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
        <img src={pokemon.img} alt={pokemon.name} />
        <div>
          <p>ID: {id}</p>
          <h2>Name: {pokemon.name}</h2>
          <p>HP: {pokemon.hp}</p>
          <p>Attack: {pokemon.attack}</p>
          <p>Defense: {pokemon.defense}</p>
          <p>Speed: {pokemon.speed}</p>
          <p>Height: {pokemon.height}</p>
          <p>Weight: {pokemon.weight}</p>
          {pokemon.createInDb ? <p>TYPE: {pokemon.types.map(type => type.name).join(", ")}</p> : <p>TYPE: {pokemon.type}</p>}
        </div>
      </div>
    </div>
  )
}
