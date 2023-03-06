import React, { Component } from "react";
import { connect } from "react-redux";
import Specialty from "./Specialty/Specialty";
import bsnoibat from "../../assets/images/bsnoibat.jpg";
import * as actions from "../../store/actions";
import { LANGUAGES } from "../../utils/constant";
import { FormattedMessage } from "react-intl";
import "./Doctor.scss";
import { withRouter } from "react-router";

class Doctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrTopDoctor: [],
    };
  }

  componentDidMount() {
    const doctors = this.props.loadTopDoctors();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctors !== this.props.topDoctors) {
      this.setState({
        arrTopDoctor: this.props.topDoctors,
      });
    }
  }

  handleViewDetailDoctor = (doctor) => {
    if (this.props.history) {
      this.props.history.push(`/detail-doctor/${doctor.id}`);
    }
  };

  render() {
    const allDoctor = this.state.arrTopDoctor;
    const language = this.props.language;

    return (
      <Specialty
        classSection={"section-h380"}
        classSlider={"h255-slider"}
        label={<FormattedMessage id="homePage.DoctorsSection" />}
        textButton={<FormattedMessage id="homePage.DoctorMore" />}
        background={{ background: " #f5f5f5" }}
      >
        {allDoctor &&
          allDoctor.length > 0 &&
          allDoctor.map((item, index) => {
            let imageBase64 = "";
            if (item.image) {
              imageBase64 = Buffer.from(item.image, "base64").toString(
                "binary"
              );
            }
            const nameVi = `${item.positionData.valueVi}, ${item.firstName} ${item.lastName}`;
            const nameEn = `${item.positionData.valueEn}, ${item.lastName} ${item.firstName}`;
            return (
              <div
                className="img-custom h255-border"
                key={item.id}
                onClick={() => this.handleViewDetailDoctor(item)}
              >
                <div className="doctor">
                  <div className="doctor-img">
                    <div
                      className="img"
                      style={{ background: `url(${imageBase64})` }}
                      alt="img"
                    />
                    <h2>{language === LANGUAGES.VI ? nameVi : nameEn}</h2>
                    <span>{item.positionData.valueVi}</span>
                  </div>
                </div>
              </div>
            );
          })}

        <div className="img-custom h255-border">
          <div className="doctor">
            <div className="doctor-img">
              <div
                className="img"
                style={{ background: `url(${bsnoibat})` }}
                alt="img"
              />
              <h2>Giáo sư, Tiến sĩ Hà Văn Quyết</h2>
              <span>Bệnh Viêm gan</span>
            </div>
          </div>
        </div>
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
  return {
    loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Doctor));
