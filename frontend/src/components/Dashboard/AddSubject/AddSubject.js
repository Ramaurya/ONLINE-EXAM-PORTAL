import React from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import Alert from "../../../services/alert";
import Auth from "../../../services/Auth";
import { getAdminDetails } from "../../../redux/actions/loginAction";
// 1. IMPORT THE DASHBOARD ACTION
import { getDashboardCount } from "../../../redux/actions/dashboardDetails"; 
import "./AddSubject.css";
import axios from "axios";
import apis from "../../../services/Apis";
import { TextField, Button, Container, Typography, Paper } from "@material-ui/core";

class AddSubject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      redirect: false,
    };
  }

  nameInputHandler = (event) => {
    this.setState({
      ...this.state,
      name: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    console.log(this.state);
    axios
      .post(
        apis.BASE + apis.ADD_SUBJECT,
        {
          name: this.state.name,
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
          // 2. UPDATE THE DASHBOARD DATA BEFORE REDIRECTING
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
            Add Subject
          </Typography>
          
          <form onSubmit={this.handleSubmit}>
            <TextField
              label="Subject Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={this.state.name}
              onChange={this.nameInputHandler}
              required
              InputLabelProps={{
                className: "custom-label",
              }}
            />
            
            <Button
              type="submit"
              variant="outlined"
              fullWidth
              className="btn-neon"
              style={{ marginTop: "30px", padding: "10px" }}
            >
              Add Subject
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

// 3. CONNECT THE ACTION HERE
export default connect(mapStateToProps, {
  getAdminDetails,
  getDashboardCount // <--- Added this
})(AddSubject);