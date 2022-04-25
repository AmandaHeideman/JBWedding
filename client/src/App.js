import { Switch, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './Pages/HomePage';
import WishlistPage from './Pages/WishlistPage';
import LoginPage from './Pages/LoginPage';
import RegistrationPage from './Pages/RegistrationPage';
import EditRegistrationPage from './Pages/EditRegistrationPage';
import AdminPage from './Pages/AdminPage';
import GuestListPage from './Pages/GuestListPage';
import WeddingDayPage from './Pages/WeddingDayPage';
import DirectionsPage from './Pages/DirectionsPage';

function App() {
  

  return (
    <div className="body">
      <Navigation />
      <div className="container pt-5">
        <Switch>
          <Route path="/admin/guestlist" component={GuestListPage} />
          <Route path="/admin" component={AdminPage} />
          <Route path="/directions" component={DirectionsPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/registration/edit" component={EditRegistrationPage} />
          <Route path="/registration" component={RegistrationPage} />
          <Route path="/weddingday" component={WeddingDayPage} />
          <Route path="/wishlist" component={WishlistPage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
