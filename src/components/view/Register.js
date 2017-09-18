import React, { Component } from 'react';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      registration: {
        username: '',
        password: ''
      }
    };
  }

  updateRegistration(event) {
    event.preventDefault();
    let updated = Object.assign({}, this.state.registration);
    updated[event.target.id] = event.target.value;
    this.setState({
      registration: updated
    });
  }

  submitRegistration(event) {
    event.preventDefault();
    let updated = Object.assign({}, this.state.registration);
    if (updated.username.length == 0) {
      alert('please add your username');
      return;
    }

    if (updated.password.length == 0) {
      alert('please add your password');
      return;
    }

    this.props.onRegister(updated);
  }

  submitLogin(event) {
    event.preventDefault();
    let updated = Object.assign({}, this.state.registration);
    if (updated.username.length == 0) {
      alert('please add your username');
      return;
    }

    if (updated.password.length == 0) {
      alert('please add your password');
      return;
    }

    this.props.onLogin(updated);
  }

  render() {
    return (
      <div>
        <div className="input-field col s12">
          <input
            onChange={this.updateRegistration.bind(this)}
            type="text"
            id="username"
          />
          <label htmlFor="username">Username</label>
        </div>
        <div className="input-field col s12">
          <input
            onChange={this.updateRegistration.bind(this)}
            type="password"
            id="password"
          />
          <label htmlFor="password">Password</label>
        </div>
        <div className="input-field col s12">
          <button
            onClick={this.submitRegistration.bind(this)}
            className="waves-effect btn blue"
          >
            <i className="material-icons left">add</i>
            Join
          </button>
        </div>
        <div className="input-field col s12">
          <button
            onClick={this.submitLogin.bind(this)}
            className="waves-effect btn yellow darken-2"
          >
            <i className="material-icons left">account_box</i>
            Sign In
          </button>
        </div>
      </div>
    );
  }
}

export default Register;
