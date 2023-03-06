import MarkdownIt from "markdown-it";
import React, { Component } from "react";
import MdEditor from "react-markdown-editor-lite";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils/constant";
import "./ManageDoctor.scss";
import { getDetailInfoDoctor } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //Save to Markdown table
      contentMarkdown: "",
      contentHTML: "",
      selectDoctor: "",
      description: "",
      listDoctors: [],
      hasOldData: false,

      //Save to doctorInfo table
      listPrice: [],
      listPayment: [],
      listProvince: [],
      listClinic: [],
      listSpecialty: [],
      selectPrice: "",
      selectPayment: "",
      selectProvince: "",
      selectClinic: "",
      selectSpecialty: "",
      nameClinic: "",
      addressClinic: "",
      note: "",
      specialtyId: "",
      clinicId: "",
    };
  }
  builtDataInputSelect = (inputData, type) => {
    let result = [];
    const { language } = this.props;

    if (inputData && inputData.length > 0) {
      if (type === "USERS") {
        inputData.map((item, index) => {
          let object = {};
          const labelVi = `${item.id} - ${item.lastName} ${item.firstName}`;

          const labelEn = `${item.id} - ${item.firstName} ${item.lastName}`;

          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.id;
          result.push(object);
        });
      }
      if (type === "PRICES") {
        inputData.map((item, index) => {
          let object = {};
          const labelVi =
            new Intl.NumberFormat("vi-IN", {
              maximumSignificantDigits: 3,
            }).format(item.valueVi) + " Đồng";

          const labelEn = `${item.valueEn} USD`;

          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }
      if (type === "PAYMENTS" || type === "PROVINCES") {
        inputData.map((item, index) => {
          let object = {};
          const labelVi = `${item.valueVi}`;

          const labelEn = `${item.valueEn}`;

          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }
      if (type === "SPECIALTY") {
        inputData.map((item, index) => {
          let object = {};

          object.label = `${item.id} - ${item.name}`;
          object.value = item.id;
          result.push(object);
        });
      }
      if (type === "CLINIC") {
        inputData.map((item, index) => {
          let object = {};

          object.label = `${item.id} - ${item.name}`;
          object.value = item.id;
          result.push(object);
        });
      }
    }
    return result;
  };

  async componentDidMount() {
    try {
      await this.props.getAllDoctorsRedux();
      await this.props.getRequireDoctorInfo();
      console.log(
        "check did mount getRequireDoctorInfo",
        this.props.getAllDoctorsRedux()
      );
    } catch (error) {
      console.log("error loading data");
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      const dataSelect = this.builtDataInputSelect(
        this.props.allDoctors,
        "USERS"
      );
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      const dataSelect = this.builtDataInputSelect(
        this.props.allDoctors,
        "USERS"
      );
      let { dataPayment, dataPrice, dataProvince, dataSpecialty, dataClinic } =
        this.props.allRequiredDoctorInfo;
      let dataSelectPrice = this.builtDataInputSelect(dataPrice, "PRICES");
      let dataSelectPayment = this.builtDataInputSelect(
        dataPayment,
        "PAYMENTS"
      );
      let dataSelectProvince = this.builtDataInputSelect(
        dataProvince,
        "PROVINCES"
      );
      let dataSelectSpecialty = this.builtDataInputSelect(
        dataSpecialty,
        "SPECIALTY"
      );

      let dataSelectClinic = this.builtDataInputSelect(dataClinic, "CLINIC");
      this.setState({
        listDoctors: dataSelect,
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
        listSpecialty: dataSelectSpecialty,
        listClinic: dataSelectClinic,
      });
    }
    if (prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo) {
      let { dataPayment, dataPrice, dataProvince, dataSpecialty, dataClinic } =
        this.props.allRequiredDoctorInfo;
      let dataSelectPrice = this.builtDataInputSelect(dataPrice, "PRICES");
      let dataSelectPayment = this.builtDataInputSelect(
        dataPayment,
        "PAYMENTS"
      );
      let dataSelectProvince = this.builtDataInputSelect(
        dataProvince,
        "PROVINCES"
      );
      let dataSelectSpecialty = this.builtDataInputSelect(
        dataSpecialty,
        "SPECIALTY"
      );
      let dataSelectClinic = this.builtDataInputSelect(dataClinic, "CLINIC");
      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
        listSpecialty: dataSelectSpecialty,
        listClinic: dataSelectClinic,
      });
    }
  }
  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };

  handleSaveContentMarkdown = () => {
    const { hasOldData } = this.state;

    this.props.saveDetailDoctor({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectDoctor.value,
      action: hasOldData ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

      //save doctor info
      selectPrice: this.state.selectPrice.value,
      selectPayment: this.state.selectPayment.value,
      selectProvince: this.state.selectProvince.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
      clinicId:
        this.state.selectClinic && this.state.selectClinic.value
          ? this.state.selectClinic.value
          : "",
      specialtyId: this.state.selectSpecialty.value,
    });

    // this.setState({
    //   contentHTML: "",
    //   contentMarkdown: "",
    //   description: "",
    // });
  };
  handleChangeSelect = async (selectDoctor) => {
    this.setState({
      selectDoctor: selectDoctor,
    });
    let { listPayment, listPrice, listProvince, listSpecialty, listClinic } =
      this.state;

    let res = await getDetailInfoDoctor(selectDoctor.value);

    if (res && res.errCode === 0 && res.data && res.data.Markdown) {
      let markDown = res.data.Markdown;
      let addressClinic = "",
        nameClinic = "",
        note = "",
        paymentId = "",
        priceId = "",
        provinceId = "",
        specialtyId = "",
        clinicId = "",
        selectPayment = "",
        selectPrice = "",
        selectProvince = "",
        selectClinic = "",
        selectSpecialty = "";
      if (res.data.DoctorInfo) {
        let doctorInfo = res.data.DoctorInfo;
        addressClinic = doctorInfo.addressClinic;
        nameClinic = doctorInfo.nameClinic;
        note = doctorInfo.note;

        paymentId = doctorInfo.paymentId;
        provinceId = doctorInfo.provinceId;
        priceId = doctorInfo.priceId;
        clinicId = doctorInfo.clinicId;
        specialtyId = res.data.DoctorInfo.specialtyId;

        selectPayment = listPayment.find((item) => {
          return item && item.value === paymentId;
        });

        selectPrice = listPrice.find((item) => {
          return item && item.value === priceId;
        });

        selectProvince = listProvince.find((item) => {
          return item && item.value === provinceId;
        });
        selectSpecialty = listSpecialty.find((item) => {
          return item && item.value === specialtyId;
        });
        selectClinic = listClinic.find((item) => {
          return item && item.value === clinicId;
        });
      }

      this.setState({
        contentHTML: markDown.contentHTML,
        contentMarkdown: markDown.contentMarkdown,
        description: markDown.description,
        hasOldData: true,
        addressClinic: addressClinic,
        nameClinic: nameClinic,
        note: note,
        selectSpecialty: selectSpecialty,
        selectClinic: selectClinic,
        selectPayment: selectPayment,
        selectPrice: selectPrice,
        selectProvince: selectProvince,
        specialtyId: selectSpecialty.value,
        clinicId: selectClinic.value,
      });
    } else {
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        hasOldData: false,
        addressClinic: "",
        nameClinic: "",
        note: "",
        selectPayment: "",
        selectPrice: "",
        selectProvince: "",
        selectSpecialty: "",
        selectClinic: "",
      });
    }
  };
  handleChangeText = (e, name) => {
    let copyState = { ...this.state };
    copyState[name] = e.target.value;
    this.setState({
      ...copyState,
    });
  };
  handleChangeSelectDoctorInfo = async (selectOption, name) => {
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectOption;
    this.setState({
      ...stateCopy,
    });
  };

  render() {
    let {
      selectDoctor,
      hasOldData,
      listPayment,
      listPrice,
      listProvince,
      listSpecialty,
      listClinic,
      selectPrice,
      selectPayment,
      selectProvince,
      selectSpecialty,
      selectClinic,
    } = this.state;
    let { language } = this.props;

    return (
      <div className="manage-doctor-container">
        <div className="title manage-doctor-title">
          <FormattedMessage id="admin.manage-doctor.title" />
        </div>
        <div className="more-info">
          <div className="content-left form-group">
            <label>
              {" "}
              <FormattedMessage id="admin.manage-doctor.choose-doctor" />
            </label>
            <Select
              Value={selectDoctor}
              onChange={this.handleChangeSelect}
              options={this.state.listDoctors}
              placeholder={
                language === LANGUAGES.VI ? "Chọn bác sĩ" : "Choose doctor"
              }
            />
          </div>
          <div className="content-right form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.intro-info" />
            </label>
            <textarea
              className="form-control"
              onChange={(e) => this.handleChangeText(e, "description")}
              value={this.state.description}
              name="description"
            ></textarea>
          </div>
        </div>
        <div className="more-info-extra row">
          <div className="col-md-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.price" />
            </label>
            <Select
              // defaultValue={selectDoctor}
              value={selectPrice}
              name="selectPrice"
              onChange={this.handleChangeSelectDoctorInfo}
              options={listPrice}
              placeholder={
                language === LANGUAGES.VI ? "Chọn giá" : "Choose price"
              }
            />
          </div>
          <div className="col-md-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.payment" />
            </label>
            <Select
              value={selectPayment}
              name="selectPayment"
              onChange={this.handleChangeSelectDoctorInfo}
              options={listPayment}
              placeholder={
                language === LANGUAGES.VI
                  ? "Chọn phương thức thanh toán"
                  : "Choose a payment method"
              }
            />
          </div>
          <div className="col-md-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.province" />
            </label>
            <Select
              // defaultValue={selectDoctor}
              value={selectProvince}
              name="selectProvince"
              onChange={this.handleChangeSelectDoctorInfo}
              options={listProvince}
              placeholder={
                language === LANGUAGES.VI ? "Chọn tỉnh" : "Choose a province"
              }
            />
          </div>

          <div className="col-md-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.clinic-name" />
            </label>
            <input
              className="form-control"
              onChange={(e) => this.handleChangeText(e, "nameClinic")}
              value={this.state.nameClinic}
              name="nameClinic"
            />
          </div>
          <div className="col-md-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.clinic-address" />
            </label>
            <input
              className="form-control"
              onChange={(e) => this.handleChangeText(e, "addressClinic")}
              value={this.state.addressClinic}
              name="addressClinic"
            />
          </div>
          <div className="col-md-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.note" />
            </label>
            <input
              className="form-control"
              onChange={(e) => this.handleChangeText(e, "note")}
              value={this.state.note}
              name="note"
            />
          </div>
        </div>
        <div className="row mb-5">
          <div className="col-md-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.specialty" />
            </label>
            <Select
              Value={selectSpecialty}
              name="selectSpecialty"
              onChange={this.handleChangeSelectDoctorInfo}
              options={listSpecialty}
              placeholder={
                <FormattedMessage id="admin.manage-doctor.specialty" />
              }
            />
          </div>

          <div className="col-md-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.select-clinic" />
            </label>
            <Select
              Value={selectClinic}
              name="selectClinic"
              onChange={this.handleChangeSelectDoctorInfo}
              options={listClinic}
              placeholder={
                <FormattedMessage id="admin.manage-doctor.select-clinic" />
              }
            />
          </div>
        </div>
        <div className="manage-doctor-editor">
          <MdEditor
            style={{ height: "300px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
          />
        </div>

        <button
          className={`btn-manage-doctor btn ${
            hasOldData === false ? ` btn-primary` : `btn-info`
          }`}
          onClick={() => this.handleSaveContentMarkdown()}
        >
          {!hasOldData ? (
            <span>
              <FormattedMessage id="admin.manage-doctor.add" />
            </span>
          ) : (
            <span>
              <FormattedMessage id="admin.manage-doctor.save" />
            </span>
          )}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctors: state.admin.allDoctors,
    allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllUserRedux: () => dispatch(actions.fetchAllUserStart()),
    deleteUserRedux: (id) => dispatch(actions.deleteUser(id)),
    getAllDoctorsRedux: () => dispatch(actions.fetchAllDoctors()),
    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
    getRequireDoctorInfo: () => dispatch(actions.getRequireDoctorInfo()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
