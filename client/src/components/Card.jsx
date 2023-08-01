import React from 'react'
import { Link } from 'react-router-dom'

import style from '../styles/Card.module.css'

export default function Card({ name, id, image, type, types, createInDb }) {

  const typesApi = type?.map(type => type).join(', ')
  const typesDb = types?.map(types => types.name).join(', ')

  return (
    <div className={style.card}>
      <div className={style.info}>
        <Link className={style.link} to={`/detail/${id}`}>
          <h2>{name}</h2>
          <img src={image} alt={name} />
          <p>{typesApi}</p>
          {createInDb ? <p>{typesDb}</p> : null}
        </Link>
      </div>
    </div>
  )
}
