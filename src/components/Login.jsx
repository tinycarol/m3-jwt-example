import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { authenticate } from "../services/api.service";

export default function Login({ onLogin, user }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
	const [error, setError] = useState("");

  const onSubmit = (e) => {
		e.preventDefault();
    authenticate(username, password)
			.then((data) => {
				onLogin(data.access_token);
			})
			.catch((error) => {
        switch (error.response.status) {
          case 401:
            setError("Wrong credentials");
            break;
          default:
            setError("Unknown error");
        }
      });
	};
	
	if (user) {
		return <Redirect to="/tweets" />;
	}

  return (
    <div className="Login">
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <Link to="/pepe">Ola k ase</Link>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="username">Email address</label>
          <input
            type="string"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}
