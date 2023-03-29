import '../../makeup.css';
import { Container, GridList} from '@material-ui/core';
import UserAuthComponent from '../../../../../_auth/user.auth';
import ProductService from '../../../../../_services/product.service';
import { useState, useEffect, useCallback } from 'react';
import ImageProcessingService from '../../../../../_services/image.processing.service';
import { ImageListItem } from '@material-ui/core'
import { useNavigate } from 'react-router-dom';
import '@material-ui/core/styles';

export const FacePowder = () => {
    const [productDetails, setProductDetails] = useState([]);
    const userAuthService = new UserAuthComponent();
    const [showPreviousPageButton, setShowPreviousPageButton] = useState(false);
    const [showNextPageButton, setShowNextPageButton] = useState(false);
    const [showPageNumber, setShowPageNumber] = useState(true);
    const [pageNumber, setPageNumber] = useState(0);
    const navigate = useNavigate();

    const nextPage = (event) => {
        event.preventDefault();
        setPageNumber(pageNumber + 1);
    }
    
    const previousPage= (event) => {
        event.preventDefault();
        setPageNumber(pageNumber - 1);
    }
    
    const getAllProducts = useCallback(async () => {
        if(pageNumber > 0){
            setShowPreviousPageButton(true);
          } else {
            setShowPreviousPageButton(false);
          }
        const productService = new ProductService();
        const imageProcessingService = new ImageProcessingService();
        try {
            console.log(pageNumber);
            const productsResponse = await productService.getAllProductsByType(pageNumber, "Face powder")
          if(productsResponse.data.length === 12) {
            setShowNextPageButton(true);
           } else {
            setShowNextPageButton(false);
            if(pageNumber === 0) {
                setShowPageNumber(false);
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
      }, [pageNumber]);
      
      useEffect(() => {
        getAllProducts();
      }, [getAllProducts]);

    return (
        <Container>
              <div className="banner-img">
                    <img src="https://www.long-time-liner-onlineshop.com/wp-content/uploads/2018/08/Lips_Nude_Pink-1.png" />
                    <div className="top-left-title">Face Powder</div>
                    <div className="top-left-content">
                    Get a perfect matte finish with our range of face powders. Our powders are designed to absorb excess oil and minimize shine, while also providing a natural-looking finish. Plus, our products are formulated with skin-friendly ingredients that are gentle on your skin, making them perfect for daily use.
                    </div>
                </div>

            <div className="products">
                <GridList cols={4} cellHeight="3:5" spacing={10}>
                    {productDetails.map((p) => (
                        <ImageListItem key={p.id} classes={{ item: "product-item" }}>
                            <div>
                                <img src={p.productImages[0].url} alt="Product" className="home-page-product-image" />
                            </div>
                            <div className='name-position'>
                                <p><b>{p.productName}</b></p>
                            </div>

                            <div className='price-position'>
                                {p.productDiscountedPrice !== 0 && p.productDiscountedPrice !== null ? (
                                        <p><b>${p.productDiscountedPrice}</b> &nbsp; <b style={{ textDecoration: 'line-through' }}>${p.productActualPrice}</b></p>
                                    ) : (
                                        <p><b>${p.productActualPrice}</b></p>
                                    )}
                            </div>

                            <div className="btn-position">
                            <button type="button" className="btn-color" style={{ width: '80%' }} onClick={() => navigate(`/view-product-details/${p.id}`)}>View</button>
                            </div>
                        </ImageListItem>
                    ))}
                </GridList>
            </div>

            <div className="small-products">
                <GridList cols={2} cellHeight="3:5" spacing={10}>
                    {productDetails.map((p) => (
                        <ImageListItem key={p.id} classes={{ item: "product-item" }}>
                            <div>
                                <img src={p.productImages[0].url} alt="Product" className="home-page-product-image" />
                            </div>
                            <div className='name-position'>
                                <p><b>{p.productName}</b></p>
                            </div>

                            <div className='price-position'>
                                {p.productDiscountedPrice !== 0 && p.productDiscountedPrice !== null ? (
                                        <p><b>${p.productDiscountedPrice}</b> &nbsp; <b style={{ textDecoration: 'line-through' }}>${p.productActualPrice}</b></p>
                                    ) : (
                                        <p><b>${p.productActualPrice}</b></p>
                                    )}
                            </div>

                            <div className="btn-position">
                            <button type="button" className="btn-color" style={{ width: '80%' }} onClick={() => navigate(`/view-product-details/${p.id}`)}>View</button>
                            </div>
                        </ImageListItem>
                    ))}
                </GridList>
            </div>
            <br></br>
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