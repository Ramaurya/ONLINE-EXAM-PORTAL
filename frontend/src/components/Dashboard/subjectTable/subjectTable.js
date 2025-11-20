import { connect } from "react-redux";
import React from "react";
import { getSubjectDetails, SubjectToggleStatus } from "../../../redux/actions/subjectDetails";
// 1. Import the dashboard action
import { getDashboardCount } from "../../../redux/actions/dashboardDetails";
import "./subjectTable.css";

class SubjectTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // 2. Define the refresh function (Updates List + Dashboard Counts)
  refreshData = () => {
    this.props.getSubjectDetails();
    this.props.getDashboardCount();
  };

  handleStatusChange(status, id) {
    // 3. Pass the refresh function as the callback
    this.props.SubjectToggleStatus(status, id, this.refreshData);
  }

  render() {
    if (this.props.subjects.retrived === false) {
      this.props.getSubjectDetails();
      return <div style={{ padding: "20px" }}>Collecting data...</div>;
    }

    return (
      <div className="main">
        {/* H2 removed as DashboardMain handles the title */}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.props.subjects.list.map((val, key) => {
              return (
                <tr key={key}>
                  <td style={{ fontWeight: "500" }}>{val.subject}</td>
                  
                  {/* Beautiful Status Badge */}
                  <td>
                    <span
                      className={`status-badge ${
                        val.status ? "active" : "blocked"
                      }`}
                    >
                      {val.status ? "Active" : "Inactive"}
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
  subjects: state.subjects,
});

export default connect(mapStateToProps, {
  getSubjectDetails,
  SubjectToggleStatus,
  getDashboardCount, // 4. Connect the action here
})(SubjectTable);