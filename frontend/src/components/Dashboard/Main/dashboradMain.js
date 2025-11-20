import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { logoutUser, getAdminDetails } from "../../../redux/actions/loginAction";
import { getDashboardCount } from "../../../redux/actions/dashboardDetails";
import Auth from "../../../services/Auth";
import { HomepageHeader } from "../../basic/header/header";
import logoImg from '../../basic/Homepage/main.png';

// --- IMPORTS ---
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import SchoolIcon from '@material-ui/icons/School';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import TeacherTable from "../teacherTable/teacherTable";
import SubjectTable from "../subjectTable/subjectTable";
import StudentTable from "../studentTable/studentTable";
import { Grid, Button, Card, CardContent, Typography, CardActions } from "@material-ui/core";

// Import the CSS we just created
import './Dashboard.css'; 

const useStyles = (theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    minHeight: '100vh',
    fontFamily: '"Poppins", "Roboto", sans-serif',
    paddingBottom: '50px' // Added padding at bottom for scrolling space
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(5),
    marginTop: theme.spacing(5),
  },
  welcomeTitle: {
    fontWeight: 800,
    color: '#2d3436',
    marginBottom: '5px',
    letterSpacing: '-0.5px',
  },
  welcomeSub: {
    color: '#636e72',
    fontWeight: 500,
  },
  card: {
    borderRadius: '24px',
    border: '1px solid rgba(255, 255, 255, 0.8)',
    boxShadow: '0 15px 35px rgba(0,0,0,0.05)',
    transition: 'all 0.3s ease',
    background: '#ffffff',
    overflow: 'visible',
    position: 'relative',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
    },
  },
  iconWrapper: {
    width: '70px',
    height: '70px',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(2),
    boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
  },
  icon: {
    fontSize: '35px',
    color: '#fff',
  },
  bgTeacher: { background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  bgStudent: { background: 'linear-gradient(135deg, #2af598 0%, #009efd 100%)' },
  bgSubject: { background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #feada6 100%)' },
  cardContent: {
    padding: theme.spacing(4),
    textAlign: 'left',
  },
  cardLabel: {
    textTransform: 'uppercase',
    letterSpacing: '2px',
    fontWeight: 700,
    fontSize: '0.75rem',
    color: '#b2bec3',
    marginBottom: theme.spacing(1),
  },
  statNumber: {
    fontSize: '3.5rem',
    fontWeight: '800',
    lineHeight: 1,
    color: '#2d3436',
    marginBottom: theme.spacing(1),
  },
  subStat: {
    fontSize: '0.85rem',
    color: '#636e72',
    background: '#f1f2f6',
    padding: '4px 12px',
    borderRadius: '12px',
    display: 'inline-block',
    fontWeight: 600,
  },
  actionArea: {
    padding: theme.spacing(0, 4, 4, 4),
    justifyContent: 'flex-start',
    gap: '10px',
  },
  btnPrimary: {
    borderRadius: '12px',
    textTransform: 'none',
    fontWeight: '700',
    boxShadow: 'none',
    padding: '8px 24px',
    minWidth: '100px',
    transition: '0.2s',
    '&:hover': { boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }
  },
  btnTeacher: { backgroundColor: '#f3e5f5', color: '#764ba2', '&:hover': { backgroundColor: '#e1bee7'} },
  btnStudent: { backgroundColor: '#e0f2f1', color: '#00695c', '&:hover': { backgroundColor: '#b2dfdb'} },
  btnSubject: { backgroundColor: '#ffebee', color: '#c62828', '&:hover': { backgroundColor: '#ffcdd2'} },
  linkBtn: { textDecoration: 'none', color: 'inherit' },
  logoutBtn: {
    borderRadius: '50px',
    padding: '10px 24px',
    background: 'white',
    color: '#ff5252',
    border: '2px solid #ff5252',
    fontWeight: 'bold',
    textTransform: 'none',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
    '&:hover': {
      background: '#ff5252',
      color: 'white',
    }
  },
  // Updated Table Container Style
  tableContainer: {
      marginTop: '40px',
      background: 'transparent', // Made transparent so the inner styles take over
      animation: 'fadeIn 0.5s ease-in-out'
  }
});

