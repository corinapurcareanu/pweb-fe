import React from 'react';
import axios from 'axios';

class UserService extends React.Component {

  PATH_OF_API = "http://localhost:9090";

  requestHeader = {
    "No-Auth": "True"
  };

  constructor(props) {
    super(props);
    
  }

  login(loginData) {
    return axios.post(this.PATH_OF_API + "/authenticate", loginData, { headers: this.requestHeader });
  }

  roleMatch(allowedRoles) {
    const userRole = localStorage.getItem('role');

    if(userRole != null) {
      for(let i=0; i < allowedRoles.length; i++) {
        if(userRole.includes(allowedRoles[i])) {
          return true;
        }
      }
    }

    return false;
  }

  signUp(signUpData) {
    return axios.post(this.PATH_OF_API + "/registerUser", signUpData, { headers: this.requestHeader });
  }
}

export default UserService;