import React from 'react'
import Card from './Card'
import style from '../styles/Home.module.css'
import Paginate from './Paginate'
import { useSelector } from 'react-redux'
import Filters from './Filters'

export default function Home({ pokemons }) {

  const { numPage } = useSelector(state => state)
  const cantPokePerPage = 12
  let desde = (numPage - 1) * cantPokePerPage
  let hasta = numPage * cantPokePerPage
  let cantPage = Math.floor(pokemons.length / cantPokePerPage)
  const viewPokemons = pokemons?.slice(desde, hasta)

  return (
    <div>
      <Filters />
      {
        viewPokemons.length === 0 ? <div className={style.cardsEmpty}><p>There are no pokemons with that data.</p></div> : (
          <div className={style.cards}>
            {
              viewPokemons?.map((pokemon) => {
                return <Card name={pokemon.name} id={pokemon.id} key={pokemon.name} image={pokemon.img} type={pokemon.type} types={pokemon.createInDb ? pokemon.types : null} createInDb={pokemon.createInDb} />
              })
            }
          </div>
        )
      }
      <Paginate numPage={numPage} cantPage={cantPage} />
    </div>
  )
}
