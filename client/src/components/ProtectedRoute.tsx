import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useAuth } from '../context/useAuthContext';

interface Props {
  // eslint-disable-next-line
  component: React.ComponentType<any>;
  // eslint-disable-next-line
  [x: string]: any;
}

const ProtectedRoute = ({ component: Component, ...rest }: Props): JSX.Element => {
  const { loggedInUser } = useAuth();
  const history = useHistory();
  console.log(typeof Component);
  // render the page conditionally based on user being logged in
  return (
    <Route
      {...rest}
      render={(props) => {
        if (loggedInUser === undefined) return <CircularProgress />;
        if (!loggedInUser) {
          history.push('login');
        }
        return <Component {...rest} {...props} />;
      }}
    />
  );
};

export default ProtectedRoute;
