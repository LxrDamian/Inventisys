import { Producto } from '../admin/Producto'
import { NavBar } from '../component/NavBar'

export const ProductoRoute = () => {
  return (
    <div
      className="d-flex flex-column"
    >
      <div style={{ height: "17%" }}>
            <NavBar/>
      </div>
      <div style={{ height: "83%", overflow: "auto" }}>
        <Producto/>
      </div>
    </div>
  )
}