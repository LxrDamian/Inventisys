import { Route, Routes } from 'react-router-dom'
import { Login } from '../main/Login.jsx'
import { Register } from '../main/Register.jsx'
import { InicioRoute } from './InicioRoute.jsx'
import { DashboardRoute } from './DashboardRoute.jsx'
import { ProductoRoute } from './ProductoRoute.jsx'
import { UsuarioRoute } from './UsuarioRoute.jsx'
import { VentasRoute } from './VentasRoute.jsx'
import { MisVentasRoute } from './MisVentasRoute.jsx'

export const Mainroutes = () => {
  return (
    <div><Routes>
        <Route path='/' element={ <Login />} />
        <Route path='/register' element={ <Register />} />
        <Route path='/inicio' element={ <InicioRoute />} />
        <Route path='/dashboard' element={ <DashboardRoute />} />
        <Route path='/producto' element={ <ProductoRoute />} />
        <Route path='/usuarios' element={ <UsuarioRoute />} />
        <Route path='/ventas' element={ <VentasRoute />} />
        <Route path='/mis-compras' element={ <MisVentasRoute />} />



        
    </Routes></div>
  )
}
