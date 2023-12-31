import React from 'react'
import { Link } from 'react-router-dom'

import style from '../styles/ErrorNotFound.module.css'

export default function ErrorNotFound() {
    return (
        <div className={style.container}>
            <h1>Oops!</h1>
            <h1>The page you are looking for does not exist.</h1>
            <Link to={"/home"}>
                <button>HOME PAGE</button>
            </Link>
        </div>
    )
}
