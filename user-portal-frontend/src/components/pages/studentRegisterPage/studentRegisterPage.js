import React from 'react';
import { connect } from 'react-redux'; 
import AlertBox from '../../atoms/Alertbox/AlertBox';
import StudentRegisterForm from '../../templates/studentRegisterForm/studentRegisterForm';

// --- FIX: Import 'clearAlert' (singular) as per your error message ---
import { clearAlert } from '../../../redux/actions/alertAction'; 

import {
  Button,
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  withStyles
} from '@material-ui/core';

import { Navigate } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import SchoolIcon from '@material-ui/icons/School';


// -------------------- STYLES --------------------
const useStyles = (theme) => ({
  root: {
    minHeight: '100vh',
    width: '100%',
    padding: theme.spacing(6, 2),
    background: 'linear-gradient(135deg, #f0fbff 0%, #f7f5ff 60%, #fffaf4 100%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "'Inter', Roboto, sans-serif",
  },
  appbar: {
    background: 'rgba(255,255,255,0.65)',
    backdropFilter: 'blur(6px)',
    boxShadow: 'none',
    borderBottom: '1px solid rgba(0,0,0,0.06)',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    minHeight: 72,
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  brandAvatar: {
    width: 46,
    height: 46,
    background: 'linear-gradient(135deg,#7dd3fc,#c4b5fd)',
    color: '#07203b',
  },
  title: {
    fontWeight: 800,
    color: '#07172a',
  },
  navActions: {
    display: 'flex',
    gap: theme.spacing(1),
  },
  homeBtn: {
    background: '#0b1220',
    color: '#fff',
    textTransform: 'none',
    fontWeight: 700,
    padding: '8px 16px',
    borderRadius: 12,
    '&:hover': {
      background: '#000',
      transform: 'translateY(-2px)',
    },
  },
  addHeight: {
    height: 80,
  },
  main: {
    width: '100%',
    maxWidth: 950,
    display: 'flex',
    gap: theme.spacing(6),
    alignItems: 'stretch',
  },
  leftPanel: {
    display: 'none',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(5),
    flex: 1,
    borderRadius: 18,
    background: 'linear-gradient(180deg, rgba(255,255,255,0.7), rgba(255,255,255,0.4))',
    boxShadow: '0 26px 80px rgba(0,0,0,0.06)',
    '@media (min-width:960px)': {
      display: 'flex',
    },
  },
  leftIconWrap: {
    width: 84,
    height: 84,
    borderRadius: 18,
    background: 'linear-gradient(135deg,#e0f7ff,#f0ecff)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing(3),
  },
  leftTitle: {
    fontSize: '1.4rem',
    fontWeight: 800,
    color: '#081229',
    marginBottom: theme.spacing(1),
  },
  leftSubtitle: {
    color: '#5b6b76',
    fontSize: '0.95rem',
    maxWidth: 300,
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
  formCard: {
    flex: 1,
    maxWidth: 500,
    background: '#fff',
    padding: theme.spacing(4),
    borderRadius: 18,
    boxShadow: '0 26px 80px rgba(0,0,0,0.1)',
  },
  formHeading: {
    fontWeight: 800,
    fontSize: '1.2rem',
    color: '#07122a',
    marginBottom: theme.spacing(0.5),
  },
  formSub: {
    color: '#6b7280',
    fontSize: '0.9rem',
    marginBottom: theme.spacing(2),
  },
  formCardInnerOverrides: {
    '& .MuiPaper-root, & .MuiCard-root': {
      background: 'transparent',
      boxShadow: 'none',
      padding: 0,
    },
    '& h3, & h4, & h5': {
      display: 'none',
    },
  }
});


// -------------------- COMPONENT --------------------
class StudentRegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gotoLogin: false
    };
  }

  // Run this when leaving the page
  componentWillUnmount() {
    if(this.props.clearAlert) {
        this.props.clearAlert(); // FIX: Use singular
    }
  }

  onHomeClick = () => {
    if(this.props.clearAlert) {
        this.props.clearAlert(); // FIX: Use singular
    }
    this.setState({ gotoLogin: true });
  };

  render() {
    const { classes } = this.props;

    if (this.state.gotoLogin) {
      return <Navigate to="/" />;
    }

    return (
      <div className={classes.root}>

        {/* APP BAR */}
        <AppBar elevation={0} className={classes.appbar}>
          <Toolbar className={classes.toolbar}>

            {/* Branding */}
            <div className={classes.brand}>
              <Avatar className={classes.brandAvatar}>
                <SchoolIcon />
              </Avatar>
              <div>
                <Typography variant="h6" className={classes.title}>
                  LPU Portal
                </Typography>
                <Typography variant="caption" style={{ color: '#677581' }}>
                  Student Registration
                </Typography>
              </div>
            </div>

            {/* Actions */}
            <div className={classes.navActions}>
              <Button
                variant="contained"
                className={classes.homeBtn}
                onClick={this.onHomeClick}
                startIcon={<HomeIcon />}
              >
                Back to Login
              </Button>
            </div>

          </Toolbar>
        </AppBar>

        <div className={classes.addHeight}></div>

        {/* MAIN PAGE LAYOUT */}
        <div className={classes.main}>

          {/* Left panel */}
          <div className={classes.leftPanel}>
            <div className={classes.leftIconWrap}>
              <SchoolIcon style={{ fontSize: 42, color: '#07203b' }} />
            </div>
            <Typography className={classes.leftTitle}>
              Welcome Student!
            </Typography>
            <Typography className={classes.leftSubtitle}>
              Create your account to join courses, track progress, submit assignments and more.
            </Typography>
          </div>

          {/* Right form card */}
          <div className={classes.formCard}>
            <Typography className={classes.formHeading}>
              Create your student account
            </Typography>

            <Typography className={classes.formSub}>
              Fill the details below to register.
            </Typography>

            <AlertBox />

            <div className={classes.formCardInnerOverrides}>
              <StudentRegisterForm />
            </div>

          </div>

        </div>
      </div>
    );
  }
}

// FIX: Use singular 'clearAlert'
const mapDispatchToProps = {
    clearAlert 
};

export default connect(null, mapDispatchToProps)(withStyles(useStyles)(StudentRegisterPage));