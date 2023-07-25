import React, { useState } from 'react'

export default function SearchBar({onSearch}) {

  const [name, setName] = useState("")
  //const dispatch = use

  const handleChange = (event) => {
    setName(event.target.value)
  }

  const add = () => {
    onSearch(name)
    setName("")
  }
  return (
    <div>
        <input type="text" onChange={handleChange} placeholder='Ingresa tu busqueda...' />
        <button onClick={add}>Buscar</button>
    </div>
  )
}
