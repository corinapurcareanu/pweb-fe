import '../makeup.css';
import { Container, GridList} from '@material-ui/core';
import UserAuthComponent from '../../../../_auth/user.auth';
import ProductService from '../../../../_services/product.service';
import { useState, useEffect, useCallback } from 'react';
import ImageProcessingService from '../../../../_services/image.processing.service';
import { ImageListItem } from '@material-ui/core'
import { useNavigate } from 'react-router-dom';
import '@material-ui/core/styles';

export const Face = () => {
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
            const productsResponse = await productService.getAllProductsByType(pageNumber, "Concelear, Face powder, Foundation")
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
                    <img src="data:image/jpeg;base64,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" />
                    <div className="top-left-title">Face</div>
                    <div className="top-left-content">
                    Discover the power of our range of lipsticks, designed to help you express yourself in the most beautiful way possible. Our luxurious and hydrating formula glides on effortlessly, providing rich and bold color that lasts all day. With a range of shades to choose from, it's easy to find the perfect product to suit your style and mood.
                    </div>
                </div>

                <div>
                <table>
                    <tbody>
                        <tr>
                        <td className='td-padding'>
                            <button className="menu-makeup" onClick={() => window.location.pathname = '/make-up/face/concealer'}>
                            Concelear
                            </button>
                        </td>
                        <td className='td-padding'>
                            <button className="menu-makeup" onClick={() => window.location.pathname = '/make-up/face/foundation'}>
                            Foundation
                            </button>
                        </td>
                        <td className='td-padding'>
                            <button className="menu-makeup" onClick={() => window.location.pathname = '/make-up/face/face-powder'}>
                            Face powder
                            </button>
                        </td>
                        </tr>
                    </tbody>
                </table>
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