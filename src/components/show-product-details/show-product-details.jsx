import './show-product-details.css';
import { Container, GridList, Modal} from '@material-ui/core';
import UserAuthComponent from '../../_auth/user.auth';
import ProductService from '../../_services/product.service';
import { useState, useEffect, useCallback } from 'react';
import ImageProcessingService from '../../_services/image.processing.service';
import { useNavigate } from 'react-router-dom';
import '@material-ui/core/styles';
import { Image, Pencil, Trash } from 'phosphor-react';
import ProductModal from './product-modal'
import DeleteModal from './delete-modal'

export const ShowProductDetails = () => {
    const [productDetails, setProductDetails] = useState([]);
    const userAuthService = new UserAuthComponent();
    const [showPreviousPageButton, setShowPreviousPageButton] = useState(false);
    const [showNextPageButton, setShowNextPageButton] = useState(false);
    const [showPageNumber, setShowPageNumber] = useState(true);
    const [pageNumber, setPageNumber] = useState(0);
    const navigate = useNavigate();
    const [key, setKey] = useState('');   
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteApproval, setDeleteApproval] = useState(false);

    const handleShowModal = (product) => {
        setShowModal(true);
        setSelectedProduct(product);
    }

    const handleHideModal = () => {
        setShowModal(false);
        setSelectedProduct(null);
    }

    const handleShowDeleteModal = (product) => {
        setShowDeleteModal(true);
        setSelectedProduct(product);
    }

    const handleHideDeleteModal = () => {
        setShowDeleteModal(false);
        setSelectedProduct(null);
    }

    const handleEdit = (product) => {
      navigate('/add-product', { state: { product: product } });
    };
    const nextPage = (event) => {
        event.preventDefault();
        setPageNumber(pageNumber + 1);
    }
    
    const previousPage= (event) => {
        event.preventDefault();
        setPageNumber(pageNumber - 1);
    }
    
    const getAllProducts = useCallback(async () => {
        console.log(deleteApproval);
        if(pageNumber > 0){
            setShowPreviousPageButton(true);
          } else {
            setShowPreviousPageButton(false);
          }
        const productService = new ProductService();
        const imageProcessingService = new ImageProcessingService();
        try {
            console.log(pageNumber);
          const productsResponse = await productService.getAllProducts(pageNumber, key);
          console.log(productsResponse);
          if(productsResponse.data.length === 12) {
            setShowNextPageButton(true);
            setShowPageNumber(true);
           } else {
            setShowNextPageButton(false);
            if(pageNumber === 0) {
                setShowPageNumber(false);
            } else {
                setShowPageNumber(true);
            }
           }
      
          const productsWithImages = await Promise.all(
            productsResponse.data.map(async (product) => {
              const productWithImages = await imageProcessingService.createImages(product);
              return productWithImages;
            })
          );
      
          setProductDetails(productsWithImages);
        } catch (error) {
          console.error(error);
        }
      }, [pageNumber, key, deleteApproval]);
      
      useEffect(() => {
        getAllProducts();
      }, [getAllProducts]);

      const searchByKeyword = (event) => {
        event.preventDefault();
        setKey('')
    };

    return (
        <Container>
            <div className="search-props">
                <form className="search-bar" onSubmit={searchByKeyword}>
                    <input
                        type="text"
                        placeholder="Find product"
                        name="searchKey"
                        id="searchKey"
                        value={key}
                        onChange={(event) => setKey(event.target.value)}
                    />
                    <button type="submit">
                        x

                    </button>
                </form>
            </div>

            <div className="table-prop">
                <table>
                    <tbody className="tr-border">
                        <th>Id</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Discounted Price</th>
                        <th>Actual Price</th>
                        <th>Stock</th>
                        <th>Delivery Days</th>
                        <th>Actions</th>
                        {productDetails.map((p) => (
                            <tr  key={p.id}>
                                <td>{p.id}</td>
                                <td>{p.productName}</td>
                                <td>{p.productDescription}</td>
                                <td>{p.productDiscountedPrice}</td>
                                <td>{p.productActualPrice}</td>
                                <td>{p.productStock}</td>
                                <td>{p.deliveryDays}</td>
                                <td>
                                    <Image className='actions'  onClick={() => handleShowModal(p)}></Image>
                                    {showModal && <ProductModal closeModal={handleHideModal} product={selectedProduct}/>}
                                    <Pencil className='edit' onClick={() => handleEdit(p)}></Pencil> 
                                    <Trash className='delete' onClick={() => handleShowDeleteModal(p)}></Trash>
                                    {showDeleteModal && <DeleteModal closeModal={handleHideDeleteModal} product={selectedProduct} setDeleteApproval = {setDeleteApproval}/>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='page-navigation'>
                <div  className='page-navigation-button'>
                    {showPreviousPageButton && (
                        <button className='page-navigation-button-color'  type="button"  onClick={previousPage} >{'<<'}</button>
                    )}
                </div>
                {showPageNumber && (<div className='page-navigation-page-number'> {pageNumber + 1} </div>
                )}
                <div  className='page-navigation-button'>
                    {showNextPageButton && (
                        <button className='page-navigation-button-color' type="button"  onClick={nextPage}>{'>>'}</button>
                    )}
                </div>
            </div>

        </Container>
    );
}