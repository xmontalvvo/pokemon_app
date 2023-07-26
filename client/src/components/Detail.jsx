import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"

import style from '../styles/Detail.module.css'

export default function Detail() {

  const { id } = useParams()
  const [pokemon, setPokemon] = useState({})
  const { pokemons } = useSelector(state => state)

    //! Crear otro estado en los reducers como en la APP de morty para que al recargar la pagina, no me de error de que no existe
    //! al tener otro duplicado no sucederá ese error

    //TODO: Falta que me muestre el detalle de los que me trae por DB
    
  useEffect(() => {
    const poke = pokemons?.find((pk) => pk.id === Number(id))
    if(poke) setPokemon(poke)
    else window.alert("No existe personaje con ese ID")
  }, [id])

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
          <p>{pokemon.type}</p>
        </div>
      </div>
    </div>
  )
}
