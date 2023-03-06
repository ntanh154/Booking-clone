import React, { Component } from "react";
import { connect } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { FormattedMessage } from "react-intl";
import "./ManagePatient.scss";
import DatePicker from "../../../components/Input/DatePicker";
import {
  getListPatientForDoctor,
  postSendRemeDy,
} from "../../../services/userService";
import moment from "moment";
import { formatDate } from "@formatjs/intl";
import { LANGUAGES } from "../../../utils";
import RemedyModal from "./RemedyModal";
import { toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay-ts";
class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf("day").valueOf(),
      dataPatient: [],
      isOpenModal: false,
      dataModal: {},
      isShowLoading: false,
    };
  }
  async componentDidMount() {
    this.getDataPatient();
  }
  getDataPatient = async () => {
    let { user } = this.props;
    let { currentDate } = this.state;
    let formatDate = new Date(currentDate).getTime();
    let res = await getListPatientForDoctor({
      doctorId: user.id ? user.id : -1,
      date: formatDate,
    });
    if (res && res.errCode === 0) {
      this.setState({
        dataPatient: res.data,
      });
    }
  };
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.user !== this.props.user) {
      this.getDataPatient();
    }
    if (prevProps.language !== this.props.language) {
      this.getDataPatient();
    }
  }
  handleChangeDatePicker = (date) => {
    this.setState(
      {
        currentDate: date[0],
      },
      async () => {
        await this.getDataPatient();
      }
    );
  };
  handleConfirm = (item) => {
    let data = {
      doctorId: item.doctorId,
      patientId: item.patientId,
      email: item.patientData.email,
      name: item.patientData.firstName,
      timeType: item.timeType,
    };
    this.setState({
      isOpenModal: true,
      dataModal: data,
    });
    console.log(item);
  };
  closeRemedyMoDal = () => {
    this.setState({
      isOpenModal: false,
      dataModal: {},
    });
  };
  sendRemedy = async (dataFromChild) => {
    let { dataModal } = this.state;
    this.setState({
      isShowLoading: true,
    });
    let res = await postSendRemeDy({
      email: dataFromChild.email,
      imageBase64: dataFromChild.imageBase64,
      doctorId: dataModal.doctorId,
      patientId: dataModal.patientId,
      timeType: dataModal.timeType,
      name: dataFromChild.name,
      language: this.props.language,
    });
    if (res && res.errCode === 0) {
      toast.success("Send Remedy succeed!");
      await this.getDataPatient();
      this.closeRemedyMoDal();
      this.setState({
        isShowLoading: false,
      });
    } else {
      toast.error("Send Remedy failed !");
      this.setState({
        isShowLoading: false,
      });
    }
    console.log(dataFromChild);
  };

  render() {
    let { dataPatient, isOpenModal, dataModal } = this.state;
    let { language } = this.props;
    return (
      <>
        <LoadingOverlay
          active={this.state.isShowLoading}
          spinner
          text="Loading..."
        >
          <div className="manage-patient-container container">
            <div className="mp-title title">
              <FormattedMessage id="manage-patient.title" />
            </div>
            <div className="mp-body">
              <div className="row">
                <div className="col-md-6 form-group">
                  <label>
                    <FormattedMessage id="manage-patient.chose-date" />
                  </label>
                  <DatePicker
                    className="form-control"
                    onChange={this.handleChangeDatePicker}
                    value={this.state.currentDate}
                  />
                </div>
              </div>
              <div className="row ">
                <div className="col-md-12 mt-3 mp-table">
                  <table>
                    <thead>
                      <tr>
                        <th>
                          <FormattedMessage id="manage-patient.numerical-order" />
                        </th>
                        <th>
                          <FormattedMessage id="manage-patient.schedule" />
                        </th>
                        <th>
                          <FormattedMessage id="manage-patient.fullName" />
                        </th>
                        <th>
                          <FormattedMessage id="manage-patient.address" />
                        </th>
                        <th>
                          <FormattedMessage id="manage-patient.gender" />
                        </th>
                        <th>
                          <FormattedMessage id="manage-patient.actions" />
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataPatient && dataPatient.length > 0 ? (
                        dataPatient.map((item, index) => {
                          let gender =
                            language === LANGUAGES.VI
                              ? item.patientData.genderData.valueVi
                              : item.patientData.genderData.valueEn;
                          let timeType =
                            language === LANGUAGES.VI
                              ? item.timeTypeDataPatient.valueVi
                              : item.timeTypeDataPatient.valueEn;

                          return (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{timeType}</td>
                              <td>{item.patientData.firstName}</td>
                              <td>{item.patientData.address}</td>
                              <td>{gender}</td>
                              <td className="btn-group-action">
                                <button
                                  className="btn btn-succeed"
                                  onClick={() => this.handleConfirm(item)}
                                >
                                  <FormattedMessage id="manage-patient.success" />
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={6}>No Data</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <RemedyModal
            isOpenModal={isOpenModal}
            dataModal={dataModal}
            closeRemedyMoDal={this.closeRemedyMoDal}
            sendRemedy={this.sendRemedy}
          />
        </LoadingOverlay>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    user: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
