import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./Specialty.scss";
class Specialty extends Component {
  constructor(props) {
    super(props);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.state = {};
  }
  play() {
    this.slider.slickPlay();
  }
  pause() {
    this.slider.slickPause();
  }
  componentDidMount() {}

  render() {
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: false,
      autoplaySpeed: 4000,
    };

    return (
      <div
        className={`section-specialty ${
          this.props.classSection ? this.props.classSection : ""
        }`}
        style={this.props.background}
      >
        <div className="specialty-content">
          <div className="specialty-header">
            <h2>{this.props.label}</h2>
            <button>{this.props.textButton}</button>
          </div>
          <Slider
            className={`specialty-slider ${
              this.props.classSlider ? this.props.classSlider : ""
            }`}
            ref={(slider) => (this.slider = slider)}
            {...settings}
          >
            {this.props.children}
          </Slider>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
