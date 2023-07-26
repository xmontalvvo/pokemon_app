import React from 'react'
import { useDispatch } from "react-redux"
import { next, prev } from '../redux/actions'

import style from '../styles/Paginate.module.css'

export default function Paginate({ numPage, cantPage }) {

    const dispatch = useDispatch()

    return (
        <div className={style.container}>
            <div className={style.paginate}>
                {
                    numPage <= 1 ? (
                        <>
                            <div></div>
                            <div></div>
                        </>
                    ) : (
                        <>
                            <button onClick={() => dispatch(prev())}>ANTERIOR</button>
                            <p>{numPage - 1}</p>
                        </>
                    )
                }
                <h3>{numPage}</h3>
                {
                    numPage > cantPage ? (
                        <>
                            <div></div>
                            <div></div>
                        </>
                    ) : (
                        <>
                            <p>{numPage + 1}</p>
                            <button onClick={() => dispatch(next())}>SIGUIENTE</button>
                        </>
                    )
                }
            </div>
        </div>
    )
}
