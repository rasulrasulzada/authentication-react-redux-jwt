import React, { Component } from "react";
import { Nav } from "reactstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import authReducer  from "../reducers/authReducer"
import * as actions from "../actions/actions"
import { bindActionCreators } from "redux";

class Header extends Component {
    logout = (e) => {
        e.preventDefault()
        this.props.actions.logout()
        // this.props.history.push("/login");
    }

  render() {
    return (
      <Nav className="d-flex justify-content-between px-4 py-2 bg-dark">
        <Link to="/" className="btn bg-primary text-white">
          Homepage
        </Link>
        <div>
          {this.props.auth.token ? (
            <Link onClick={this.logout} to="/logout" className="mx-2  btn bg-danger text-white">
              Logout
            </Link>
          ) : (
            <div>
              <Link to="/signup" className="mx-2 btn bg-success text-white">
                Sign up
              </Link>
              <Link to="/login" className="mx-2  btn bg-success text-white">
                Login
              </Link>
            </div>
          )}
        </div>
      </Nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.authReducer,
  };
};

const mapDispatchProps = (dispatch) => {
    return {
        actions: {
            logout: bindActionCreators(actions.logout, dispatch)
        }
    };
  };
export default connect(mapStateToProps,mapDispatchProps)(Header);
