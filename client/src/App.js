import { Switch, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import WishlistPage from './Pages/WishlistPage';

function App() {
  return (
    <Switch>
      <Route path="/wishlist" component={WishlistPage} />
      <Route path="/" component={HomePage} />
    </Switch>
  );
}

export default App;
