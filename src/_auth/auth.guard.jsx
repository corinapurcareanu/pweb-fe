import { Route, Redirect, useNavigate } from 'react-router-dom';
import { UserAuthComponent } from './user.auth';
import { useEffect } from 'react';

const PrivateRoute = ({ role, element: Element, ...rest }) => {
  const userAuth =  new UserAuthComponent();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userAuth.isLoggedIn()) {
      navigate('/accessForbidden', { replace: true });
    } else if (role && !userAuth.getRole().includes(role)) {
      navigate('/accessForbidden', { replace: true });
    }
  }, [userAuth, navigate, role]);

  return userAuth.isLoggedIn() && (!role || userAuth.getRole().includes(role)) ? Element : null;
};

export default PrivateRoute;