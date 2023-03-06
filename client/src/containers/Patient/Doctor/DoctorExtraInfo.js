import React, { Component } from "react";
import { connect } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { getExtraInfoDoctorById } from "../../../services/userService";
import "./DoctorExtraInfo.scss";
import moment from "moment";

import { LANGUAGES } from "../../../utils";

import { FormattedMessage } from "react-intl";
import NumberFormat from "react-number-format";

class DoctorExtraInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailInfo: false,
      extraInfo: {},
    };
  }
  async componentDidMount() {
    if (this.props.detailDoctorFromParent) {
      let id = this.props.detailDoctorFromParent;
      let res = await getExtraInfoDoctorById(id);
      if (res && res.errCode === 0) {
        this.setState({
          extraInfo: res.data,
        });
      }
    }
  }
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  builtSchedule = (language) => {
    let arrDate = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (language === LANGUAGES.VI) {
        if (i === 0) {
          let ddMM = moment(new Date()).format("DD/MM");
          let today = `Hôm nay - ${ddMM}`;
          object.label = this.capitalizeFirstLetter(today);
        } else {
          let labelVi = moment(new Date())
            .add(i, "days")
            .format("dddd - DD/MM");
          object.label = this.capitalizeFirstLetter(labelVi);
        }
      } else {
        if (i === 0) {
          let ddMM = moment(new Date()).format(" DD/MM");
          let today = `Today - ${ddMM}`;
          object.label = this.capitalizeFirstLetter(today);
        } else {
          object.label = moment(new Date())
            .add(i, "days")
            .locale("en")
            .format("ddd - DD/MM");
        }
      }

      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      arrDate.push(object);
    }
    return arrDate;
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.language !== this.props.language) {
      let id = this.props.detailDoctorFromParent;
      let res = await getExtraInfoDoctorById(id);
      if (res && res.errCode === 0) {
        this.setState({
          extraInfo: res.data,
        });
      }
    }
    if (
      prevProps.detailDoctorFromParent !== this.props.detailDoctorFromParent
    ) {
      let id = this.props.detailDoctorFromParent;
      let res = await getExtraInfoDoctorById(id);
      if (res && res.errCode === 0) {
        this.setState({
          extraInfo: res.data,
        });
      }
    }
  }
  showHiddenInfoDoctor = (status) => {
    this.setState({
      isShowDetailInfo: status,
    });
  };
  render() {
    let { isShowDetailInfo, extraInfo } = this.state;
    let { language } = this.props;

    return (
      <div className="doctor-extra-info-container">
        <div className="content-up">
          <div className="text-address">
            <FormattedMessage id="extra-Info.address" />
          </div>
          <div className="name-clinic">
            {extraInfo && extraInfo.nameClinic ? extraInfo.nameClinic : ""}
          </div>
          <div className="detail-address">
            {extraInfo && extraInfo.addressClinic
              ? extraInfo.addressClinic
              : ""}
          </div>
        </div>
        <div className="content-down">
          {isShowDetailInfo === false ? (
            <div className="show-detail">
              <>
                <FormattedMessage id="extra-Info.price" />{" "}
                {extraInfo &&
                  extraInfo.priceTypeData &&
                  language === LANGUAGES.VI && (
                    <NumberFormat
                      value={extraInfo.priceTypeData.valueVi}
                      displayType={"text"}
                      thousandSeparator={true}
                      suffix={"VND"}
                    />
                  )}
                {extraInfo &&
                  extraInfo.priceTypeData &&
                  language === LANGUAGES.EN && (
                    <NumberFormat
                      value={extraInfo.priceTypeData.valueEn}
                      displayType={"text"}
                      thousandSeparator={true}
                      suffix={"$"}
                    />
                  )}
              </>
              <span
                className="show-span"
                onClick={() => this.showHiddenInfoDoctor(true)}
              >
                <FormattedMessage id="extra-Info.show-detail" />
              </span>
            </div>
          ) : (
            <>
              <div className="title-price">
                {" "}
                <FormattedMessage id="extra-Info.price" />
              </div>
              <div className="container-price">
                <div className="detail-body">
                  <div className="detail-price">
                    <span className="left">
                      {" "}
                      <FormattedMessage id="extra-Info.price" />
                    </span>
                    <span className="right">
                      {extraInfo &&
                        extraInfo.priceTypeData &&
                        language === LANGUAGES.VI && (
                          <NumberFormat
                            value={extraInfo.priceTypeData.valueVi}
                            displayType={"text"}
                            thousandSeparator={true}
                            suffix={"VND"}
                          />
                        )}
                      {extraInfo &&
                        extraInfo.priceTypeData &&
                        language === LANGUAGES.EN && (
                          <NumberFormat
                            value={extraInfo.priceTypeData.valueEn}
                            displayType={"text"}
                            thousandSeparator={true}
                            suffix={"$"}
                          />
                        )}
                    </span>
                  </div>
                  <div className="detail-price-info">
                    <div>
                      {" "}
                      {extraInfo && extraInfo.note ? extraInfo.note : ""}
                    </div>
                  </div>
                </div>
                <div className="desc-payment">
                  <FormattedMessage id="extra-Info.method" />
                  {extraInfo &&
                  extraInfo.paymentTypeData &&
                  language === LANGUAGES.VI
                    ? extraInfo.paymentTypeData.valueVi
                    : extraInfo.paymentTypeData.valueEn}
                </div>
              </div>
              <div className="hidden-price">
                <span onClick={() => this.showHiddenInfoDoctor(false)}>
                  <FormattedMessage id="extra-Info.hidden-detail" />
                </span>
              </div>
            </>
          )}
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
