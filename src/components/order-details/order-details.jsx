import './order-details.css';
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

export const OrderDetails = () => {
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
            const response = (await productService.getAllOrderDetailsForAdmin(status))
            setOrderDetails(response.data);
            console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      }, [status]);
      
      useEffect(() => {
        getOrderDetails();
      }, [getOrderDetails]);

      const handleStatusChange = async (orderId) => {
        const productService = new ProductService();
        try {
          await productService.markAsDelivered(orderId);
          getOrderDetails();
        } catch (error) {
          console.error(error);
        }
      }
      
    return (
        <Container>
            <div className='filter'>
                <div className="dropdown">
                    <Filter />
                    <div className="dropdown-content">
                    <table>
                    <tr>
                        <td>
                            {status !== 'All' ? (
                                <button className="dropbtn-filter"  onClick={() => setStatus('All') }>All </button>
                            ): 
                            (
                                <button className="dropbtn-current-filter"  onClick={() => setStatus('All') }>All </button>
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {status !== 'Placed' ? (
                                <button className="dropbtn-filter"  onClick={() => setStatus('Placed') }>Placed </button>
                            ): 
                            (
                                <button className="dropbtn-current-filter"  onClick={() => setStatus('Placed') }>Placed </button>
                            )}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            {status !== 'Delivered' ? (
                                <button className="dropbtn-filter"  onClick={() => setStatus('Delivered') }>Delivered </button>
                            ): 
                            (
                                <button className="dropbtn-current-filter"  onClick={() => setStatus('Delivered') }>Delivered </button>
                            )}
                        </td>
                    </tr>
                </table>
                    </div>
                </div>
            </div>
            <br></br>
            <div className="order-table-prop">
                <table>
                    <tbody className="tr-border">
                        <th>Id</th>
                        <th>Username</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Contact number</th>
                        <th>Date placed</th>
                        <th>Order Details</th>
                        <th>Order Amount</th>
                        <th>Delivery Method</th>
                        <th>Status</th>
                        <th>Change Status</th>
                        {orderDetails.map((o) => (
                            <tr>
                                <td>{o.id}</td>
                                <td>{o.user.userName}</td>
                                <td>{o.orderFullName}</td>
                                <td>{o.orderFullAddress}</td>
                                <td>{o.orderContactNumber}</td>
                                <td>{o.orderDatePlaced}</td>
                                <td><button className='btn-color'  onClick={() => handleShowModal(o.products)}>View Details</button>
                                    {showModal && <ProductModal closeModal={handleHideModal} products={selectedProducts}/>}
                                    </td>
                                <td>{o.orderAmount}</td>
                                <td>{o.deliveryMethod}</td>
                                <td>{o.orderStatus}</td>
                                <td>
                                    {o.orderStatus === 'Placed' &&
                                        <button className='btn-color'  onClick={() => {handleStatusChange(o.id)}}>Change Status</button>
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Container>
    );
}