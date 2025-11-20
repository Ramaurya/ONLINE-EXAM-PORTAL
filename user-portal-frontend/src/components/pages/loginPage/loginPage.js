import React from 'react';
import { Button, withStyles, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import AlertBox from '../../atoms/Alertbox/AlertBox';
import LoginForm from '../../templates/loginForm/loginForm';
import Auth from '../../../helper/Auth';
import './LoginPage.css';

// Icon
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const useStyles = (theme) => ({});

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gotoStudentRegister: false
    };
  }

  onStudentRegisterClick = () => {
    this.setState({ gotoStudentRegister: true });
  };

  render() {
    if (this.state.gotoStudentRegister) {
      return (<Navigate to='/studentRegisterPage' />);
    }

    if (this.props.user.isLoggedIn) {
      if (this.props.user.userDetails.type === 'TEACHER')
        return (<Navigate to='/homeTeacher' />);
      else
        return (<Navigate to='/homeStudent' />);
    } else if (Auth.retriveToken() && Auth.retriveToken() !== 'undefined') {
      return (<Navigate to='/homeStudent' />);
    } else {
      return (
        <div className="login-page-root">

          {/* Top Right Button */}
          <div className="top-right-actions">
            <Button
              className="btn-register-nav"
              onClick={this.onStudentRegisterClick}
              variant="contained"
              size="small"
            >
              Student Register
            </Button>
          </div>

          {/* The Main Card */}
          <div className="login-card-wrapper">

            <div className="login-icon-box">
              <ArrowForwardIcon style={{ color: '#111827' }} />
            </div>

            <Typography variant="h4" className="login-title">
              Sign in with email
            </Typography>

            <Typography variant="body1" className="login-subtitle">
              Make a new doc to bring your words, data, and teams together. For free
            </Typography>

            <AlertBox />

            {/* Wrap the LoginForm so CSS overrides target it safely */}
            <div className="inner-login-override">
              <LoginForm/>
            </div>

            {/* Footer Section */}
            <div className="divider-container">
              <span className="divider-line" />
              <span className="divider-text">Or sign in with</span>
              <span className="divider-line" />
            </div>

            <div className="social-row">
              <div className="social-btn">
                <img src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" className="social-img" alt="Google" />
              </div>
              <div className="social-btn">
                <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" className="social-img" alt="Facebook" />
              </div>
              <div className="social-btn">
                <img src="https://cdn-icons-png.flaticon.com/512/0/747.png" className="social-img" alt="Apple" />
              </div>
            </div>

          </div>
        </div>
      );
    }
  }
}

const mapStatetoProps = state => ({
  user: state.user
});

export default withStyles(useStyles)(connect(mapStatetoProps, {})(LoginPage));
