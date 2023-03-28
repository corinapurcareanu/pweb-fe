
import {React} from 'react'
import './show-product-details.css';
import { ImageListItem, ImageList} from '@material-ui/core';

function ProductModal({closeModal, product}) {
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
            <ImageList cols={2} rowHeight={300}>
                {product.productImages.map((image, index) => (
                <ImageListItem key={index} classes={{ item: "product-item" }}>
                    <div style={{ position: 'relative' }}>
                    <img src={image.url} className="img-props" />
                    </div>
                </ImageListItem>
                ))}
            </ImageList>
        </div>
        </div>
        
    );
}

export default ProductModal;