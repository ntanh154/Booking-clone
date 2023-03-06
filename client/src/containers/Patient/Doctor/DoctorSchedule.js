import React, { Component } from "react";
import { connect } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { getScheduleDoctorByDate } from "../../../services/userService";
import "./DoctorSchedule.scss";
import moment from "moment";
import localization from "moment/locale/vi";
import { LANGUAGES } from "../../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { FormattedMessage } from "react-intl";
import BookingModal from "./Modal/BookingModal";

class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      allAvailableTime: [],
      isOpenModalBooking: false,
      dataScheduleTime: {},
    };
  }
  async componentDidMount() {
    let { language } = this.props;
    let allDay = this.builtSchedule(language);
    if (allDay && allDay.length > 0) {
      this.setState({
        allDays: allDay,
      });
    }
    if (this.props.detailDoctorFromParent) {
      let res = await getScheduleDoctorByDate(
        this.props.detailDoctorFromParent,
        allDay[0].value
      );
      this.setState({
        allAvailableTime: res.data ? res.data : [],
      });
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
      let allDay = this.builtSchedule(this.props.language);
      this.setState({
        allDays: allDay,
      });
    }
    if (
      prevProps.detailDoctorFromParent !== this.props.detailDoctorFromParent
    ) {
      let allDay = this.builtSchedule(this.props.language);
      let res = await getScheduleDoctorByDate(
        this.props.detailDoctorFromParent,
        allDay[0].value
      );
      this.setState({
        allAvailableTime: res.data ? res.data : [],
      });
    }
  }
  handleOnChangeSelect = async (e) => {
    if (
      this.props.detailDoctorFromParent &&
      this.props.detailDoctorFromParent !== -1
    ) {
      const doctorId = this.props.detailDoctorFromParent;
      let date = e.target.value;
      let res = await getScheduleDoctorByDate(doctorId, date);
      if (res && res.errCode === 0) {
        this.setState({
          allAvailableTime: !res.data
            ? []
            : res.data.length > 0
            ? res.data
            : [],
        });
      }
    }
  };

  handleClickScheduleTime = (time) => {
    this.setState({
      isOpenModalBooking: true,
      dataScheduleTime: time,
    });
  };
  handleClickCloseModal = () => {
    this.setState({
      isOpenModalBooking: false,
    });
  };

  render() {
    let { allDays, allAvailableTime, isOpenModalBooking, dataScheduleTime } =
      this.state;
    let { language } = this.props;

    return (
      <>
        <div className="doctor-schedule-container">
          <div className="all-schedule">
            <select
              onChange={(e) => {
                this.handleOnChangeSelect(e);
              }}
            >
              {allDays &&
                allDays.length > 0 &&
                allDays.map((item, index) => {
                  return (
                    <option value={item.value} key={index}>
                      {item.label}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="all-available-time">
            <div className="text-calendar">
              <span>
                <FontAwesomeIcon
                  className="font-icon"
                  icon={faCalendarDays}
                ></FontAwesomeIcon>
                <FormattedMessage id="doctor-schedule.schedule" />
              </span>
            </div>
            <div className="time-content">
              {allAvailableTime && allAvailableTime.length > 0 ? (
                allAvailableTime.map((item, index) => {
                  return (
                    <button
                      onClick={() => this.handleClickScheduleTime(item)}
                      key={index}
                      className={
                        language === LANGUAGES.VI
                          ? "btn-schedule btn-schedule-vi"
                          : "btn-schedule btn-schedule-en"
                      }
                    >
                      {language === LANGUAGES.VI
                        ? item.timeTypeData.valueVi
                        : item.timeTypeData.valueEn}
                    </button>
                  );
                })
              ) : (
                <div>
                  <FormattedMessage id="doctor-schedule.days-schedule" />
                </div>
              )}
            </div>
            <div
              className="free-appointment"
              style={{
                display: `${
                  allAvailableTime && allAvailableTime.length > 0
                    ? "block"
                    : "none"
                }`,
              }}
            >
              <FormattedMessage id="doctor-schedule.free-appointment" />
            </div>
          </div>
        </div>
        <BookingModal
          isOpenModal={isOpenModalBooking}
          isCloseModal={this.handleClickCloseModal}
          dataTime={dataScheduleTime}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
