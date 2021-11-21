import { Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './Pages/HomePage';
import WishlistPage from './Pages/WishlistPage';
import LoginPage from './Pages/LoginPage';
import RegistrationPage from './Pages/RegistrationPage';
import EditRegistrationPage from './Pages/EditRegistrationPage';
import AdminPage from './Pages/AdminPage';

function App() {
  

  return (
    <div className="body">
      <Navigation />
      <div className="container">
        <Switch>
          <Route path="/admin" component={AdminPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/registration/edit" component={EditRegistrationPage} />
          <Route path="/registration" component={RegistrationPage} />
          <Route path="/wishlist" component={WishlistPage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
