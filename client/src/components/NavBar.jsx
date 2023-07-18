import React from 'react'
import { Link } from 'react-router-dom'
import style from '../styles/NavBar.module.css'
import SearchBar from './SearchBar'

export default function NavBar() {
  return (
    <div className={style.nav}>
      <img src='' alt="" />
      <Link className={style.link} to={"/home"}>
        <div>Inicio</div>
      </Link>
      <Link className={style.link} to={"/create"}>
        <div>Crear Pokemon</div>
      </Link>
      <SearchBar></SearchBar>
    </div>
  )
}
