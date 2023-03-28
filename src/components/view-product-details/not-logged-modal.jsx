
import {React} from 'react'
import './view-product-details.css';
import { useNavigate } from "react-router-dom";

function NotLoggedModal({closeModal}) {
    return (
        <div className="modalContainer">
        <div className="titleCloseBtn">
           x
        </div>
        <div className="body">
            Please <a href="/authenticate">log in</a> to add products to cart!
        </div>
        </div>
        
    );
}

export default NotLoggedModal;