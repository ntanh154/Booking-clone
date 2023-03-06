import {
  faBars,
  faCircleQuestion,
  faMagnifyingGlass,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./homeHeader.scss";
import chuyenKhoa from "../../../assets/khamchuyenkhoa.png";
import khamTuXa from "../../../assets/khamtuxa.png";
import khamTongQuat from "../../../assets/khamtongquat.png";
import xetNgihiem from "../../../assets/dichvuxetnghiem.png";
import sucKhoeTinhThan from "../../../assets/suckhoetinhthan.png";
import khamNhaKhoa from "../../../assets/khamnhakhoa.png";
import goiPhauThuat from "../../../assets/phauthuat.jpg";
import sanPhamYte from "../../../assets/dichvukham.png";
import sucKhoeDoanhNghiep from "../../../assets/iconlichsu.jpg";
import { LANGUAGES } from "../../../utils/constant";
import { changeLanguage } from "../../../store/actions";
import { withRouter } from "react-router";

class HomeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}

  // shouldComponentUpdate(nextProps, nextState) {}

  componentWillUpdate(nextProps, nextState) {}

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}

  handleChangeLanguage = (language) => {
    this.props.changeLanguageRedux(language);
    //fire redux events
  };
  returnHomePage = () => {
    if (this.props.history) {
      this.props.history.push("/home");
    }
  };

  render() {
    let lang = this.props.language;

    return (
      <div
        className="main-home-header"
        style={this.props.isShowBanner === true ? { height: "600px" } : {}}
      >
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <div className="left-content-wrap">
                <FontAwesomeIcon className="header-bar-icon" icon={faBars} />
                <div
                  className="header-logo"
                  onClick={() => this.returnHomePage()}
                ></div>
              </div>
              <div></div>
            </div>
            <div className="center-content">
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id={"homeHeader.specialty"} />
                  </b>
                </div>
                <div>
                  <FormattedMessage id={"homeHeader.searchDoctor"} />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id={"homeHeader.health-facility"} />
                  </b>
                </div>
                <div>
                  <FormattedMessage id={"homeHeader.select-room"} />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id={"homeHeader.doctor"} />
                  </b>
                </div>
                <div>
                  <FormattedMessage id={"homeHeader.Choose-doctor"} />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id={"homeHeader.fee"} />
                  </b>
                </div>
                <div>
                  <FormattedMessage id={"homeHeader.check-health"} />
                </div>
              </div>
            </div>
            <div className="right-content">
              <div className="support">
                <FontAwesomeIcon
                  className="support-icon"
                  icon={faCircleQuestion}
                />
                <span>
                  {" "}
                  <FormattedMessage id={"homeHeader.support"} />
                </span>
              </div>
              <div className="flag">
                <span
                  className={lang === LANGUAGES.VI ? "active" : ""}
                  onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}
                >
                  VN
                </span>
              </div>
              <div className="flag">
                <span
                  className={lang === LANGUAGES.EN ? "active" : ""}
                  onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}
                >
                  EN
                </span>
              </div>
            </div>
          </div>
        </div>
        {this.props.isShowBanner === true && (
          <div className="home-header-banner">
            <div className="banner-up">
              <h1 className="title1">
                <span>
                  <FormattedMessage id={"banner.title1"} />
                </span>
                <br />
                <span>
                  <b>
                    <FormattedMessage id={"banner.title2"} />
                  </b>
                </span>
              </h1>
              <div className="search">
                <FontAwesomeIcon
                  className="banner-search-icon"
                  icon={faMagnifyingGlass}
                />
                <input
                  type="text"
                  placeholder={
                    this.props.language === LANGUAGES.VI
                      ? "Tìm chuyên khoa"
                      : "Find a specialty"
                  }
                />
                <FontAwesomeIcon
                  className="banner-search-icon-close"
                  icon={faXmark}
                />
              </div>
            </div>

            <div className="banner-bottom">
              <ul className="banner-list">
                <li className="banner-item">
                  <a href="#">
                    <div className="image">
                      <img src={chuyenKhoa} alt="logo" />
                    </div>
                    <FormattedMessage id={"banner.examination-specialty"} />
                  </a>
                </li>

                <li className="banner-item">
                  <a href="#">
                    <div className="image">
                      <img src={khamTuXa} alt="logo" />
                    </div>
                    <FormattedMessage id={"banner.examination-far"} />
                  </a>
                </li>

                <li className="banner-item">
                  <a href="#">
                    <div className="image">
                      <img src={khamTongQuat} alt="logo" />
                    </div>
                    <FormattedMessage id={"banner.test-generality"} />
                  </a>
                </li>

                <li className="banner-item">
                  <a href="#">
                    <div className="image">
                      <img src={xetNgihiem} alt="logo" />
                    </div>
                    <FormattedMessage id={"banner.test-medicine"} />
                  </a>
                </li>

                <li className="banner-item">
                  <a href="#">
                    <div className="image">
                      <img src={sucKhoeTinhThan} alt="logo" />
                    </div>
                    <FormattedMessage id={"banner.health-morale"} />
                  </a>
                </li>

                <li className="banner-item">
                  <a href="#">
                    <div className="image">
                      <img src={khamNhaKhoa} alt="logo" />
                    </div>
                    <FormattedMessage id={"banner.examination-dentistry"} />
                  </a>
                </li>

                <li className="banner-item">
                  <a href="#">
                    <div className="image">
                      <img src={goiPhauThuat} alt="logo" />
                    </div>
                    <FormattedMessage id={"banner.surgery-package"} />
                  </a>
                </li>
                <li className="banner-item">
                  <a href="#">
                    <div className="image">
                      <img src={sanPhamYte} alt="logo" />
                    </div>
                    <FormattedMessage id={"banner.medical-products"} />
                  </a>
                </li>
                <li className="banner-item">
                  <a href="#">
                    <div className="image">
                      <img src={sucKhoeDoanhNghiep} alt="logo" />
                    </div>
                    <FormattedMessage id={"banner.business-health"} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}
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
    changeLanguageRedux: (language) => dispatch(changeLanguage(language)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
