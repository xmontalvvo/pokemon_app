import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { resetPage } from '../redux/actions'

export default function SearchBar({onSearch}) {

  const [name, setName] = useState("")
  const dispatch = useDispatch()

  const handleChange = (event) => {
    setName(event.target.value)
  }

  const add = () => {
    onSearch(name)
    dispatch(resetPage())
    setName("")
  }
  return (
    <div>
        <input type="text" onChange={handleChange} value={name} name="name" placeholder='Ingresa tu busqueda...' />
        <button onClick={add}>Buscar</button>
    </div>
  )
}
