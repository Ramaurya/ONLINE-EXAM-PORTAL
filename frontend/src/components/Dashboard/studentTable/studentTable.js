import { connect } from "react-redux";
import React from "react";
import { getStudentDetails, StudentToggleStatus } from "../../../redux/actions/studentDetails";
// 1. Import the dashboard action
import { getDashboardCount } from "../../../redux/actions/dashboardDetails";
import "./studentTable.css";

class StudentTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // 2. Define the refresh function (Updates List + Dashboard Counts)
  refreshData = () => {
    this.props.getStudentDetails();
    this.props.getDashboardCount();
  };

  handleStatusChange(status, id) {
    // 3. Pass the refresh function as the callback
    this.props.StudentToggleStatus(status, id, this.refreshData);
  }

  render() {
    if (this.props.students.retrived === false) {
      this.props.getStudentDetails();
      return <div style={{ padding: "20px" }}>Collecting data...</div>;
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
            {this.props.students.list.map((val, key) => {
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
                      className={val.status ? "btn-block" : "btn-unblock"}
                      style={{
                        padding: "5px 15px",
                        borderRadius: "5px",
                        border: "none",
                        cursor: "pointer",
                        color: "white",
                        fontWeight: "bold",
                        backgroundColor: val.status ? "#ff7675" : "#00b894", // Red to block, Green to unblock
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
  students: state.students,
});

export default connect(mapStateToProps, {
  getStudentDetails,
  StudentToggleStatus,
  getDashboardCount, // 4. Connect the action here
})(StudentTable);