import React from 'react'
import { useDispatch } from 'react-redux'

export default function Form() {

  const dispatch = useDispatch()

  return (
    <div>
      <div>
        <form>
          <label>Nombre</label>
          <input type="text" />
          <label>Imagen</label>
          <input type="text" />
          <label>Vida</label>
          <input type="text" />
          <label>Ataque</label>
          <input type="text" />
          <label>Defensa</label>
          <input type="text" />
          <label>Velocidad</label>
          <input type="text" />
          <label>Altura</label>
          <input type="text" />
          <label>Peso</label>
          <input type="text" />
          <select name="" id=""></select>
          <button>Guardar</button>
        </form>
      </div>
    </div>
  )
}
