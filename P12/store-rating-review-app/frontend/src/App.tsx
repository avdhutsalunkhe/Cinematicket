import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Shared/Navbar';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import UserPage from './pages/UserPage';
import OwnerPage from './pages/OwnerPage';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/admin" component={AdminPage} />
        <Route path="/user" component={UserPage} />
        <Route path="/owner" component={OwnerPage} />
      </Switch>
    </Router>
  );
};

export default App;