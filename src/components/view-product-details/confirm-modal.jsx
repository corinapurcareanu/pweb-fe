
import {React} from 'react'
import './view-product-details.css';
import { useNavigate } from "react-router-dom";

function ConfirmModal({closeModal}) {
    const navigate = useNavigate();
    return (
        <div className="modalContainer">
        <div className="titleModal">
           Product added to cart!
        </div>
        <div>
        <button className='continue-btn-color'
            onClick={closeModal}
            >
            Continue Shopping
            </button> &nbsp;
            <button className='cart-btn-color'
            onClick={() => {closeModal(); navigate('/cart')}}
            >
            Go to cart
            </button>
        </div>
        </div>
        
    );
}

export default ConfirmModal;