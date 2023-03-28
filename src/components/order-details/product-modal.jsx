
import {React} from 'react'
import './order-details.css';

function ProductModal({closeModal, products}) {

    function getTotalPrice(price, quantity) {
        return price * quantity;
    }

    return (
        <div className="modalContainer">
        <div className="titleCloseBtn">
            <button
            onClick={closeModal}
            >
            X
            </button>
        </div>
        <div>
        <table>
                    <tbody className="tr-border">
                        <th>Name</th>
                        <th>Single Price</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                        {products.map((p) => (
                            <tr  key={p.id}>
                                <td>{p.product.productName}</td>
                                <td>{p.product.productDiscountedPrice !== 0 && p.product.productDiscountedPrice !== null ? (
                                    <div>
                                        <div className='inline-price'>${p.product.productDiscountedPrice}</div> &nbsp; 
                                        <div  className='inline-price' style={{ textDecoration: 'line-through' }}>${p.product.productActualPrice}</div>
                                    </div>
                                ) : (
                                    <div>${p.product.productActualPrice}</div>
                                )}</td>
                                <td>{p.quantity}</td>
                                <td>{p.product.productDiscountedPrice !== 0 && p.product.productDiscountedPrice !== null ? (
                                    <div>
                                         {getTotalPrice(p.product.productDiscountedPrice, p.quantity)}
                                    </div>
                                ) : (
                                    <div>
                                         {getTotalPrice(p.product.productActualPrice, p.quantity)}
                                    </div>
                                )}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
        </div>
        </div>
        
    );
}

export default ProductModal;