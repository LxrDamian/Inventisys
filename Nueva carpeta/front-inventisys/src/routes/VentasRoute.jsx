import { Ventas } from '../admin/Ventas'
import { NavBar } from '../component/NavBar'

export const VentasRoute = () => {
  return (
    <div
      className="d-flex flex-column"
    >
      <div style={{ height: "17%" }}>
            <NavBar/>
      </div>
      <div style={{ height: "83%", overflow: "auto" }}>
        <Ventas/>
      </div>
    </div>
  )
}