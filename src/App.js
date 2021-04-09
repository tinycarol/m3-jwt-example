import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import jwt from "jsonwebtoken";
import { useState } from "react";
import Tweets from "./components/Tweets";
import AuthenticatedRoute from "./components/AuthenticatedRoute";

function App() {
  const [user, setUser] = useState(
    jwt.decode(localStorage.getItem("token"))?.user
  );

  const onLogin = (token) => {
    localStorage.setItem("token", token);
    setUser(jwt.decode(token).user);
  };

  return (
    <div className="App container mt-5">
      <Switch>
        <AuthenticatedRoute exact path="/tweets" user={user}>
          <Tweets user={user} />
        </AuthenticatedRoute>
        <Route
          exact
          path="/login"
          render={(props) => <Login {...props} onLogin={onLogin} user={user} />}
        />
        <Route exact path="/pepe" render={(props) => <h1>ola k ase</h1>} />
        <Redirect to="/tweets" />
      </Switch>
    </div>
  );
}

export default App;
