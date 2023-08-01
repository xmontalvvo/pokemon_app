import React from 'react'

import style from '../styles/About.module.css'

export default function About() {

    const unsafeProps = {
        href: "https://github.com/xmontalvvo",
        target: "_blank",
      }

  return (
    <div className={style.container}>
        <h1>Thank you for your visit!</h1>
        <p>This is a Pokemon app built with React, Redux, NodeJS, Express, and Sequelize.</p>
        <p>The same one that consumes information from the PokeAPI and allows storing new pokemons in a DB.</p>
        <p>Made with 💖 by <a {...unsafeProps}>xmontalvvo</a> </p>
        
    </div>
  )
}
