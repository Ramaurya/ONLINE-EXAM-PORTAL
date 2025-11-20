import React from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import Alert from "../../../services/alert";
import Auth from "../../../services/Auth";
import { getAdminDetails } from "../../../redux/actions/loginAction";
// 1. IMPORT THE DASHBOARD ACTION
import { getDashboardCount } from "../../../redux/actions/dashboardDetails";
import "./AddTeacher.css";
import axios from "axios";
import apis from "../../../services/Apis";
import {
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
} from "@material-ui/core";

class AddTeacher extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
      showPassword: false,
      showConfirmPassword: false,
      redirect: false,
    };
  }

  nameInputHandler = (event) => {
    this.setState({
      ...this.state,
      name: event.target.value,
    });
  };

  emailInputHandler = (event) => {
    this.setState({
      ...this.state,
      email: event.target.value,
    });
  };

  passwordInputHandler = (event) => {
    this.setState({
      ...this.state,
      password: event.target.value,
    });
  };

  confirmInputHandler = (event) => {
    this.setState({
      ...this.state,
      confirmpassword: event.target.value,
    });
  };

  handleClickShowPassword = () => {
    this.setState({ ...this.state, showPassword: !this.state.showPassword });
  };

  handleClickShowConfirmPassword = () => {
    this.setState({
      ...this.state,
      showConfirmPassword: !this.state.showConfirmPassword,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.confirmpassword !== this.state.password) {
      Alert("error", "Invalid Input", "Confirm Password does not match");
      return;
    }

    axios
      .post(
        apis.BASE + apis.ADD_TEACHER,
        {
          username: this.state.name,
          email: this.state.email,
          password: this.state.password,
        },
        {
          headers: {
            Authorization: `Bearer ${Auth.retriveToken()}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        if (response.data.success) {
          // 2. UPDATE DASHBOARD DATA HERE
          this.props.getDashboardCount();
          
          this.setState({ redirect: true });
        } else {
          Alert("error", "Failed", response.data.message);
        }
      });
  };

  render() {
    if (this.state.redirect) {
      return <Navigate to="/home" />;
    }

    if (!Auth.retriveToken() || Auth.retriveToken() === "undefined") {
      return <Navigate to="/" />;
    } else if (!this.props.user.isLoggedIn) {
      this.props.getAdminDetails();
      return <div></div>;
    }

    return (
      <Container maxWidth="sm" style={{ marginTop: "80px" }}>
        <Paper elevation={3} className="glass-container">
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            className="form-title"
          >
            Add Teacher
          </Typography>
          <form onSubmit={this.handleSubmit}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={this.state.name}
              onChange={this.nameInputHandler}
              required
              className="custom-textfield"
            />
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={this.state.email}
              onChange={this.emailInputHandler}
              required
            />
            <TextField
              label="Password"
              type={this.state.showPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              margin="normal"
              value={this.state.password}
              onChange={this.passwordInputHandler}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={this.handleClickShowPassword}
                      edge="end"
                    >
                      {this.state.showPassword ? (
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Confirm Password"
              type={this.state.showConfirmPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              margin="normal"
              value={this.state.confirmpassword}
              onChange={this.confirmInputHandler}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={this.handleClickShowConfirmPassword}
                      edge="end"
                    >
                      {this.state.showConfirmPassword ? (
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      ) : (
                        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              variant="outlined"
              fullWidth
              className="btn-neon"
              style={{ marginTop: "30px", padding: "10px" }}
            >
              Add Teacher
            </Button>
            <Button
              variant="outlined"
              component={Link}
              to="/home"
              fullWidth
              className="btn-back"
              style={{ marginTop: "15px" }}
            >
              Back
            </Button>
          </form>
        </Paper>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

// 3. CONNECT IT
export default connect(mapStateToProps, {
  getAdminDetails,
  getDashboardCount // <--- Added this
})(AddTeacher);