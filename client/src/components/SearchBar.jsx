import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { resetPage } from '../redux/actions'

import style from '../styles/SearchBar.module.css'

export default function SearchBar({ onSearch }) {

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

  const alertEmpty = () => {
    return alert("Please write something before searching.")
  }

  return (
    <div className={style.container}>
      <input className={style.inputSearch} type="text" onChange={handleChange} value={name} name="name" placeholder='Enter your search...' autoComplete='off' />
      {!name ? <button className={style.searchButton} onClick={alertEmpty}>Search</button> : <button className={style.searchButton} onClick={add}>Search</button>}

    </div>
  )
}
