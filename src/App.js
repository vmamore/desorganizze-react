import React from 'react';
import PrivateRoute from './components/PrivateRoute';
import Home from './components/Home/Home';
import UserProvider from './contexts/UserContext';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './components/Login/Login';

function App() {
  return (
    <UserProvider>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/">
            <Home />
          </PrivateRoute>
        </Switch>
      </Router>
    </UserProvider>
  );
}

export default App;
