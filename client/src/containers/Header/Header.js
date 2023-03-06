import React, { Component } from "react";
import { connect } from "react-redux";

import { FormattedMessage } from "react-intl";
import en from "../../assets/images/Flag_of_the_United_Kingdom.svg.png";
import vn from "../../assets/images/Flag_of_Vietnam.svg.png";
import Navigator from "../../components/Navigator";
import * as actions from "../../store/actions";
import { LANGUAGES } from "../../utils";
import "./Header.scss";
import { adminMenu, doctorMenu } from "./menuApp";
import _ from "lodash";
import { USER_ROLE } from "../../utils/constant";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuApp: [],
    };
  }
  componentDidMount() {
    const { userInfo } = this.props;
    let menu = [];
    if (userInfo && !_.isEmpty(userInfo)) {
      const role = userInfo.roleId;
      if (role === USER_ROLE.ADMIN) {
        menu = adminMenu;
      }
      if (role === USER_ROLE.DOCTOR) {
        menu = doctorMenu;
      }
    }

    this.setState({
      menuApp: menu,
    });
  }
  handleChangeLanguage = (language) => {
    this.props.changeLanguageRedux(language);
  };
  render() {
    const { processLogout, language, userInfo } = this.props;
    let lang = this.props.language;
    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={this.state.menuApp} />
        </div>
        <div className="languages">
          <div
            className="language language-vi "
            onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}
          >
            <span className="welcome">
              <FormattedMessage id="homeHeader.welcome" />
              {userInfo && userInfo.firstName ? userInfo.firstName : ""} !
            </span>
            <img
              className={lang === LANGUAGES.VI ? "active" : ""}
              src={vn}
              alt="img"
            />
          </div>
          <div
            className="language language-en"
            onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}
          >
            <img
              className={lang === LANGUAGES.EN ? "active" : ""}
              src={en}
              alt="img"
            />
          </div>
          <div
            className="btn btn-logout"
            onClick={processLogout}
            title="Log out"
          >
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>

        {/* nút logout */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageRedux: (language) =>
      dispatch(actions.changeLanguage(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
