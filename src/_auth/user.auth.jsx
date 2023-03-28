class UserAuthComponent {
    constructor() {}
  
    setRole = (role) => {
      localStorage.setItem('roles', JSON.stringify(role));
    };
  
    getRole = () => {
      return localStorage.getItem('roles');
    };
  
    setName = (name) => {
      localStorage.setItem('name', name);
    };
  
    getName = () => {
      return localStorage.getItem('name') || '';
    };
  
    setToken = (jwtToken) => {
      localStorage.setItem('jwtToken', jwtToken);
    };
  
    getToken = () => {
      return localStorage.getItem('jwtToken') || '';
    };
  
    clear = () => {
      localStorage.clear();
    };
  
    isLoggedIn = () => {
      return this.getRole() != null ? true : false;
    };
  
    isAdmin = () => {
      const role = this.getRole();
      if (role != null) {
        return role.includes('admin');
      }
      return false;
    };
  }

  export default UserAuthComponent;
  export { UserAuthComponent };