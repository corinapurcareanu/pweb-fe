
import {React} from 'react'
import './show-product-details.css';
import ProductService from '../../_services/product.service';

function DeleteModal({closeModal, product, setDeleteApproval}) {
    const productService = new ProductService();

    const handleDelete = async (id) => {
        const productService = new ProductService();
        try {
          await productService.deleteProduct(id);
          setDeleteApproval(true);
        } catch (error) {
          console.error(error);
        }
      }

    return (
        <div className="modalContainer">
        <div className="titleCloseBtn">
            Are you sure you want to delete product with id {product.id} ?
        </div>
        <div>
        <button className='no-btn-color'
            onClick={closeModal}
            >
            No, go back
            </button> &nbsp;
            <button className='yes-btn-color'
            onClick={() => {handleDelete(product.id); closeModal()}}
            >
            Yes, delete it!
            </button>
        </div>
        </div>
        
    );
}

export default DeleteModal;