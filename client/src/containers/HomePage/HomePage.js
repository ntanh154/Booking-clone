import React, { Component } from "react";
import { connect } from "react-redux";
import About from "./About";
import Doctor from "./Doctor";
import Footer from "./Footer";
import Handbook from "./Handbook/Handbook";
import HomeHeader from "./HomeHeader/HomeHeader";
import OutstandingHospital from "./OutstandingHospital";

import SpecialtyPopulation from "./SpecialtyPopulation";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <HomeHeader isShowBanner={true} />
        <div className="fix-content">
          <SpecialtyPopulation />
          <OutstandingHospital />
          <Doctor />
          <Handbook />
          <About />
          <Footer />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
