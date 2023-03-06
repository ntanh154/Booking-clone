import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import Header from "../containers/Header/Header";
import UserRedux from "../containers/System/admin/UserRedux";
import ManageDoctor from "../containers/System/admin/ManageDoctor";
import UserManage from "../containers/System/UserManage";
import ManageSchedule from "../containers/System/doctor/ManageSchedule";
import ManageSpecialty from "../containers/System/specialty/ManageSpecialty";
class System extends Component {
  render() {
    /* {this.props.isLoggedIn && <Header />} */

    const { systemMenuPath, isLoggedIn } = this.props;
    return (
      <React.Fragment>
        {isLoggedIn && <Header />}
        <div className="system-container">
          <div className="system-list">
            <Switch>
              <Route path="/system/user-manage" component={UserManage} />
              <Route path="/system/user-redux" component={UserRedux} />
              <Route path="/system/manage-doctor" component={ManageDoctor} />
              <Route
                path="/system/manage-specialty"
                component={ManageSpecialty}
              />
              <Route
                component={() => {
                  return <Redirect to={systemMenuPath} />;
                }}
              />
              <Route
                path="/doctor/manage-schedule"
                component={ManageSchedule}
              />
            </Switch>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    started: state.app.started,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
