import React, { Component } from "react";
import Header from "./Header";
import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./Home";
import Signup from "./Signup";
import Login from "./Login";
import Profile from "./Profile";


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
            <Route pat="/profile" exact component={Profile}/>
          </Switch>
        </div>
      </div>
    );
  }
}
