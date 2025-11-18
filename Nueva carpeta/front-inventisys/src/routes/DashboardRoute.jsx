import { Dashboard } from '../admin/Dashboard'
import { NavBar } from '../component/NavBar'

export const DashboardRoute = () => {
  return (
    <div
      className="d-flex flex-column"
    >
      <div style={{ height: "17%" }}>
            <NavBar/>
      </div>
      <div style={{ height: "83%", overflow: "auto" }}>
        <Dashboard/>
      </div>
    </div>
  )
}
