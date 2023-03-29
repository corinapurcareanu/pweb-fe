import {React} from "react"
import './sign-up.css';
import { useState } from 'react';
import { Container, Card, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import UserService from '../../_services/user.service';
import UserAuthComponent from '../../_auth/user.auth';
import { useNavigate } from 'react-router-dom';

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

export const SignUp = () => {
    const [userName, setUserName] = useState('');
    const [userFirstName, setUserFirstName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPhoneNumber, setUserPhoneNumber] = useState(null);
    const [phoneNumberWrongFormat, setPhoneNumberWrongFormat] = useState(false);
    const [shortPassword, setShortPassword] = useState(false);
    const [shortUserName, setShortUserName] = useState(false);
    const [duplicateUser, setDuplicateUser] = useState(false);
    const classes = useStyles();

    const userService = new UserService();
    const userAuthService = new UserAuthComponent();
    const navigate = useNavigate();

  const handleSubmit = (event) => {
    setPhoneNumberWrongFormat(false);
    setShortPassword(false);
    setShortUserName(false);
    setDuplicateUser(false);

    event.preventDefault();

    if(userPhoneNumber !== null && !isStringOnlyDigits(userPhoneNumber)) {
      setPhoneNumberWrongFormat(true);
    }

    if(userPassword.length < 6) {
      setShortPassword(true);
    }

    if(userName.length < 6) {
      setShortUserName(true);
    }

    if((userPhoneNumber === null || (userPhoneNumber !== null && isStringOnlyDigits(userPhoneNumber))) && 
      userPassword.length >= 6 && userName.length >= 6) {
    userService.signUp({ userName: userName, userFirstName: userFirstName,  userLastName: userLastName, 
      userEmail: userEmail,  userPhoneNumber: userPhoneNumber, userPassword: userPassword })
      .then((response) => {
        console.log(response);
        navigate('/authenticate');
      })
      .catch((error) => {
        console.log(error);
        setDuplicateUser(true);
      });
    }
    
  };

  function isStringOnlyDigits(str) {
    return /^\d+$/.test(str);
  }

    return (
        <><div className="welcome">
            <h1>Please Sign Up!</h1>
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
                      {shortUserName && (
                          <div className="error-style">
                            User name should have at least 6 characters!
                          </div>
                        )}

                        <TextField className={classes.root}
                        fullWidth
                        label="Enter your first name"
                        variant="outlined"
                        value={userFirstName}
                        onChange={(event) => setUserFirstName(event.target.value)}
                        required
                        />
                        
                        <TextField className={classes.root}
                        fullWidth
                        label="Enter your last name"
                        variant="outlined"
                        value={userLastName}
                        onChange={(event) => setUserLastName(event.target.value)}
                        required
                        />

                        <TextField className={classes.root}
                        fullWidth
                        label="Enter your email"
                        variant="outlined"
                        value={userEmail}
                        type="email"
                        onChange={(event) => setUserEmail(event.target.value)}
                        required
                        />

                      <TextField className={classes.root}
                        fullWidth
                        label="Enter your phone number"
                        variant="outlined"
                        value={userPhoneNumber}
                        onChange={(event) => setUserPhoneNumber(event.target.value)}
                        />

                        {phoneNumberWrongFormat && (
                          <div className="error-style">
                            Phone number should contain only digits!
                          </div>
                        )}

                        <TextField className={classes.root}
                        fullWidth
                        label="Enter your password"
                        variant="outlined"
                        type="password"
                        value={userPassword}
                        onChange={(event) => setUserPassword(event.target.value)}
                        required
                        />
                      {shortPassword && (
                          <div className="error-style">
                            Password should have at least 6 characters!
                          </div>
                        )}
                        {duplicateUser && (
                          <div className="error-style">
                            User already registered!
                          </div>
                        )}
                    <Button variant="contained" className={classes.btnColor} type="submit">
                        Sign Up
                    </Button>
                </form>
            </Card>
        </Container>

        <div className="content">
            Already have an account? <a href="/authenticate"> Login</a>
        </div>
        </>
    );
}