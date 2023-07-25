import React from 'react'
import Card from './Card'
import style from '../styles/Home.module.css'

export default function Home({ pokemons }) {

  return (
    <div>
      <div className={style.cards}>
        {
          pokemons.map((pokemon) => {
            //console.log(":::::EN HOME:::::: ", pokemon.types)
            return <Card name={pokemon.name} id={pokemon.id} key={pokemon.name} image={pokemon.img} type={pokemon.type} types={pokemon.createInDb ? pokemon.types : null } createInDb={pokemon.createInDb}/>
          })
        }
      </div>
    </div>
  )
}
