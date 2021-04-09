import "./App.css";

import jwt from "jsonwebtoken";
import { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import AuthenticatedRoute from "./components/AuthenticatedRoute";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Products from "./components/Products";

function App() {
  const [user, setUser] = useState(
    jwt.decode(localStorage.getItem("token"))?.user
  );

  const onLogin = (token) => {
    localStorage.setItem("token", token);
    setUser(jwt.decode(token).user);
  };

  const onLogout = () => {
    setTimeout(() => {
      localStorage.removeItem("token");
      setUser(null);
    }, 500);
  };

  return (
    <div className="App ">
      <Navbar onLogout={onLogout} user={user} />
      <div className="container mt-3">
        <Switch>
          <AuthenticatedRoute exact path="/products" user={user}>
            <Products user={user} />
          </AuthenticatedRoute>
          <Route
            exact
            path="/login"
            render={(props) => (
              <Login {...props} onLogin={onLogin} user={user} />
            )}
          />
          <Route exact path="/pepe" render={(props) => <h1>ola k ase</h1>} />
          <Redirect to="/products" />
        </Switch>
      </div>
    </div>
  );
}

export default App;
