import React, { Component } from "react";
import { connect } from "react-redux";
import benhvien from "../../assets/images/bv1.jpg";
import Specialty from "./Specialty/Specialty";
import { getAllClinic } from "../../services/userService";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";
class OutstandingHospital extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataClinics: [],
    };
  }

  async componentDidMount() {
    let res = await getAllClinic();
    if (res && res.errCode === 0) {
      this.setState({
        dataClinics: res.data ? res.data : [],
      });
    }
  }
  componentDidUpdate(prevProps) {}
  handleDetailClinic = (clinic) => {
    console.log("check item detail clinic:", clinic);
    if (this.props.history) {
      this.props.history.push(`/detail-clinic/${clinic.id}`);
    }
  };
  render() {
    let { dataClinics } = this.state;
    return (
      <Specialty
        classSection={"section-h380"}
        label={<FormattedMessage id="out-stand.title" />}
        textButton={<FormattedMessage id="out-stand.button" />}
        background={{ background: " #fff" }}
      >
        {dataClinics &&
          dataClinics.length > 0 &&
          dataClinics.map((item, index) => {
            return (
              <div
                className="img-custom"
                key={index}
                onClick={() => this.handleDetailClinic(item)}
              >
                <div
                  className="img-outstand"
                  style={{
                    background: `url(${item.image}) center  no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
                <p>{item.name}</p>
              </div>
            );
          })}
      </Specialty>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
    topDoctors: state.admin.topDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OutstandingHospital)
);
