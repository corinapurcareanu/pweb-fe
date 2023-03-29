import './makeup.css';
import { Container, GridList} from '@material-ui/core';
import UserAuthComponent from '../../../_auth/user.auth';
import ProductService from '../../../_services/product.service';
import { useState, useEffect, useCallback } from 'react';
import ImageProcessingService from '../../../_services/image.processing.service';
import { ImageListItem } from '@material-ui/core'
import { useNavigate } from 'react-router-dom';
import '@material-ui/core/styles';


export const MakeUp = () => {
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
            const productsResponse = await productService.getAllProductsByType(pageNumber,  "Make-up brushes, Eyebrows gel, Eyebrows pencil, Eye pencil, Eyeliner, False lashes, Mascara, Make-up palette, Concelear, Face powder, Foundation, Gloss, Lip balm, Lip pencil, Lipstick, Nail base, Nail polish, Top coat")
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
                    <img src="https://images.squarespace-cdn.com/content/v1/5c5511bd0cf57deee8f5bd59/1555983447525-JT066R3WLG9RTAVP6MQT/west-palm-beach-makeup-artist-banner.jpg?format=2500w" />
                    <div className="top-left-title">Make-up</div>
                    <div className="top-left-content">
                        Experience the ultimate in luxury with our high-end makeup line. Indulge in rich, velvety textures and gorgeous, highly-pigmented colors that will make you feel like royalty
                    </div>
                </div>
            <div>
             <table>
                <tbody>
                    <tr>
                    <td className='td-padding'>
                        <button className="menu-makeup" onClick={() => window.location.pathname = '/make-up/face'}>
                        Face
                        </button>
                    </td>
                    <td className='td-padding'>
                        <button className="menu-makeup" onClick={() => window.location.pathname = '/make-up/eyes'}>
                        Eyes
                        </button>
                    </td>
                    <td className='td-padding'>
                        <button className="menu-makeup" onClick={() => window.location.pathname = '/make-up/eyebrows'}>
                        Eyebrows
                        </button>
                    </td>
                    </tr>
                    <tr>
                    <td className='td-padding'>
                        <button className="menu-makeup" onClick={() => window.location.pathname = '/make-up/lips'}>
                        Lips
                        </button>
                    </td>
                    <td className='td-padding'>
                        <button className="menu-makeup" onClick={() => window.location.pathname = '/make-up/nails'}>
                        Nails
                        </button>
                    </td>
                    <td className='td-padding'>
                        <button className="menu-makeup" onClick={() => window.location.pathname = '/make-up/brushes'}>
                        Make-up brushes
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