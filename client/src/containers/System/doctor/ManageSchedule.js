import React, { Component } from "react";

import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { CRUD_ACTIONS, LANGUAGES, dateFormat } from "../../../utils/constant";
import "./ManageSchedule.scss";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import { toast } from "react-toastify";
import { saveBulkScheduleDoctor } from "../../../services/userService";

class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrayDoctors: [],
      selectDoctor: "",
      currentDate: "",
      rangeTime: [],
    };
  }
  builtDataInputSelect = (inputData) => {
    let result = [];
    const { language } = this.props;

    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        const labelVi = `${item.id} - ${item.lastName} ${item.firstName}`;
        const labelEn = `${item.id} - ${item.firstName} ${item.lastName}`;
        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };
  componentDidMount() {
    this.props.getAllDoctorsRedux();
    this.props.getAllScheduleTime();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      const dataSelect = this.builtDataInputSelect(this.props.allDoctors);
      this.setState({
        arrayDoctors: dataSelect,
      });
    }

    if (prevProps.dataScheduleTime !== this.props.dataScheduleTime) {
      this.setState({
        rangeTime: this.props.dataScheduleTime,
      });
    }
    // if (prevProps.language !== this.props.language) {
    //   const dataSelect = this.builtDataInputSelect(this.props.allDoctors);
    //   this.setState({
    //     arrayDoctors: dataSelect,
    //   });
    // }
  }
  handleChangeSelect = async (selectDoctor) => {
    this.setState({
      selectDoctor: selectDoctor,
    });
  };
  handleChangeDatePicker = (date) => {
    this.setState({
      currentDate: date[0],
    });
  };
  handleClickBtnTime = (value) => {
    const { rangeTime } = this.state;
    if (rangeTime && rangeTime.length > 0) {
      rangeTime.map((item) => {
        if (item.id === value.id) item.isSelected = !item.isSelected;
        return item;
      });
      let data = this.props.dataScheduleTime;
      if (data && data.length > 0) {
        data = data.map((item) => ({ ...item, isSelected: false }));
      }

      this.setState({
        rangeTime: rangeTime,
      });
    }
  };
  handleSaveInfoTime = async () => {
    let { rangeTime, currentDate, selectDoctor } = this.state;
    let result = [];
    const formattedDate = new Date(currentDate).getTime();
    if (!currentDate) {
      toast.error("you didn't choose the date!");
      return;
    } else if (!selectDoctor) {
      toast.error("You have not chosen a doctor!");
      return;
    }
    if (rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.filter((item) => item.isSelected === true);
      if (selectedTime && selectedTime.length > 0) {
        selectedTime.map((item) => {
          let object = {};
          object.doctorId = selectDoctor.value;
          object.date = formattedDate;
          object.timeType = item.keyMap;
          result.push(object);
        });
      } else {
        toast.error("You haven't booked your appointment yet!");
        return;
      }
      let res = await saveBulkScheduleDoctor({
        arrSchedule: result,
        doctorId: selectDoctor.value,
        formattedDate: formattedDate,
      });

      if (res && res.errCode === 0) {
        toast.success("Save info success");
      }
    }
  };

  render() {
    const { selectDoctor, rangeTime } = this.state;
    const { language } = this.props;
    let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

    return (
      <div className="manage-schedule-container container">
        <div className="m-s-title title">
          <FormattedMessage id="manage-schedule.title" />
        </div>
        <div className="row m-s-up">
          <div className="col-md-5 form-group">
            <label>
              <FormattedMessage id="manage-schedule.choose-doctor" />
            </label>
            <Select
              defaultValue={selectDoctor}
              onChange={this.handleChangeSelect}
              options={this.state.arrayDoctors}
            />
          </div>
          <div className="col-md-4 form-group">
            <label>
              <FormattedMessage id="manage-schedule.choose-date" />
            </label>
            <DatePicker
              className="form-control"
              onChange={this.handleChangeDatePicker}
              value={this.state.currentDate}
              minDate={yesterday}
            ></DatePicker>
          </div>
          <div className="col-md-1"></div>
          <button
            className="col-md-2 btn btn-primary"
            onClick={() => this.handleSaveInfoTime()}
          >
            <FormattedMessage id="manage-schedule.save" />
          </button>
        </div>
        <div className="row">
          <div className="col-md-12 pick-hour-container">
            {rangeTime &&
              rangeTime.length > 0 &&
              rangeTime.map((item, index) => {
                return (
                  <button
                    key={index}
                    className={`btn btn-warning ${
                      item.isSelected === true ? `btn-active` : `btn-schedule`
                    }`}
                    onClick={() => this.handleClickBtnTime(item)}
                  >
                    {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                  </button>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctors: state.admin.allDoctors,
    language: state.app.language,
    dataScheduleTime: state.admin.allScheduleTime,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoctorsRedux: () => dispatch(actions.fetchAllDoctors()),
    getAllScheduleTime: () => dispatch(actions.fetchAllScheduleTimes()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
