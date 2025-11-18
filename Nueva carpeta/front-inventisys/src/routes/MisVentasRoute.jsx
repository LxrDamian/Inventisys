import { MisVentas } from '../admin/MisVentas'
import { NavBar } from '../component/NavBar'

export const MisVentasRoute = () => {
  return (
    <div
      className="d-flex flex-column"
    >
      <div style={{ height: "17%" }}>
            <NavBar/>
      </div>
      <div style={{ height: "83%", overflow: "auto" }}>
        <MisVentas/>
      </div>
    </div>
  )
}