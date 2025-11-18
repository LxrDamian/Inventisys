import { AdminUsuarios } from '../admin/AdminUsuarios'
import { NavBar } from '../component/NavBar'

export const UsuarioRoute = () => {
  return (
    <div
      className="d-flex flex-column"
    >
      <div style={{ height: "17%" }}>
            <NavBar/>
      </div>
      <div style={{ height: "83%", overflow: "auto" }}>
        <AdminUsuarios/>
      </div>
    </div>
  )
}