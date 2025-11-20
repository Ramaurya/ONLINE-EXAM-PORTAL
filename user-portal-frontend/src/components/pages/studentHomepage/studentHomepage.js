import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import LogoutButton from "../../atoms/LogoutButton/LogoutButton";
import Auth from "../../../helper/Auth";
import { getUserDetails } from "../../../redux/actions/loginAction";
import { 
  Drawer, 
  Typography, 
  withStyles, 
  AppBar, 
  Toolbar, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Avatar,
  Container,
  Paper,
  Box,
  Divider
} from "@material-ui/core";
import AlertBox from '../../atoms/Alertbox/AlertBox';

// --- ICONS ---
import HomeIcon from '@material-ui/icons/Home';
import AssignmentIcon from '@material-ui/icons/Assignment'; // View All
import EventNoteIcon from '@material-ui/icons/EventNote'; // Upcoming
import DoneAllIcon from '@material-ui/icons/DoneAll'; // Completed
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

// --- COMPONENTS ---
import TestDetailsStudent from "../../templates/TestDetails/TestDetailsStudent";
import UpcomingStudentTestsDetails from "../../templates/TestDetails/UpcomingStudentTestsDetails";
import CompletedTestsDetailsStudent from "../../templates/TestDetails/CompletedTestsDetailsStudent";

const drawerWidth = 260; // Wider for better look

const useStyles = (theme) => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f4f6f8', // Light grey background for the whole page
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#ffffff', // White Header
    color: '#333',
    boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.05)',
  },
  appBarTitle: {
    flexGrow: 1,
    fontWeight: 700,
    color: '#07203b',
    letterSpacing: '0.5px',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#1b2430', // Dark Sidebar
    color: '#e5e7eb',
    borderRight: 'none',
  },
  drawerContainer: {
    overflow: 'auto',
    paddingTop: theme.spacing(2),
  },
  // Styling for List Items
  listItem: {
    margin: '8px 16px',
    width: 'auto',
    borderRadius: '12px', // Rounded buttons
    padding: '10px 16px',
    transition: 'all 0.2s',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
  },
  listItemActive: {
    backgroundColor: '#3b82f6 !important', // Active Blue Color
    color: '#fff',
    boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
    '& .MuiListItemIcon-root': {
      color: '#fff',
    }
  },
  listIcon: {
    color: '#9ca3af',
    minWidth: '40px',
  },
  // Main Content Area
  content: {
    flexGrow: 1,
    padding: theme.spacing(4),
    marginTop: 64, // Space for AppBar
    overflowX: 'hidden',
  },
  welcomeCard: {
    padding: theme.spacing(6),
    textAlign: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    borderRadius: '20px',
    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
    marginBottom: theme.spacing(4),
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  avatar: {
    backgroundColor: '#3b82f6',
    color: '#fff',
  },
  logoutContainer: {
    marginTop: 'auto', // Push to bottom
    padding: '20px',
  }
});

class StudentHomepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0, // To track which tab is active
      
      // We define components directly here to render cleanly
      menuList: [
        {
          title: 'Home',
          icon: <HomeIcon />,
          component: null // Special case for Home
        },
        {
          title: 'View All Tests',
          icon: <AssignmentIcon />,
          component: <TestDetailsStudent />
        },
        {
          title: 'Upcoming Tests',
          icon: <EventNoteIcon />,
          component: <UpcomingStudentTestsDetails />
        },
        {
          title: 'Completed Tests',
          icon: <DoneAllIcon />,
          component: <CompletedTestsDetailsStudent />
        }
      ]
    }
  }

  onMenuItemClick(index) {
    this.setState({
      ...this.state,
      activeIndex: index
    })
  }

  renderHomeContent() {
    const { classes } = this.props;
    const username = this.props.user.userDetails.username || "Student";
    
    return (
      <div style={{animation: 'fadeIn 0.5s'}}>
        <Paper className={classes.welcomeCard}>
           <Typography variant="h3" style={{fontWeight: 800, marginBottom: '10px'}}>
              Welcome, {username}!
           </Typography>
           <Typography variant="h6" style={{opacity: 0.9, fontWeight: 400}}>
              Ready to take some exams today? Check your upcoming tests below.
           </Typography>
        </Paper>
        
        {/* You can add a quick summary grid here if you want later */}
      </div>
    );
  }

  render() {
    const { classes } = this.props;

    // --- Auth Checks ---
    if (!Auth.retriveToken() || Auth.retriveToken() === 'undefined') {
      return (<Navigate to='/' />);
    } else if (!this.props.user.isLoggedIn) {
      this.props.getUserDetails();
      return (<div>Loading...</div>);
    } else if (this.props.user.userDetails.type !== 'STUDENT') {
      return (<Navigate to='/' />);
    }

    const activeItem = this.state.menuList[this.state.activeIndex];

    return (
      <div className={classes.root}>
        
        {/* 1. TOP HEADER (APP BAR) */}
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant='h6' className={classes.appBarTitle}>
              LPU Exam Portal
            </Typography>
            
            {/* User Profile Section in Header */}
            <div className={classes.userInfo}>
                <Typography variant="body1" style={{fontWeight: 600}}>
                    {this.props.user.userDetails.username}
                </Typography>
                <Avatar className={classes.avatar}>
                    <AccountCircleIcon />
                </Avatar>
            </div>
          </Toolbar>
        </AppBar>

        {/* 2. SIDEBAR (DRAWER) */}
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{ paper: classes.drawerPaper }}
        >
          <Toolbar /> {/* Spacing for the AppBar so drawer content starts below it */}
          
          <div className={classes.drawerContainer}>
            <List>
              {this.state.menuList.map((item, index) => (
                <ListItem 
                  button 
                  key={index} 
                  onClick={() => this.onMenuItemClick(index)}
                  className={`${classes.listItem} ${this.state.activeIndex === index ? classes.listItemActive : ''}`}
                >
                  <ListItemIcon className={classes.listIcon} style={{color: this.state.activeIndex === index ? '#fff' : '#9ca3af'}}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.title} 
                    primaryTypographyProps={{ style: { fontWeight: this.state.activeIndex === index ? 700 : 500 }}}
                  />
                </ListItem>
              ))}
            </List>
            
            <Divider style={{backgroundColor: 'rgba(255,255,255,0.1)', margin: '20px 0'}} />

            {/* Logout at the bottom */}
            <div className={classes.logoutContainer}>
               <LogoutButton /> 
            </div>
          </div>
        </Drawer>

        {/* 3. MAIN CONTENT */}
        <main className={classes.content}>
          <Container maxWidth="lg">
             <AlertBox />
             
             {/* If index is 0, show Home, otherwise show the component */}
             {this.state.activeIndex === 0 
                ? this.renderHomeContent() 
                : activeItem.component
             }

          </Container>
        </main>

      </div>
    )
  }
}

const mapStatetoProps = state => ({
  user: state.user
})

export default withStyles(useStyles)(connect(mapStatetoProps, {
  getUserDetails
})(StudentHomepage));