import { MuiThemeProvider } from '@material-ui/core';
import { theme } from './themes/theme';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import Profile from './pages/Profile/Profile';
import ReferFriend from './pages/ReferFriend/ReferFriend';
import { AuthProvider } from './context/useAuthContext';
import { SocketProvider } from './context/useSocketContext';
import { SnackBarProvider } from './context/useSnackbarContext';
import ProtectedRoute from './components/ProtectedRoute';
import { useState } from 'react';

import './App.css';

function App(): JSX.Element {
  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <SnackBarProvider>
          <AuthProvider>
            <SocketProvider>
              <Switch>
                {/* <Route
                  exact
                  path="/join/:id"
                  component={() => {
                    const [open, setOpen] = useState(true);
                    const handleClose = () => {
                      setOpen(false);
                    };
                    return <ReferFriend open={open} handleClose={handleClose} />;
                  }}
                /> */}
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <ProtectedRoute exact path="/dashboard" component={Dashboard} />
                <ProtectedRoute exact path="/profile" component={Profile} />
                <Route path="*">
                  <Redirect to="/login" />
                </Route>
              </Switch>
            </SocketProvider>
          </AuthProvider>
        </SnackBarProvider>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
