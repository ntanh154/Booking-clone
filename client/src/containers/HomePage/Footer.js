import React, { Component } from "react";
import { connect } from "react-redux";
import "./Footer.scss";
import facebook from "../../assets/images/facebook-square.svg";
import youtube from "../../assets/images/youtube-square.svg";

import "./Footer.scss";
class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div className="section-footer">
        <div className="footer-content">
          <p> &copy; 2022 Dr.Minh Tri</p>
          <div className="footer-icon">
            <a href="a">
              <img src={facebook} alt="img" />
            </a>
            <a href="a">
              <img src={youtube} alt="img" />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
