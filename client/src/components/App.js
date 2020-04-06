import React, { Component } from "react";
import Header from "./Header";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./Home";
import Signup from "./Signup";
import Login from "./Login";
import Profile from "./Profile";

const validateToken = () => {
  // check the expire time of token
  return true;
};

const AuthRoute = (props) => {
  const { path, component } = props;
  if(validateToken()) {
    return <Route path={path} exact component={component} />
  } else {
    return <Redirect to="/login" />
    
  }
    
}

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="px-4 py-2">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/signup" exact component={Signup} />
            <Route path="/login" exact component={Login} />
            <AuthRoute pat="/profile" component={Profile}/>
          </Switch>
        </div>
      </div>
    );
  }
}
