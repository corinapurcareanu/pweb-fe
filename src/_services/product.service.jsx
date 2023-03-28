import axios from 'axios';
import { UserAuthComponent } from '../_auth/user.auth';

const PATH_OF_API = 'http://localhost:9090';
const userAuth = new UserAuthComponent();

class ProductService {

constructor() {}

  addNewProduct(product, imageFile) {
    console.log(imageFile)
    const formData = new FormData();
    formData.append('product', JSON.stringify(product));
    for (let i = 0; i < imageFile.length; i++) {
      formData.append('imageFile', imageFile[i].file, imageFile[i].file.name);
    }

    return axios.post(`${PATH_OF_API}/addNewProduct`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ` + userAuth.getToken(),
      },
    });
  }

  getAllProducts(number, searchkeyword = '') {
    return axios.get(
      `${PATH_OF_API}/getAllProducts?pageNumber=${number}&searchKey=${searchkeyword}`
    );
  }

  getAllProductsByType(number, types = '') {
    return axios.get(
      `${PATH_OF_API}/getAllProductsByType?pageNumber=${number}&types=${types}`
    );
  }

  deleteProduct(productId) {
    return axios.delete(`${PATH_OF_API}/deleteProductDetails/${productId}`, {
    headers: {
      Authorization: `Bearer ` + userAuth.getToken(),
    },});
  }

  getProductDetailsById(productId) {
    return axios.get(`${PATH_OF_API}/getProductDetailsById/${productId}`);
  }

  getProductDetails() {
    return axios.get(`${PATH_OF_API}/getProductDetails`);
  }

  placeOrder(orderInput) {
    return axios.post(`${PATH_OF_API}/placeOrder`, orderInput, {
      headers: {
        Authorization: `Bearer ` + userAuth.getToken(),
      },});
  }

  addToCart(productId) {
    return axios.get(`${PATH_OF_API}/addToCart/${productId}` , {
      headers: {
        Authorization: `Bearer ` + userAuth.getToken(),
      },});
  }

  updatedQuantityInCart(productId, increase) {
    return axios.get(
      `${PATH_OF_API}/updatedQuantityInCart/${productId}/${increase}`
      , {
        headers: {
          Authorization: `Bearer ` + userAuth.getToken(),
        },});
  }

  getCartDetails() {
    return axios.get(`${PATH_OF_API}/getCartDetails`, {
      headers: {
        Authorization: `Bearer ` + userAuth.getToken(),
      },});
  }

  
  getCartCount() {
    return axios.get(`${PATH_OF_API}/getCartCount`, {
      headers: {
        Authorization: `Bearer ` + userAuth.getToken(),
      },});
  }

  deleteCartItem(cartId) {
    return axios.delete(`${PATH_OF_API}/deleteCartItem/${cartId}`, {
      headers: {
        Authorization: `Bearer ` + userAuth.getToken(),
      },});
  }

  getOrderDetails() {
    return axios.get(`${PATH_OF_API}/getOrderDetails`, {
      headers: {
        Authorization: `Bearer ` + userAuth.getToken(),
      },});
  }

  getAllOrderDetailsForAdmin(status) {
    return axios.get(`${PATH_OF_API}/getAllOrderDetails/${status}`, {
      headers: {
        Authorization: `Bearer ` + userAuth.getToken(),
      },});
  }

  markAsDelivered(orderId) {
    return axios.get(`${PATH_OF_API}/markOrderAsDelivered/${orderId}`, {
      headers: {
        Authorization: `Bearer ` + userAuth.getToken(),
      },});
  }
};

export default ProductService;