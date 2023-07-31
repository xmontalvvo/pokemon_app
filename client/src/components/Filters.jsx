import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { filterAttack, filterOrder, filterOrigin, filterTypes, getTypes } from '../redux/actions'
import axios from 'axios'

import style from '../styles/Filters.module.css'

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
            <div className={style.filters}>
                <div>
                    <p>Types</p>
                    <select name="filterTypes" onChange={handleChangeType}>
                        <option value="All">All</option>
                        {
                            types.map((e, index) => (
                                <option key={index} value={e.name}>{e.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    <p>Origin</p>
                    <select name="filterOrigin" onChange={e => handleChangeOrigin(e)}>
                        <option value="All">All</option>
                        <option value="API">API</option>
                        <option value="Database">Database</option>
                    </select>
                </div>
                <div>
                    <p>Order</p>
                    <select name="filterOrder" onChange={handleChangeOrder}>
                        <option value="DESC">Descending order</option>
                        <option value="ASC">Ascending order</option>
                    </select>
                </div>
                <div>
                    <p>Attack</p>
                    <select name="filterAttack" onChange={handleChangeAttack}>
                        <option value="LOW">Minor to major</option>
                        <option value="HIGH">Major to minor</option>
                    </select>
                </div>
            </div>
        </div>
    )
}
