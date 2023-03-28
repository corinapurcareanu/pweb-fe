import {React} from "react"
import './order-confirmation.css';
import { useNavigate } from 'react-router-dom';

export const OrderConfirmation = () => {
    const navigate = useNavigate();

    return(
        <div>
            <div className="welcome">
            <h1>
                Your order was placed successfully!
            </h1>
            </div>
            <div className="btn">
                <button className="btn-color" onClick={() => navigate('/')}>Continue Shopping </button>
            </div>
        </div>
    );
}