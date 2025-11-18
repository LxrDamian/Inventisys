import React from 'react'
import { Inicio } from '../admin/Inicio'
import { NavBar } from '../component/NavBar'

export const InicioRoute = () => {
  return (
    <div
      className="d-flex flex-column"
    >
      <div style={{ height: "17%" }}>
            <NavBar/>
      </div>
      <div style={{ height: "83%", overflow: "auto" }}>
        <Inicio/>
      </div>
    </div>
  )
}
