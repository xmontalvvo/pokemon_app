import React from 'react'
import Card from './Card'
import style from '../styles/Home.module.css'

export default function Home({ pokemons }) {
  return (
    <div>
      <div className={style.cards}>
        {
          pokemons.map((pokemon) => {
            return <Card name={pokemon.name} id={pokemon.id} key={pokemon.name} image={pokemon.sprites.front_default} />
          })
        }
      </div>
    </div>
  )
}
