import React, { Component } from "react";
import { connect } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils/constant";
import NumberFormat from "react-number-format";
import "./ProfileDoctor.scss";
import { getProfileDoctorById } from "../../../services/userService";
import _ from "lodash";
import moment from "moment";
import localization from "moment/locale/vi";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProfile: {},
    };
  }
  async componentDidMount() {
    let data = await this.getInfoDoctor(this.props.doctorId);
    this.setState({
      dataProfile: data,
    });
  }
  getInfoDoctor = async (id) => {
    let result = {};
    if (id) {
      let res = await getProfileDoctorById(id);
      if (res && res.data) {
        result = res.data;
      }
    }
    return result;
  };
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.language !== this.props.language) {
      let data = await this.getInfoDoctor(this.props.doctorId);
      this.setState({
        dataProfile: data,
      });
    }
    if (prevProps.doctorId !== this.props.doctorId) {
      let data = await this.getInfoDoctor(this.props.doctorId);
      this.setState({
        dataProfile: data,
      });
    }
  }
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  renderTimeBooking = (dataTime) => {
    let { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let time =
        language === LANGUAGES.VI
          ? dataTime.timeTypeData.valueVi
          : dataTime.timeTypeData.valueEn;
      let date =
        language === LANGUAGES.VI
          ? moment.unix(+dataTime.date / 1000).format("dddd - DD/MM/YYYY")
          : moment(+dataTime.date)
              .locale("en")
              .format("ddd - MM/DD/YYYY");
      return (
        <>
          <div>
            {time} - {this.capitalizeFirstLetter(date)}
          </div>
          <div>
            <FormattedMessage id="modal-booking.free" />
          </div>
        </>
      );
    }
    return <></>;
  };

  render() {
    let { dataProfile } = this.state;
    let {
      language,
      isShowDescDoctor,
      dataTime,
      isShowLinkDetail,
      isShowPrice,
      doctorId,
    } = this.props;

    let nameVi = "",
      nameEn = "";
    if (dataProfile && dataProfile.positionData) {
      nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`;
      nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
    }
    return (
      <>
        <div className="intro-doctor">
          <div className="content-left">
            <div
              className="doctor-image"
              style={{
                backgroundImage: `url(${
                  dataProfile.image ? dataProfile.image : ""
                })`,
              }}
            ></div>
          </div>
          <div className="content-right">
            <div className="up">
              {language === LANGUAGES.VI ? nameVi : nameEn}
            </div>
            <div className="down">
              {isShowDescDoctor === true ? (
                <>
                  {dataProfile.Markdown && dataProfile.Markdown.description && (
                    <span>{dataProfile.Markdown.description}</span>
                  )}
                </>
              ) : (
                this.renderTimeBooking(dataTime)
              )}
            </div>
          </div>
        </div>
        {isShowLinkDetail === true && (
          <div className="see-more">
            <Link to={`/detail-doctor/${doctorId}`}>
              <FormattedMessage id="modal-booking.see-more" />
            </Link>
          </div>
        )}
        {isShowPrice === true && (
          <div className="price">
            <span>
              {" "}
              <FormattedMessage id="modal-booking.price-book" />{" "}
            </span>
            <span>
              {dataProfile &&
              dataProfile.DoctorInfo &&
              language === LANGUAGES.VI ? (
                <NumberFormat
                  value={dataProfile.DoctorInfo.priceTypeData.valueVi}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={" VND"}
                />
              ) : (
                ""
              )}
              {dataProfile &&
              dataProfile.DoctorInfo &&
              language === LANGUAGES.EN ? (
                <NumberFormat
                  value={dataProfile.DoctorInfo.priceTypeData.valueEn}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix={" $"}
                />
              ) : (
                ""
              )}
            </span>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
