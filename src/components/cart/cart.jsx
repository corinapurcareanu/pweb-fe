import {React} from 'react'
import './cart.css';
import { Container} from '@material-ui/core';
import { useState , useEffect, useCallback} from 'react';
import ProductService from "../../_services/product.service";
import { Trash } from 'phosphor-react';
import DeleteModal from './delete-modal'
import { useNavigate } from "react-router-dom";

export const Cart = ({setCartCount}) => {
    const [cartDetails, setCartDetails] = useState([]);
    const [selectedCart, setSelectedCart] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteApproval, setDeleteApproval] = useState(false);
    const [emptyCart, setEmptyCart] = useState(false);

    const navigate = useNavigate();
    const productService = new ProductService();

    function getTotalPrice(price, quantity) {
        return price * quantity;
    }

    const handleShowDeleteModal = (cart) => {
        setShowDeleteModal(true);
        setSelectedCart(cart);
    }

    const handleHideDeleteModal = () => {
        setShowDeleteModal(false);
        setSelectedCart(null);
        getCartDetails();
    }

    const getCartDetails = useCallback(async () => {
        const productService = new ProductService();
        setEmptyCart(false)
        try {
          const response = await productService.getCartDetails();
          console.log(response);
          if(response.data.length === 0) {
            setEmptyCart(true);
          }
          setCartDetails(response.data);
          const count = response.data.reduce((total, item) => total + item.quantity, 0);
          console.log(count);
          setCartCount(count);
        } catch (error) {
          console.error(error);
        }
      }, [deleteApproval]);
      
      useEffect(() => {
        getCartDetails();
      }, [getCartDetails]);

      
      const handleQuantityChange = async (id, increase) => {
        const productService = new ProductService();
        try {
          const response = await productService.updatedQuantityInCart(id, increase);
          console.log(response);
          if(response.data.quantity === 0) {
            await productService.deleteCartItem(response.data.id);
          }
          getCartDetails();
        } catch (error) {
          console.error(error);
        }
      }

    return (
        <Container>
            <div className='cart-container'>
                {!emptyCart ? (
                <div>
                    <table>
                        <tbody className="tr-border">
                            <th>Name</th>
                            <th>Description</th>
                            <th>Single Price</th>
                            <th>Total Price</th>
                            <th>Quantity</th>
                            <th>Action</th>
                            {cartDetails.map((c) => (
                                <tr  key={c.id}>
                                    <td>{c.product.productName}</td>
                                    <td>{c.product.productDescription}</td>
                                    <td>{c.product.productDiscountedPrice !== 0 && c.product.productDiscountedPrice !== null ? (
                                        <div>
                                            <div className='inline-price'>${c.product.productDiscountedPrice}</div> &nbsp; 
                                            <div  className='inline-price' style={{ textDecoration: 'line-through' }}>${c.product.productActualPrice}</div>
                                        </div>
                                    ) : (
                                        <div>${c.product.productActualPrice}</div>
                                    )}</td>
                                    <td>{c.product.productDiscountedPrice !== 0 && c.product.productDiscountedPrice !== null ? (
                                        <div>
                                                ${getTotalPrice(c.product.productDiscountedPrice, c.quantity)}
                                        </div>
                                    ) : (
                                        <div>
                                                ${getTotalPrice(c.product.productActualPrice, c.quantity)}
                                        </div>
                                    )}</td>
                                    <td>
                                        <button className='quantity-btn' onClick={() => handleQuantityChange(c.product.id, false)}>-</button>
                                        {c.quantity}
                                        <button className='quantity-btn' onClick={() => handleQuantityChange(c.product.id, true)}>+</button>
                                    </td>
                                    <td> 
                                        <Trash className='delete' onClick={() => handleShowDeleteModal(c)}></Trash>
                                        {showDeleteModal && <DeleteModal closeModal={handleHideDeleteModal} cart={selectedCart} setDeleteApproval = {setDeleteApproval}/>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className='place-order'>
                        <button className="btn-color" onClick = {() => navigate("/place-order")}>Checkout</button>
                    </div>
                </div>
                ) :
                (
                    <div>
                        <div class="empty-card-msg">
                            <h1>
                            Your cart is empty!
                            </h1>
                        </div>
                        <div>
                            <img  className="empty-cart-img" src="https://cdn2.iconfinder.com/data/icons/outline-web-application-1/20/cart-512.png" />
                        </div>
                        <div>
                            <button class="btn-color" onClick = {() => navigate("/")}>Shop now!</button>
                        </div>
                    </div>
                )
                }
            </div>
        </Container>
    );
}