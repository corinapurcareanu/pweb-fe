import './my-orders.css';
import { Container, GridList, GridListTile} from '@material-ui/core';
import UserAuthComponent from '../../_auth/user.auth';
import ProductService from '../../_services/product.service';
import { useState, useEffect, useCallback } from 'react';
import ImageProcessingService from '../../_services/image.processing.service';
import { ImageListItem } from '@material-ui/core'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import ProductModal from './product-modal'
import { Filter } from 'react-bootstrap-icons';
import '@material-ui/core/styles';

export const MyOrders = () => {
    const [orderDetails, setOrderDetails] = useState([]);
    const [status, setStatus] = useState('All')   
     const [selectedProducts, setSelectedProducts] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const productService = new ProductService();

    const handleShowModal = (product) => {
        setShowModal(true);
        setSelectedProducts(product);
    }

    const handleHideModal = () => {
        setShowModal(false);
        setSelectedProducts(null);
    };

    const getOrderDetails = useCallback(async () => {
        const productService = new ProductService();
        try {
            const response = (await productService.getOrderDetails())
            setOrderDetails(response.data);
            console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      }, [status]);
      
      useEffect(() => {
        getOrderDetails();
      }, [getOrderDetails]);

    return (
        <Container>
            <div className="order-table-prop">
                <table>
                    <tbody className="tr-border">
                        <th>Id</th>
                        <th>Date placed</th>
                        <th>Order Details</th>
                        <th>Order Amount</th>
                        <th>Delivery Method</th>
                        <th>Status</th>
                        {orderDetails.map((o) => (
                            <tr>
                                <td>{o.id}</td>
                                <td>{o.orderDatePlaced}</td>
                                <td><button className='btn-color'  onClick={() => handleShowModal(o.products)}>View Details</button>
                                    {showModal && <ProductModal closeModal={handleHideModal} products={selectedProducts}/>}
                                    </td>
                                <td>{o.orderAmount}</td>
                                <td>{o.deliveryMethod}</td>
                                <td>{o.orderStatus}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Container>
    );
}