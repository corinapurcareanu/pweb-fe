import { useParams } from 'react-router-dom';
import './place-order.css';
import { Container, Row, Col} from 'react-bootstrap';
import UserAuthComponent from '../../_auth/user.auth';
import ProductService from '../../_services/product.service';
import { useState, useEffect, useCallback } from 'react';
import { Card, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
      padding: '10px',
    '& label.Mui-focused': {
      color: '#9e7361',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#9e7361',
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: '#9e7361',
      },
    },
  },
  btnColor: {
      backgroundColor: '#9e7361',
      width: '150px',
      color: 'white',
      '&:hover': {
        backgroundColor: '#9e7361',
      },
    },
});

export const PlaceOrder = ({ setCartCount }) => {
  const [cart, setCart] = useState([]);
  const [deliveryMethod, setDeliveryMethod] = useState(null);
  const [deliveryCost, setDeliveryCost] = useState(null);
  const [orderFullName, setOrderFullName] = useState('');
  const [orderFullAddress, setOrderFullAddress] = useState('');
  const [orderContactNumber, setOrderContactNumber] = useState('');
  const [orderAlternateContactNumber, setOrderAlternateContactNumber] = useState('');
  const [paid, setPaid] = useState(false);
  const [noDeliveryMethod, setNoDeliveryMethod] = useState(false);
  const [notPaid, setNotPaid] = useState(false);
  const [notEnoughStock, setNotEnoughStock] = useState([]);
  const classes = useStyles();
  const navigate = useNavigate();
  const [phoneNumberWrongFormat, setPhoneNumberWrongFormat] = useState(false);


  const handleOptionChange = (event) => {
    setDeliveryMethod(event.target.value);
    if(event.target.value === 'office') {
      setDeliveryCost(0);
    }
    if(event.target.value === 'postal') {
      setDeliveryCost(2);
    }
    if(event.target.value === 'courier') {
      setDeliveryCost(4);
    }
  };

  
  const handleSubmit = (event) => {
    event.preventDefault();
    setNoDeliveryMethod(false);
    setNotPaid(false);
    setPhoneNumberWrongFormat(false)
    setNotEnoughStock([]);
    const productService = new ProductService();

    if(!paid) {
      setNotPaid(true);
    }

    if(deliveryMethod === null) {
      setNoDeliveryMethod(true);
    }

    if(!isStringOnlyDigits(orderContactNumber) || (orderAlternateContactNumber !== '' && !isStringOnlyDigits(orderAlternateContactNumber))) {
      setPhoneNumberWrongFormat(true);
    }


    if(paid && deliveryMethod !== null && allProductsInStock() && isStringOnlyDigits(orderContactNumber) &&
    (orderAlternateContactNumber === '' || (orderAlternateContactNumber !== '' && isStringOnlyDigits(orderAlternateContactNumber)))) {
      console.log(notEnoughStock.length);
        productService.placeOrder({ orderFullName: orderFullName, orderFullAddress: orderFullAddress,  orderContactNumber : orderContactNumber,
          orderAlternateContactNumber : orderAlternateContactNumber, deliveryCost : deliveryCost, cart: cart})
        .then((response) => {
          console.log(response);
          setCartCount(0)
          navigate('/order-confirmation');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  const getCartDetails = useCallback(async () => {
    const productService = new ProductService();
    try {
      const response = await productService.getCartDetails();
      console.log(response); 
      setCart(response.data);
    } catch (error) {
      console.error(error);
    }
  }, []);
  
  useEffect(() => {
    getCartDetails();
  }, [getCartDetails]);

  function isStringOnlyDigits(str) {
    return /^\d+$/.test(str);
  }
  
  function getTotalPrice(price, quantity) {
    return price * quantity;
  }

  function getCalculatedGrandTotal() {
    let grandTotal = 0;
    cart.forEach(c => {
      if(c.product.productDiscountedPrice !== 0 && c.product.productDiscountedPrice !== null) {
        grandTotal = grandTotal + c.product.productDiscountedPrice * c.quantity;
      } else {
        grandTotal = grandTotal + c.product.productActualPrice * c.quantity;
      }
    })

    if(deliveryCost !== null) {
      grandTotal = grandTotal + deliveryCost;
    }

    return grandTotal;
  }

  function getDeliveryDays() {
    let days = -Infinity;

    cart.forEach(
      (c) => {
        if(c.product.deliveryDays != 0 && c.product.deliveryDays != null) {
          days = Math.max(days, c.product.deliveryDays)
        }
      }
    );
    return days;
  }

  function allProductsInStock() {
    let found = []
    cart.forEach(
      (c) => {
        console.log("stock" + c.product.productStock);
        console.log("q inainte" + c.quantity);
        if(c.product.productStock < c.quantity) {
          //c.quantity = c.product.productStock;
          found.push({ productName: c.product.productName, quantity: c.quantity })
        }

        console.log( "q dupa" + c.quantity);
      }
    );


    setNotEnoughStock(found);

    if(found.length > 0) {
      return false;
    }

    return true;
  }

  return (
    <div>
    <Container className='container'>
     <Col className="col-style">
        <div className='delivery'>
                  <h5 className='titles'>Complete personal infromation</h5>
          </div>
              <form onSubmit={handleSubmit}>
                        <TextField className={classes.root}
                        fullWidth
                        label="Full name"
                        variant="outlined"
                        value={orderFullName}
                        onChange={(event) => setOrderFullName(event.target.value)}
                        required
                        />
                    
                        <TextField className={classes.root}
                        fullWidth
                        label="Full address"
                        variant="outlined"
                        value={orderFullAddress}
                        onChange={(event) => setOrderFullAddress(event.target.value)}
                        required
                        />

                        <TextField className={classes.root}
                        fullWidth
                        label="Contact number"
                        variant="outlined"
                        value={orderContactNumber}
                        onChange={(event) => setOrderContactNumber(event.target.value)}
                        required
                        />
                        
                        <TextField className={classes.root}
                        fullWidth
                        label="Alternate contact number"
                        variant="outlined"
                        value={orderAlternateContactNumber}
                        onChange={(event) => setOrderAlternateContactNumber(event.target.value)}
                        />

                        {noDeliveryMethod && (
                          <div className="error-style">
                            Please choose a delivery method!
                          </div>
                        )}
                        {notPaid && (
                          <div className="error-style">
                            Please complete your payment!
                          </div>
                        )}
                        {phoneNumberWrongFormat && (
                          <div className="error-style">
                            Phone number should contain only digits!
                          </div>
                        )}
                    <Button variant="contained" className={classes.btnColor} type="submit">
                        Place Order
                    </Button>
                </form>
     </Col>
     <Col className="col-style">
            <div className='delivery'>
              <h5 className='titles'>Choose Payment method</h5>
            </div>
            <div style={{ maxWidth: "400px", minHeight: "200px" }}>
                    <PayPalScriptProvider
                        options={{
                            "client-id": "test",
                            components: "buttons",
                            currency: "USD"
                        }}
                    >
                         <PayPalButtons
                            style={{"layout":"vertical"}}
                            disabled={false}
                            forceReRender={[getCalculatedGrandTotal(), 'USD', {"layout":"vertical"}]}
                            fundingSource={undefined}
                            createOrder={(data, actions) => {
                                return actions.order
                                    .create({
                                        purchase_units: [
                                            {
                                                amount: {
                                                    currency_code: 'USD',
                                                    value: getCalculatedGrandTotal(),
                                                },
                                            },
                                        ],
                                    });
                            }}
                            onClick={function() {
                              setPaid(true);
                              }
                            }
                        />
              </PayPalScriptProvider>
            </div>
          <div className='delivery'>
          <h5 className='titles'>Delivery Method</h5>
          <form>
            <div>
              <label>
                <input
                  type="radio"
                  value="office"
                  checked={deliveryMethod === 'office'}
                  onChange={handleOptionChange}
                />
                Pickup from office - {getDeliveryDays()} Days - free
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  value="postal"
                  checked={deliveryMethod === 'postal'}
                  onChange={handleOptionChange}
                />
                Postal service - {getDeliveryDays() + 3} Days - 2$
              </label>
            </div>
            <div>
              <label>
                <input
                  type="radio"
                  value="courier"
                  checked={deliveryMethod === 'courier'}
                  onChange={handleOptionChange}
                />
                Courier service - {getDeliveryDays() + 1} Days - 4$
              </label>
            </div>
          </form>
          </div>
          <div className='delivery'>
          <h5 className='titles'>Cart Summary</h5>
            <table>
              <tbody className="tr-border">
                  <th>Name</th>
                  <th>Single Price</th>
                  <th>Quantity</th>
                  <th>Total Price</th>
                  {cart.map((c) => (
                      <tr  key={c.id}>
                          <td>{c.product.productName}</td>
                          <td>{c.product.productDiscountedPrice !== 0 && c.product.productDiscountedPrice !== null ? (
                              <div>
                                  <div className='inline-price'>${c.product.productDiscountedPrice}</div> &nbsp; 
                                  <div  className='inline-price' style={{ textDecoration: 'line-through' }}>${c.product.productActualPrice}</div>
                              </div>
                          ) : (
                              <div>${c.product.productActualPrice}</div>
                          )}</td>
                          <td>
                              {c.quantity}
                          </td>
                          <td>{c.product.productDiscountedPrice !== 0 && c.product.productDiscountedPrice !== null ? (
                              <div>
                                      ${getTotalPrice(c.product.productDiscountedPrice, c.quantity)}
                              </div>
                          ) : (
                              <div>
                                      ${getTotalPrice(c.product.productActualPrice, c.quantity)}
                              </div>
                          )}</td>
                      </tr>
                  ))}
                  {deliveryCost !== null &&
                  <tr>
                      <td></td>
                      <td></td>
                      <td>Delivery Cost</td>
                      <td> ${deliveryCost} </td>
                    </tr>
                  }
                   <tr>
                      <td></td>
                      <td></td>
                      <td>Total</td>
                      <td> ${getCalculatedGrandTotal()} </td>
                    </tr>
              </tbody>
          </table>
          {notEnoughStock.length > 0 && (
              <div className="error-style">
                The  maximum quantity available for the following products is this:
                    <br></br>
                    {notEnoughStock.map((p) => (
                      <div  key={p.id}>
                        {p.productName} - {p.quantity}
                        </div>
                    ))}
                    <br></br>
                    If you want to make any changes go back to <a href="/cart">your cart</a>.
              </div>
          )}
          </div>
     </Col>
    </Container>
    </div>
  );
}