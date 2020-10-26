import React from 'react';
import MyNavbar from './components/UI/Navbar/MyNavbar';
import Home from './components/Home/Home';
import UserProvider from './contexts/UserContext';

function App() {
  return (
    <UserProvider>
      <MyNavbar />
      <Home />
    </UserProvider>
  );
}

export default App;
