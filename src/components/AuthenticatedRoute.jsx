import { Redirect, Route } from "react-router-dom";

export default function AuthenticatedRoute(props) {
  if (!props.user) {
    return <Redirect to="/login" />;
  } else {
    return <Route {...props} />;
  }
}
