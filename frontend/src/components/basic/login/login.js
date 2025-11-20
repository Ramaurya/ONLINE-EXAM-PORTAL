import React from "react";
import { Navigate } from "react-router-dom";
import "./login.css";
import { connect } from "react-redux";
import { loginUser } from "../../../redux/actions/loginAction";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      showPassword: false, // New state for toggling visibility
    };
  }

  usernameInputHandler = (event) => {
    this.setState({
      ...this.state,
      username: event.target.value,
    });
  };

  passwordInputHandler = (event) => {
    this.setState({
      ...this.state,
      password: event.target.value,
    });
  };

  // Toggle function
  togglePasswordVisibility = () => {
    this.setState((prevState) => ({
      showPassword: !prevState.showPassword,
    }));
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.loginUser({
      username: this.state.username,
      password: this.state.password,
    });
  };

  render() {
    if (this.props.user.isLoggedIn) {
      return <Navigate to="/home" />;
    } else {
      return (
        <div className="login-box">
          <h2 className="login-box-title">Admin Login</h2>
          <form onSubmit={this.handleSubmit}>
            <div className="user-box">
              <input
                autoComplete="off"
                className="input-field"
                type="text"
                value={this.state.username}
                onChange={this.usernameInputHandler}
                required
              />
              <label>Username</label>
            </div>

            <div className="user-box">
              <input
                autoComplete="off"
                className="input-field"
                /* Dynamically change type based on state */
                type={this.state.showPassword ? "text" : "password"}
                value={this.state.password}
                onChange={this.passwordInputHandler}
                required
              />
              <label>Password</label>
              
              {/* SVG Icon Trigger */}
              <span
                className="password-toggle-icon"
                onClick={this.togglePasswordVisibility}
              >
                {this.state.showPassword ? (
                  // Eye Slash Icon (Hide)
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  // Eye Icon (Show)
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </span>
            </div>

            <button className="button" type="submit">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              LOGIN
            </button>
          </form>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = {
  loginUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);