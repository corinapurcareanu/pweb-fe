import { Routes, Route} from 'react-router-dom';
import PrivateRoute from './auth.guard';
import { PlaceOrder } from '../components/place-order/place-order';
import { OrderConfirmation } from '../components/order-confirmation/order-confirmation';
import { MyOrders } from '../components/my-orders/my-orders';
import { Cart } from '../components/cart/cart';
import { OrderDetails } from '../components/order-details/order-details';
import { AddProduct } from '../components/add-product/add-product';
import { ShowProductDetails } from '../components/show-product-details/show-product-details';

const ProtectedRoutes = ({ setCartCount }) => {
    return (
      <Routes>
        <Route path="/order-confirmation" element={<PrivateRoute role={'user'} element={<OrderConfirmation />} />} />
        <Route path="/place-order" element={<PrivateRoute role={'user'} element={<PlaceOrder />} />} />
        <Route path="/cart" element={<PrivateRoute role={'user'} element={<Cart setCartCount={setCartCount}/>} />} />
        <Route path="/my-orders" element={<PrivateRoute role={'user'} element={<MyOrders />} />} />
        <Route path="/show-all-orders" element={<PrivateRoute role={'admin'} element={<OrderDetails />} />} />
        <Route path="/add-product" element={<PrivateRoute role={'admin'} element={<AddProduct />} />} />
        <Route path="/show-product-details" element={<PrivateRoute role={['admin']} element={<ShowProductDetails />} />} />
      </Routes>
    );
  };
  
  export default ProtectedRoutes;