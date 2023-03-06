import React, { Component } from "react";
import { connect } from "react-redux";
import "./About.scss";

import "./About.scss";
class About extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div className="section-about">
        <div className="about-content">
          <div className="about-header">
            <h2>Thông tin nói về BookingCare</h2>
          </div>
          <div className="about-body">
            <div className="about-body_left">
              {/* <iframe
                width="460"
                height="264"
                src="https://www.youtube.com/embed/FyDQljKtWnI"
                title="CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              ></iframe> */}
            </div>
            <div className="about-body_right">
              <p>
                Quisque volutpat auctor sem, accumsan malesuada nunc interdum
                in. Donec sit amet dolor odio. Donec condimentum quam vel velit
                maximus, non dignissim nisi bibendum. Vestibulum ante ipsum
                primis in faucibus orci luctus et ultrices posuere cubilia
                curae; Nam posuere fringilla volutpat. Duis semper urna quam,
                vitae suscipit enim auctor sit amet. Sed rutrum libero viverra
                suscipit auctor. Praesent eleifend ligula nec eros egestas
              </p>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
