import { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import { UserContext } from './context/userContext';
import Navigation from './components/Navigation';
import HomePage from './Pages/HomePage';
import WishlistPage from './Pages/WishlistPage';
import LoginPage from './Pages/LoginPage';

function App() {
  
  const [isLoggedin, setIsLoggedin] = useState(false);

  return (
    <div className="body">
      <UserContext.Provider value={{ isLoggedin, setIsLoggedin }}>
        <Navigation />
        <div className="container">
          <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/wishlist" component={WishlistPage} />
            <Route path="/" component={HomePage} />
          </Switch>
        </div>
      </UserContext.Provider>
    </div>
  );
}

export default App;
