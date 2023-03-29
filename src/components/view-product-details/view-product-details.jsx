import { useParams } from 'react-router-dom';
import './view-product-details.css';
import { Container, Row, Col} from 'react-bootstrap';
import UserAuthComponent from '../../_auth/user.auth';
import ProductService from '../../_services/product.service';
import { useState, useEffect, useCallback } from 'react';
import ImageProcessingService from '../../_services/image.processing.service';
import { ImageListItem } from '@material-ui/core'
import { useNavigate } from 'react-router-dom';
import '@material-ui/core/styles';
import { GridList, GridListTile } from '@material-ui/core';
import ConfirmModal from './confirm-modal'
import NotLoggedModal from './not-logged-modal'

export const ViewProductDetails = ({setCartCount}) => {
  const { productId } = useParams();
  
  const [product, setProduct] = useState();
  const [selectedImage, setSelectedImage] = useState(0);
  const userAuth  = new UserAuthComponent();
  const productService = new ProductService();

  const [showModal, setShowModal] = useState(false);
  const [showNotLoggedModal, setShowNotLoggedModal] = useState(false);

  const handleShowModal = () => {
      setShowModal(true);
      console.log(showModal);
  }

  const handleHideModal = () => {
      setShowModal(false);
  };

  const handleShowNotLoggedModal = () => {
    setShowNotLoggedModal(true);
}

const handleHideNotLoggedModal = () => {
  setShowNotLoggedModal(false);
};

  const changeIndex = (event, index) => {
    event.preventDefault()
    setSelectedImage(index);
  }
  
  const handleAddToCart = async (productId) => {
    try {
      await productService.addToCart(productId);
      try {
        const response = await productService.getCartDetails();
        console.log(response);
        const count = response.data.reduce((total, item) => total + item.quantity, 0);
        console.log(count);
        setCartCount(count);
      } catch (error) {
        console.error(error);
      }
      
    } catch (error) {
      console.error(error);
    }
  };

  const getProductDetailsById = useCallback(async () => {
      const productService = new ProductService();
      const imageProcessingService = new ImageProcessingService();
      try {
        const productResponse = await productService.getProductDetailsById(productId);
        const productWithImages =  await imageProcessingService.createImages(productResponse.data);
    
        setProduct(productWithImages);
      } catch (error) {
        console.error(error);
      }
    }, []);
    
    useEffect(() => {
      getProductDetailsById();
    }, [getProductDetailsById]);

  return (
    <div>
    <Container className='container'>
     <Col className="col">
    
      <div className="image-container">
          <img src={product?.productImages[selectedImage]?.url} className="product-zoom-image" />
      </div>

      <div>
      <GridList cols={4} cellHeight="1:1" spacing={10}>
        {product?.productImages.map((file, i) => (
          <ImageListItem key={i} className="images">
            <img src={file.url} alt="" onClick={(event) => changeIndex(event, i)} className="product-small-image" />
          </ImageListItem>
        ))}
      </GridList>
    </div>
     </Col>
     <Col className="col">
        <div className="product-information">
          <div className="row">
            <h2>
              {product?.productName}
            </h2>
          </div>
          <div className="row">
          <b>Description:</b> <br/>
            {product?.productDescription}
          </div>
          {product?.productDiscountedPrice !== 0 && product?.productDiscountedPrice !== null ?
            <div className="row">
              <b>
                ${product?.productDiscountedPrice}
              </b>
              &nbsp;
              <b style={{textDecoration: "line-through"}}>
                ${product?.productActualPrice}
              </b>
            </div>
            :
            <div className="row">
              <b>
                ${product?.productActualPrice}
              </b>
            </div>
          }
          <div className="text-center" style={{paddingTop: "300px"}}>
            {product?.productStock > 0 ? (
              <><div>
                  {(userAuth.isLoggedIn() && !userAuth.isAdmin())&& <><button className="btn-color" onClick={() =>{ handleShowModal();handleAddToCart(product.id)}}>
                    Add to cart
                  </button><div>
                  {showModal && <ConfirmModal closeModal={handleHideModal}/>}
                    </div></>
                  }
                </div>
                <div>
                  {(!userAuth.isLoggedIn())&& <><button className="btn-color" onClick={handleShowNotLoggedModal}>
                    Add to cart
                  </button><div>
                  {showNotLoggedModal && <NotLoggedModal closeModal={handleHideNotLoggedModal}/>}
                    </div></>
                  }
                </div>
                <div>
                   {userAuth.isAdmin() && <button className="btn-disabled">
                      Add to cart
                    </button>}
                  </div></>
            )
             :
              (<div>
                <h5>Product out of stock!</h5>
              </div>)
            }
          </div>
        </div>
     </Col>
    </Container>
    </div>
  );
}