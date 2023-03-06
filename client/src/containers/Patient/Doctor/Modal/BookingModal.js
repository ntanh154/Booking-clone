import React, { Component } from "react";
import { connect } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { Modal } from "reactstrap";
import { FormattedMessage } from "react-intl";
import "./BookingModal.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import ProfileDoctor from "../ProfileDoctor";
import DatePicker from "../../../../components/Input/DatePicker";
import * as actions from "../../../../store/actions";
import { LANGUAGES } from "../../../../utils";
import Select from "react-select";
import _ from "lodash";
import { postPatientBookingAppointment } from "../../../../services/userService";
import { toast } from "react-toastify";
import moment from "moment";
import localization from "moment/locale/vi";
import LoadingOverlay from "react-loading-overlay-ts";

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      phoneNumber: "",
      address: "",
      email: "",
      reason: "",
      birthDay: "",
      selectGender: "",
      doctorId: "",
      timeType: "",

      genders: "",

      isShowLoading: false,
    };
  }
  async componentDidMount() {
    this.props.getGender();
  }
  builtDataGender = (data) => {
    let result = [];
    let { language } = this.props;
    if (data && data.length > 0) {
      data.map((item) => {
        let object = {};
        object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
        object.value = item.keyMap;
        result.push(object);
      });
    }
    return result;
  };
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.language !== this.props.language) {
      this.setState({
        genders: this.builtDataGender(this.props.genders),
      });
    }
    if (prevProps.genders !== this.props.genders) {
      this.setState({
        genders: this.builtDataGender(this.props.genders),
      });
    }
    if (prevProps.dataTime !== this.props.dataTime) {
      if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
        let doctorId = this.props.dataTime.doctorId;
        let timeType = this.props.dataTime.timeType;
        this.setState({
          doctorId: doctorId,
          timeType: timeType,
        });
      }
    }
  }

  handleOnchangeInput = (e, id) => {
    let valueInput = e.target.value;
    let copyState = { ...this.state };
    copyState[id] = valueInput;
    this.setState({
      ...copyState,
    });
  };
  handleChangeDatePicker = (date) => {
    this.setState({
      birthDay: date[0],
    });
  };
  handleChangeSelect = (selectOption) => {
    this.setState({
      selectGender: selectOption,
    });
  };
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  buildTimeBooking = (dataTime) => {
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
      return `${time} - ${this.capitalizeFirstLetter(date)}`;
    }
    return "";
  };
  buildDoctorName = (dataTime) => {
    let { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let name =
        language === LANGUAGES.VI
          ? `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
          : `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`;
      return name;
    }
    return "";
  };
  handleConfirm = async () => {
    this.setState({
      isShowLoading: true,
    });
    //Validate
    let date = new Date(this.state.birthDay).getTime();
    let timeString = this.buildTimeBooking(this.props.dataTime);
    let doctorName = this.buildDoctorName(this.props.dataTime);
    let res = await postPatientBookingAppointment({
      fullName: this.state.fullName,
      phoneNumber: this.state.phoneNumber,
      address: this.state.address,
      email: this.state.email,
      reason: this.state.reason,
      date: this.props.dataTime.date,
      birthDay: date,
      timeType: this.state.timeType,
      selectGender: this.state.selectGender.value,
      doctorId: this.state.doctorId,
      language: this.props.language,
      timeString: timeString,
      doctorName: doctorName,
    });
    if (res && res.errCode === 0) {
      toast.success("Create patient success !");
      this.props.isCloseModal();
      this.setState({
        isShowLoading: false,
      });
    } else {
      this.setState({
        isShowLoading: false,
      });
      toast.error("Create patient failed !");
    }
  };

  render() {
    let {
      fullName,
      phoneNumber,
      address,
      email,
      reason,
      birthDay,
      selectGender,
      doctorId,
    } = this.state;
    let { isOpenModal, isCloseModal, dataTime } = this.props;

    return (
      <LoadingOverlay
        active={this.state.isShowLoading}
        spinner
        text="Loading..."
      >
        <Modal
          isOpen={isOpenModal}
          centered
          // toggle={this.toggle}
          size="lg"
          className={"booking-modal-container"}
        >
          <div className="booking-modal-content">
            <div className="booking-modal-header">
              <span className="left">
                <FormattedMessage id="modal-booking.title" />
              </span>
              <span className="right">
                <FontAwesomeIcon icon={faXmark} onClick={isCloseModal} />
              </span>
            </div>
            <div className="booking-modal-body">
              {/* {JSON.stringify(dataTime)} */}
              <div className="doctor-info">
                <ProfileDoctor
                  isShowDescDoctor={false}
                  doctorId={doctorId}
                  dataTime={dataTime}
                  isShowLinkDetail={false}
                  isShowPrice={true}
                />
              </div>

              <div className="row">
                <div className="col-md-6 form-group">
                  <label>
                    {" "}
                    <FormattedMessage id="modal-booking.fullName" />
                  </label>
                  <input
                    className="form-control"
                    value={fullName}
                    onChange={(e) => this.handleOnchangeInput(e, "fullName")}
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label>
                    {" "}
                    <FormattedMessage id="modal-booking.phoneNumber" />
                  </label>
                  <input
                    className="form-control"
                    value={phoneNumber}
                    onChange={(e) => this.handleOnchangeInput(e, "phoneNumber")}
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label>
                    {" "}
                    <FormattedMessage id="modal-booking.email" />
                  </label>
                  <input
                    className="form-control"
                    value={email}
                    onChange={(e) => this.handleOnchangeInput(e, "email")}
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label>
                    {" "}
                    <FormattedMessage id="modal-booking.address" />
                  </label>
                  <input
                    className="form-control"
                    value={address}
                    onChange={(e) => this.handleOnchangeInput(e, "address")}
                  />
                </div>
                <div className="col-md-12 form-group">
                  <label>
                    {" "}
                    <FormattedMessage id="modal-booking.reason" />
                  </label>
                  <input
                    className="form-control"
                    value={reason}
                    onChange={(e) => this.handleOnchangeInput(e, "reason")}
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label>
                    {" "}
                    <FormattedMessage id="modal-booking.birthDay" />
                  </label>
                  <DatePicker
                    className="form-control"
                    onChange={this.handleChangeDatePicker}
                    value={birthDay}
                  />
                </div>
                <div className="col-md-6 form-group">
                  <label>
                    {" "}
                    <FormattedMessage id="modal-booking.gender" />
                  </label>
                  <Select
                    value={selectGender}
                    onChange={this.handleChangeSelect}
                    options={this.state.genders}
                  />
                </div>
              </div>
            </div>
            <div className="booking-modal-footer">
              <button
                className="btn-booking-confirm"
                onClick={() => this.handleConfirm()}
              >
                <FormattedMessage id="modal-booking.confirm" />
              </button>
              <button className="btn-booking-cancel" onClick={isCloseModal}>
                <FormattedMessage id="modal-booking.cancel" />
              </button>
            </div>
          </div>
        </Modal>
      </LoadingOverlay>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGender: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
