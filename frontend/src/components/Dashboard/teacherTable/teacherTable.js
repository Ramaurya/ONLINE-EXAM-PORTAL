import { connect } from "react-redux";
import React from "react";
import { getTeacherDetails, TeacherToggleStatus } from "../../../redux/actions/teacherDetails";
// 1. Import the dashboard action
import { getDashboardCount } from "../../../redux/actions/dashboardDetails";
import "./teacherTable.css";

class TeacherTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // 2. Define a function that refreshes BOTH the list and the dashboard stats
  refreshData = () => {
    this.props.getTeacherDetails(); // Update the table list
    this.props.getDashboardCount(); // Update the dashboard cards (Active/Blocked counts)
  };

  handleStatusChange(status, id) {
    // Pass our combined refresh function as the callback
    this.props.TeacherToggleStatus(status, id, this.refreshData);
  }

  render() {
    if (this.props.teachers.retrived === false) {
      this.props.getTeacherDetails();
      return <div style={{ padding: "20px" }}>Loading data...</div>;
    }

    return (
      <div className="main">
        {/* Removed h2 because DashboardMain already shows the title */}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.props.teachers.list.map((val, key) => {
              return (
                <tr key={key}>
                  <td style={{ fontWeight: "500" }}>{val.name}</td>
                  
                  {/* Beautiful Status Badge */}
                  <td>
                    <span
                      className={`status-badge ${
                        val.status ? "active" : "blocked"
                      }`}
                    >
                      {val.status ? "Active" : "Blocked"}
                    </span>
                  </td>

                  {/* Action Button */}
                  <td>
                    <button
                      onClick={() =>
                        this.handleStatusChange(val.status, val.id)
                      }
                      className={val.status ? "btn-block" : "btn-unblock"} // You can add these classes to CSS
                      style={{
                        padding: "5px 15px",
                        borderRadius: "5px",
                        border: "none",
                        cursor: "pointer",
                        color: "white",
                        fontWeight: "bold",
                        backgroundColor: val.status ? "#ff7675" : "#00b894", // Red if active (to block), Green if blocked (to unblock)
                      }}
                    >
                      {val.status ? "Block" : "Unblock"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  teachers: state.teachers,
});

export default connect(mapStateToProps, {
  getTeacherDetails,
  TeacherToggleStatus,
  getDashboardCount, // 3. Add this to connect
})(TeacherTable);