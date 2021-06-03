import { Route, RouteProps, Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useAuth } from '../context/useAuthContext';

const ProtectedRoute = (routeProps: RouteProps): JSX.Element => {
  const { loggedInUser } = useAuth();

  // render the page conditionally based on user being logged in
  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    return <Redirect to={{ pathname: '/login' }} />;
  } else {
    return <Route {...routeProps} />;
  }
};

export default ProtectedRoute;
