import { Cart } from '../admin/Cart';
import { NavBar } from '../component/NavBar';

export const CartRoute = () => {
  return (
    <div className="d-flex flex-column">
      <div style={{ height: '17%' }}>
        <NavBar />
      </div>
      <div style={{ height: '83%', overflow: 'auto' }}>
        <Cart />
      </div>
    </div>
  );
};
