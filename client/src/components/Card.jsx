import React from 'react'
import { Link } from 'react-router-dom'
import style from '../styles/Card.module.css'

export default function Card({name, id, image, types}) {

  const typesString = types.map(elem => elem.type.name).join(', ')

  return (
    <div className={style.card}>
        <div className={style.info}>
          <Link className={style.link} to={`/detail/${id}`}>
            <h2>{name}</h2>
            <img src={image} alt={name} />
            <p>{typesString}</p>
          </Link>
        </div>
    </div>
  )
}
