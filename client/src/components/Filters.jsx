import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { filterAttack, filterOrder, filterOrigin, filterTypes, getTypes } from '../redux/actions'
import axios from 'axios'

//import style from '../styles/Filters.module.css'

export default function Filters() {

    const dispatch = useDispatch()

    const types = useSelector(state => state.types)

    useEffect(() => {
        async function inEffect() {
            try {
                const { data } = await axios.get(`http://localhost:3001/types`)
                dispatch(getTypes(data))
            } catch (error) {
                console.log(error);
            }
        }
        inEffect()
    }, [dispatch])

    const handleChangeType = (event) => {
        dispatch(filterTypes(event.target.value))
    }

    const handleChangeOrigin = (event) => {
        dispatch(filterOrigin(event.target.value))
    }

    const handleChangeOrder = (event) => {
        dispatch(filterOrder(event.target.value))
    }

    const handleChangeAttack = (event) => {
        dispatch(filterAttack(event.target.value))
    }

    return (
        <div>
            <div>
                <p>Filtro tipos</p>
                <select name="filterTypes" onChange={handleChangeType}>
                    <option value="All">Todos</option>
                    {
                        types.map((e, index) => (
                            <option key={index} value={e.name}>{e.name}</option>
                        ))
                    }
                </select>
                <p>Origen</p>
                <select name="filterOrigin" onChange={e => handleChangeOrigin(e)}>
                    <option value="All">Todos</option>
                    <option value="API">API</option>
                    <option value="Database">Database</option>
                </select>
                <p>Orden</p>
                <select name="filterOrder" onChange={handleChangeOrder}>
                    <option value="DESC">Descendente</option>
                    <option value="ASC">Ascendente</option>
                </select>
                <p>Ataque</p>
                <select name="filterAttack" onChange={handleChangeAttack}>
                    <option value="LOW">Menor a Mayor</option>
                    <option value="HIGH">Mayor a Menor</option>
                </select>
            </div>
        </div>
    )
}
