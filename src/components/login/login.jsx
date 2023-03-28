import {React} from "react"
import './login.css';
import { useState } from 'react';
import { Container, Card, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import UserService from '../../_services/user.service';
import UserAuthComponent from '../../_auth/user.auth';
import { useNavigate } from 'react-router-dom';
import ProductService from "../../_services/product.service";

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

export const Login = ({setCartCount}) => {
    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [wrongCredentials, setWrongCredentials] = useState(false);
    const classes = useStyles();

    const userService = new UserService();
    const userAuthService = new UserAuthComponent();
    const navigate = useNavigate();

      
  const handleCartCount = async () => {
    const productService = new ProductService();
      try {
        const response = await productService.getCartDetails();
        console.log(response);
        const count = response.data.reduce((total, item) => total + item.quantity, 0);
        console.log(count);
        setCartCount(count);
      } catch (error) {
        console.error(error);
      }
      
  };

  const handleSubmit = (event) => {
    setWrongCredentials(false);

    event.preventDefault();

    userService.login({ userName: userName, userPassword: userPassword })
      .then((response) => {
        userAuthService.setRole(response.data.user.role.roleName);
        userAuthService.setName(response.data.user.userFirstName);
        userAuthService.setToken(response.data.jwtToken);
        console.log(response);
        handleCartCount();
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        setWrongCredentials(true);
      });
    
  };

    return (
        <><div className="welcome">
            <h1>Please Log in!</h1>
            </div>
            <Container maxWidth="sm" className="mt-5">
                <Card style={{ padding: '20px' }}>                   
                <form onSubmit={handleSubmit}>
    
                        <TextField className={classes.root}
                        fullWidth
                        label="Enter your username"
                        variant="outlined"
                        value={userName}
                        onChange={(event) => setUserName(event.target.value)}
                        required
                        />
                    
                        <TextField className={classes.root}
                        fullWidth
                        label="Enter your password"
                        variant="outlined"
                        type="password"
                        value={userPassword}
                        onChange={(event) => setUserPassword(event.target.value)}
                        required
                        />
                        {wrongCredentials && (
                          <div className="error-style">
                            Wrong credentials!
                          </div>
                        )}
                    <Button variant="contained" className={classes.btnColor} type="submit">
                        Login
                    </Button>
                </form>
            </Card>
        </Container>

        <div className="content">
            Don't have an account yet? <a href="/sign-up"> Sign-up</a>
        </div>
        </>
    );
}