class DashboardMain extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.expand = "none"
    this.logout = this.logout.bind(this);
  }

  logout(obj) {
    obj.props.logoutUser();
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/";
  }

  handleTableExapand(type) {
    if (type === this.expand) {
      this.expand = "none"
    } else {
      this.expand = type
    }
    this.forceUpdate();
  }

  render() {
    if (!Auth.retriveToken() || Auth.retriveToken() === 'undefined') {
      return (<Navigate to='/' />);
    } else if (!this.props.user.isLoggedIn) {
      this.props.getAdminDetails();
      return (<div></div>);
    } else {
      if (!this.props.dashboardDetails.retrived) {
        this.props.getDashboardCount();
      }

      let x;
      let tableTitle = "";

      if (this.expand === "Teacher") { 
          x = <TeacherTable />; 
          tableTitle = "Faculty Details";
      }
      else if (this.expand === "Student") { 
          x = <StudentTable />; 
          tableTitle = "Student Details";
      }
      else if (this.expand === "Subject") { 
          x = <SubjectTable />; 
          tableTitle = "Course Details";
      }

      const { classes } = this.props;
      const stats = this.props.dashboardDetails;

      return (
        <div className={classes.root}>
          <HomepageHeader title='Exam Portal' img={logoImg} />

          <div className={classes.headerContainer}>
            <div>
              <Typography variant="h4" className={classes.welcomeTitle}>
                Dashboard Overview
              </Typography>
              <Typography variant="subtitle1" className={classes.welcomeSub}>
                Here is what's happening in your institute today.
              </Typography>
            </div>
            <Button
              variant="outlined"
              onClick={() => this.logout(this)}
              className={classes.logoutBtn}
              startIcon={<ExitToAppIcon />}
            >
              Logout
            </Button>
          </div>

          <Grid container spacing={4}>
            {/* TEACHER CARD */}
            <Grid item xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <div className={`${classes.iconWrapper} ${classes.bgTeacher}`}>
                    <SupervisorAccountIcon className={classes.icon} />
                  </div>
                  <Typography className={classes.cardLabel}>Faculty</Typography>
                  <Typography className={classes.statNumber}>{stats.teacherActive}</Typography>
                  <span className={classes.subStat}>Blocked: {stats.teacherBlocked}</span>
                </CardContent>
                <CardActions className={classes.actionArea}>
                  <Button className={`${classes.btnPrimary} ${classes.btnTeacher}`}>
                     <Link to="/addTeacher" className={classes.linkBtn}>+ Add New</Link>
                  </Button>
                  <Button size="small" style={{color: '#999'}} onClick={() => (this.handleTableExapand("Teacher"))}>
                    {this.expand === "Teacher" ? "Hide" : "View All"}
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            {/* STUDENT CARD */}
            <Grid item xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <div className={`${classes.iconWrapper} ${classes.bgStudent}`}>
                    <SchoolIcon className={classes.icon} />
                  </div>
                  <Typography className={classes.cardLabel}>Students</Typography>
                  <Typography className={classes.statNumber}>{stats.studentActive}</Typography>
                  <span className={classes.subStat}>Blocked: {stats.studentBlocked}</span>
                </CardContent>
                <CardActions className={classes.actionArea}>
                  
                  <Button size="small" style={{color: '#999'}} onClick={() => (this.handleTableExapand("Student"))}>
                    {this.expand === "Student" ? "Hide" : "View All"}
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            {/* SUBJECT CARD */}
            <Grid item xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardContent className={classes.cardContent}>
                  <div className={`${classes.iconWrapper} ${classes.bgSubject}`}>
                    <MenuBookIcon className={classes.icon} />
                  </div>
                  <Typography className={classes.cardLabel}>Courses</Typography>
                  <Typography className={classes.statNumber}>{stats.subjectActive}</Typography>
                  <span className={classes.subStat}>Inactive: {stats.subjectBlocked}</span>
                </CardContent>
                <CardActions className={classes.actionArea}>
                  <Button className={`${classes.btnPrimary} ${classes.btnSubject}`}>
                      <Link to="/addSubject" className={classes.linkBtn}>+ Add New</Link>
                  </Button>
                  <Button size="small" style={{color: '#999'}} onClick={() => (this.handleTableExapand("Subject"))}>
                    {this.expand === "Subject" ? "Hide" : "View All"}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>

          {/* Table Section - Only shows when expanded */}
          {this.expand !== "none" && (
            <div className={classes.tableContainer}>
               <Typography variant="h5" style={{fontWeight: 'bold', color: '#2d3436', marginBottom: '20px'}}>
                  {tableTitle}
               </Typography>
               {/* This wrapper class applies the CSS from Step 1 */}
               <div className="dashboard-table-wrapper">
                  {x}
               </div>
            </div>
          )}
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  user: state.user,
  dashboardDetails: state.dashboardDetails
});

export default withStyles(useStyles)(connect(mapStateToProps, {
  logoutUser,
  getAdminDetails,
  getDashboardCount,
})(DashboardMain));