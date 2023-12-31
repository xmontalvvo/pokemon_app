import React from 'react'
import { Link } from 'react-router-dom'
import style from '../styles/Landing.module.css'

export default function Landing() {
  return (
    <div className={style.landing}>
      <div className={style.welcome}>
        <h1 className={style.title}>Welcome</h1>
        <h3 className={style.h3}><Link className={style.link} to="/home">Start Here</Link></h3>
      </div>
    </div>
  )
}
