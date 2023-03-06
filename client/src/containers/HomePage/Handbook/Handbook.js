import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import yhoccotruyen from "../../../assets/images/yhoccotruyen.jpg";
import "./Handbook.scss";
class Handbook extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4000,
      cssEase: "linear",
    };

    return (
      <div className="section-handbook">
        <div className="handbook-content">
          <div className="handbook-header">
            <h2>Cẩm nang</h2>
            <button>Tất cả bài viết</button>
          </div>
          <Slider className="handbook-slider" {...settings}>
            <div className="slider-customize">
              <img src={yhoccotruyen} alt="img" />
              <div className="handbook-desc">
                <h3>
                  Nha khoa New Gate: Ưu đãi đến 50% tất cả dịch vụ nha khoa
                </h3>
              </div>
            </div>

            <div className="slider-customize">
              <img src={yhoccotruyen} alt="img" />
              <div className="handbook-desc">
                <h3>
                  Nha khoa New Gate: Ưu đãi đến 50% tất cả dịch vụ nha khoa
                </h3>
              </div>
            </div>

            <div className="slider-customize">
              <img src={yhoccotruyen} alt="img" />
              <div className="handbook-desc">
                <h3>
                  Nha khoa New Gate: Ưu đãi đến 50% tất cả dịch vụ nha khoa
                </h3>
              </div>
            </div>

            <div className="slider-customize">
              <img src={yhoccotruyen} alt="img" />
              <div className="handbook-desc">
                <h3>
                  Nha khoa New Gate: Ưu đãi đến 50% tất cả dịch vụ nha khoa
                </h3>
              </div>
            </div>

            <div className="slider-customize">
              <img src={yhoccotruyen} alt="img" />
              <div className="handbook-desc">
                <h3>
                  Nha khoa New Gate: Ưu đãi đến 50% tất cả dịch vụ nha khoa
                </h3>
              </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Handbook);
