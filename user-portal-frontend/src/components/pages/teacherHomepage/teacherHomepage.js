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
import PostAddIcon from '@material-ui/icons/PostAdd'; // Add Question
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks'; // Questions
import CreateIcon from '@material-ui/icons/Create'; // Create Test
import AssignmentIcon from '@material-ui/icons/Assignment'; // View Tests
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

// --- COMPONENTS ---
import AddQuestionForm from "../../templates/AddQuestionForm/AddQuestionForm";
import QuestionDetails from "../../templates/QuestionDetails/questionDetails";
import CreateTestForm from "../../templates/CreateTestForm/CreateTestForm";
import TestDetails from "../../templates/TestDetails/TestDetails";

const drawerWidth = 260;

const useStyles = (theme) => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f4f6f8',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#ffffff',
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
  // List Item Styles
  listItem: {
    margin: '8px 16px',
    width: 'auto',
    borderRadius: '12px',
    padding: '10px 16px',
    transition: 'all 0.2s',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
  },
  listItemActive: {
    backgroundColor: '#3b82f6 !important',
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
  // Content Area
  content: {
    flexGrow: 1,
    padding: theme.spacing(4),
    marginTop: 64,
    overflowX: 'hidden',
  },
  welcomeCard: {
    padding: theme.spacing(6),
    textAlign: 'center',
    background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', // Different gradient for Teacher
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
    backgroundColor: '#11998e',
    color: '#fff',
  },
  logoutContainer: {
    marginTop: 'auto',
    padding: '20px',
  }
});

class TeacherHomepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0, // Track active tab
      menuList: [
        {
          title: 'Home',
          icon: <HomeIcon />,
          component: null 
        },
        {
          title: 'Add Question',
          icon: <PostAddIcon />,
          component: <AddQuestionForm />
        },
        {
          title: 'Question Bank',
          icon: <LibraryBooksIcon />,
          component: <QuestionDetails />
        },
        {
          title: 'Create Test',
          icon: <CreateIcon />,
          component: <CreateTestForm />
        },
        {
          title: 'View Tests',
          icon: <AssignmentIcon />,
          component: <TestDetails />
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
    const username = this.props.user.userDetails.username || "Teacher";
    
    return (
      <div style={{animation: 'fadeIn 0.5s'}}>
        <Paper className={classes.welcomeCard}>
           <Typography variant="h3" style={{fontWeight: 800, marginBottom: '10px'}}>
              Welcome, {username}!
           </Typography>
           <Typography variant="h6" style={{opacity: 0.9, fontWeight: 400}}>
              Manage your questions, create new tests, and track student performance.
           </Typography>
        </Paper>
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
    } else if (this.props.user.userDetails.type !== 'TEACHER') {
      return (<Navigate to='/' />);
    }

    const activeItem = this.state.menuList[this.state.activeIndex];

    return (
      <div className={classes.root}>
        
        {/* 1. TOP HEADER */}
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <Typography variant='h6' className={classes.appBarTitle}>
              Teacher Portal
            </Typography>
            
            <div className={classes.userInfo}>
                <Typography variant="body1" style={{fontWeight: 600}}>
                    {this.props.user.userDetails.username}
                </Typography>
                <Avatar className={classes.avatar}>
                    <SupervisorAccountIcon />
                </Avatar>
            </div>
          </Toolbar>
        </AppBar>

        {/* 2. SIDEBAR */}
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{ paper: classes.drawerPaper }}
        >
          <Toolbar /> 
          
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

            <div className={classes.logoutContainer}>
               <LogoutButton /> 
            </div>
          </div>
        </Drawer>

        {/* 3. MAIN CONTENT */}
        <main className={classes.content}>
          <Container maxWidth="lg">
             <AlertBox />
             
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
})(TeacherHomepage));