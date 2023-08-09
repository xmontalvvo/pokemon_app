import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterAttack, filterOrder, filterOrigin, filterTypes, getTypes, resetPage } from '../redux/actions'
import axios from 'axios'

import style from '../styles/Filters.module.css'

export default function Filters() {

    const dispatch = useDispatch()

    const types = useSelector(state => state.types)

    useEffect(() => {
        async function inEffect() {
            try {
                const { data } = await axios.get(`/types`)
                dispatch(getTypes(data))
            } catch (error) {
                console.log(error);
            }
        }
        inEffect()
    }, [dispatch])

    const handleChangeType = (event) => {
        dispatch(filterTypes(event.target.value))
        dispatch(resetPage())
    }

    const handleChangeOrigin = (event) => {
        dispatch(filterOrigin(event.target.value))
        dispatch(resetPage())
    }

    const handleChangeOrder = (event) => {
        dispatch(filterOrder(event.target.value))
        dispatch(resetPage())
    }

    const handleChangeAttack = (event) => {
        dispatch(filterAttack(event.target.value))
        dispatch(resetPage())
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
                        <option value="" disabled selected>Select order</option>
                        <option value="DESC">Descending order</option>
                        <option value="ASC">Ascending order</option>
                    </select>
                </div>
                <div>
                    <p>Attack</p>
                    <select name="filterAttack" onChange={handleChangeAttack}>
                        <option value="" disabled selected>Select attack</option>
                        <option value="LOW">Minor to major</option>
                        <option value="HIGH">Major to minor</option>
                    </select>
                </div>
            </div>
        </div>
    )
}
