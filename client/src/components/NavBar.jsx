import React from 'react'
import { Link } from 'react-router-dom'
import style from '../styles/NavBar.module.css'
import SearchBar from './SearchBar'

export default function NavBar({ onSearch }) {
  return (
    <header className={style.header}>
      <div>
        <Link to={"/home"}>
        <img src="https://1000marcas.net/wp-content/uploads/2020/01/Logo-Pokemon-1280x800.png" alt="Pokemon App" />
        </Link>
      </div>
      <div>
        <nav>
          <ul className={style.mainNav}>
            <li className={style.mainNavItem}>
              <Link className={style.link} to={"/home"}>
                <div>Home</div>
              </Link>
            </li>
            <li className={style.mainNavItem}>
              <Link className={style.link} to={"/create"}>
                <div>New</div>
              </Link>
            </li>
            <li className={style.mainNavItem}><SearchBar className={style.search} onSearch={onSearch}></SearchBar></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

// export default function NavBar({onSearch}) {
//   return (
//     <div className={style.nav}>
//       <img src='' alt="" />
//       <Link className={style.link} to={"/home"}>
//         <div>Inicio</div>
//       </Link>
//       <Link className={style.link} to={"/create"}>
//         <div>Crear Pokemon</div>
//       </Link>
//       <SearchBar onSearch={onSearch}></SearchBar>
//     </div>
//   )
// }
