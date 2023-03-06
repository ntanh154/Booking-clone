import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllSpecialty } from "../../services/userService";

import { LANGUAGES } from "../../utils/constant";
import Specialty from "./Specialty/Specialty";
import { withRouter } from "react-router";

class SpecialtyPopulation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSpecialty: [],
    };
  }

  async componentDidMount() {
    let res = await getAllSpecialty();

    if (res && res.errCode === 0) {
      this.setState({
        dataSpecialty: res.data ? res.data : [],
      });
    }
  }
  handleViewDetailSpecialty = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-specialty/${item.id}`);
    }
  };

  render() {
    let { dataSpecialty } = this.state;
    let { language } = this.props;
    return (
      <Specialty
        label={
          language === LANGUAGES.VI
            ? "Chuyên khoa phổ biến"
            : "Popular specialties"
        }
        textButton={language === LANGUAGES.VI ? "XEM THÊM" : "SEE MORE"}
        background={{ background: " #f5f5f5" }}
      >
        {dataSpecialty &&
          dataSpecialty.length > 0 &&
          dataSpecialty.map((item, index) => {
            return (
              <div
                key={index}
                className="img-custom"
                onClick={() => this.handleViewDetailSpecialty(item)}
              >
                <div
                  className="img-specialty-popular"
                  style={{
                    background: `url(${item.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                  alt="img"
                ></div>
                <p>{item.name}</p>
              </div>
            );
          })}

        {/* <div className="img-custom">
          <img src={yhoccotruyen} alt="img" />
          <p>Khoa y học cổ truyền</p>
        </div> */}
      </Specialty>
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SpecialtyPopulation)
);
