import React, { Component } from "react";
import { Container,Button, Form, FormGroup, Label, Input, Alert } from "reactstrap";
import { bindActionCreators } from "redux";
import * as actions from "../actions/actions";
import { connect } from "react-redux";

class Login extends Component {
  state = {
    email: "",
    password: "",
    error: false,
  };

  handleInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { username, email, password } = this.state;
    const formData = {
      email,
      password,
    };
    if (username || email || password) {
      this.props.actions.login(formData);
      this.props.history.push("/profile");
    } else {
      this.setState({
        error: true,
      });
    }
  };

  showAlert() {
    return <Alert color="danger">Please fill all Inputs</Alert>;
  }

  render() {
    return (
      <Container>
        <h3>LOGIN TO OUR WONDERFUL SYSTEM</h3>
        <Form onSubmit={this.handleSubmit}>
          {this.state.error ? this.showAlert() : null}
          <FormGroup>
            <Label for="exampleEmail">Email</Label>
            <Input
              type="email"
              name="email"
              id="exampleEmail"
              placeholder="email"
              onChange={this.handleInput}
            />
          </FormGroup>
          <FormGroup>
            <Label for="examplePassword">Password</Label>
            <Input
              type="password"
              name="password"
              id="examplePassword"
              placeholder="password"
              onChange={this.handleInput}
            />
          </FormGroup>
          <Button className="bg-primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      login: bindActionCreators(actions.login, dispatch),
    },
  };
};

export default connect(null, mapDispatchToProps)(Login);
