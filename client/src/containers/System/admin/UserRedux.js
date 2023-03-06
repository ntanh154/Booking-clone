import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import TableManageUser from "./TableManageUser";
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImg: "",
      isOpen: false,

      email: "",
      password: "",
      lastName: "",
      firstName: "",
      address: "",
      phoneNumber: "",
      gender: "",
      position: "",
      role: "",
      avatar: "",
      action: "",
      userEditId: "",
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
    // try {
    //   const res = await getAllCodeService("gender");
    //   if (res && res.errCode === 0) {
    //     this.setState({
    //       genderArr: res.data,
    //     });
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  }
  componentDidUpdate(prevProps) {
    if (this.props.genderRedux !== prevProps.genderRedux) {
      const arrGender = this.props.genderRedux;
      this.setState({
        genderArr: arrGender,
        gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : "",
      });
    }

    if (this.props.positionRedux !== prevProps.positionRedux) {
      const arrPosition = this.props.positionRedux;
      this.setState({
        positionArr: arrPosition,
        positionId:
          arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : "",
      });
    }

    if (this.props.roleRedux !== prevProps.roleRedux) {
      const arrRole = this.props.roleRedux;
      this.setState({
        roleArr: arrRole,
        roleId: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : "",
      });
    }

    if (prevProps.listUsers !== this.props.listUsers) {
      const arrGender = this.props.genderRedux;
      const arrPosition = this.props.positionRedux;
      const arrRole = this.props.roleRedux;
      this.setState({
        email: "",
        password: "",
        lastName: "",
        firstName: "",
        address: "",
        phoneNumber: "",
        gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : "",
        position:
          arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : "",
        role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : "",
        avatar: "",
        action: CRUD_ACTIONS.CREATE,
        previewImg: "",
      });
    }
  }
  // positionArr: this.props.positionRedux,
  // roleArr: this.props.roleRedux,
  handleOnchangeImage = async (e) => {
    const data = e.target.files;
    const file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);

      const URLFile = URL.createObjectURL(file);
      this.setState({
        previewImg: URLFile,
        avatar: base64,
      });
    }
  };
  handleOnClickImg = () => {
    if (!this.state.previewImg) return;
    this.setState({
      isOpen: true,
    });
  };
  handleOnChangeInput = (e, id) => {
    const copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let isValid = this.checkValidateInput();
    if (isValid === false) return;
    let { action } = this.state;
    if (action === CRUD_ACTIONS.CREATE) {
      //fire create user redux
      this.props.createNewUserRedux({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        avatar: this.state.avatar,
      });
    }
    if (action === CRUD_ACTIONS.EDIT) {
      // Fire edit user
      this.props.editUserRedux({
        id: this.state.userEditId,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phoneNumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        avatar: this.state.avatar,
      });
    }
  };
  checkValidateInput = () => {
    let isValid = true;
    const arrCheck = [
      "email",
      "password",
      "lastName",
      "firstName",
      "address",
      "phoneNumber",
    ];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert("This input is required: " + arrCheck[i]);
        break;
      }
    }
    return isValid;
  };
  handleEditUserFromParent = (user) => {
    let imageBase64 = "";
    if (user.image) {
      imageBase64 = Buffer.from(user.image, "base64").toString("binary");
    }
    this.setState({
      userEditId: user.id,
      email: user.email,
      password: "hasCode",
      lastName: user.lastName,
      firstName: user.firstName,
      address: user.address,
      phoneNumber: user.phoneNumber,
      gender: user.gender,
      position: user.positionId,
      role: user.roleId,
      avatar: "",
      previewImg: imageBase64,
      action: CRUD_ACTIONS.EDIT,
    });
  };
  render() {
    const genders = this.state.genderArr;
    const positions = this.state.positionArr;
    const roles = this.state.roleArr;
    const language = this.props.language;
    const isLoading = this.props.isLoading;

    const {
      email,
      password,
      lastName,
      firstName,
      address,
      phoneNumber,
      gender,
      position,
      role,
      action,
    } = this.state;
    return (
      <div className="user-redux-container ">
        <div className="user-redux-body">
          <div className="container">
            <div className="row">
              <div className="title col-md-12 my-2">User Redux</div>
            </div>
            <div className="row">
              <div className="col-md-2 my-3 btn btn-primary">
                <FormattedMessage id="manage-user.add" />
              </div>
            </div>
            <form>
              <div className="row">
                <div className="form-group col-md-3">
                  <label className="col-md-12">
                    <FormattedMessage id="manage-user.email" />
                    <input
                      disabled={
                        this.state.action === CRUD_ACTIONS.EDIT ? true : false
                      }
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => this.handleOnChangeInput(e, "email")}
                    />
                  </label>
                </div>
                <div className="form-group col-md-3">
                  <label className="col-md-12">
                    <FormattedMessage id="manage-user.password" />
                    <input
                      disabled={
                        this.state.action === CRUD_ACTIONS.EDIT ? true : false
                      }
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => this.handleOnChangeInput(e, "password")}
                    />
                  </label>
                </div>
                <div className="form-group col-md-3">
                  <label className="col-md-12">
                    <FormattedMessage id="manage-user.lastName" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder="Enter your last name"
                    value={lastName}
                    onChange={(e) => this.handleOnChangeInput(e, "lastName")}
                  />
                </div>
                <div className="form-group col-md-3">
                  <label className="col-md-12">
                    <FormattedMessage id="manage-user.firstName" />
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      placeholder="Enter your first name"
                      value={firstName}
                      onChange={(e) => this.handleOnChangeInput(e, "firstName")}
                    />
                  </label>
                </div>
              </div>

              {/*----*/}
              <div className="row">
                <div className="form-group col-md-6">
                  <label className="col-md-12">
                    <FormattedMessage id="manage-user.address" />
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      placeholder="1234 Main St"
                      value={address}
                      onChange={(e) => this.handleOnChangeInput(e, "address")}
                    />
                  </label>
                </div>
                <div className="form-group col-md-6">
                  <label className="col-md-12">
                    <FormattedMessage id="manage-user.phoneNumber" />
                    <input
                      type="text"
                      className="form-control"
                      id="phoneNumber"
                      placeholder="Enter your phone number ..."
                      value={phoneNumber}
                      onChange={(e) =>
                        this.handleOnChangeInput(e, "phoneNumber")
                      }
                    />
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-3">
                  <label className="col-md-12">
                    <FormattedMessage id="manage-user.gender" />
                    <select
                      id="gender"
                      className="form-control"
                      onChange={(e) => this.handleOnChangeInput(e, "gender")}
                      value={gender}
                    >
                      {genders &&
                        genders.length > 0 &&
                        genders.map((item, index) => (
                          <option key={index} value={item.keyMap}>
                            {language && language === LANGUAGES.VI
                              ? item.valueVi
                              : item.valueEn}
                          </option>
                        ))}
                    </select>
                  </label>
                </div>
                <div className="form-group col-md-3">
                  <label className="col-md-12">
                    <FormattedMessage id="manage-user.position" />
                    <select
                      id="position"
                      className="form-control"
                      onChange={(e) => this.handleOnChangeInput(e, "position")}
                      value={position}
                    >
                      {positions &&
                        positions.length > 0 &&
                        positions.map((item, index) => (
                          <option key={index} value={item.keyMap}>
                            {language && language === LANGUAGES.VI
                              ? item.valueVi
                              : item.valueEn}
                          </option>
                        ))}
                    </select>
                  </label>
                </div>
                <div className="form-group col-md-3">
                  <label className="col-md-12">
                    <FormattedMessage id="manage-user.role" />
                    <select
                      id="roleId"
                      className="form-control"
                      onChange={(e) => this.handleOnChangeInput(e, "role")}
                      value={role}
                    >
                      {roles &&
                        roles.length > 0 &&
                        roles.map((item, index) => (
                          <option key={index} value={item.keyMap}>
                            {language && language === LANGUAGES.VI
                              ? item.valueVi
                              : item.valueEn}
                          </option>
                        ))}
                    </select>
                  </label>
                </div>
                <div className="form-group col-md-3">
                  <div className="col-md-12">
                    <FormattedMessage id="manage-user.image" />
                    <div className="row">
                      <label
                        className="col-md-2 mt-2  "
                        style={{
                          fontSize: "1.4rem",
                          cursor: "pointer",
                          backgroundColor: "#cbcbcc",
                          borderRadius: "10px",
                        }}
                        htmlFor="image"
                      >
                        <FontAwesomeIcon icon={faUpload} />
                        <input
                          type="file"
                          id="image"
                          className="form-control"
                          hidden
                          onChange={(e) => this.handleOnchangeImage(e)}
                        />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="row justify-content-between">
                  <div className="col-md-2 mt-2">
                    <button
                      type="submit"
                      className={
                        this.state.action === CRUD_ACTIONS.EDIT
                          ? "btn btn-warning col-md-12 "
                          : "btn btn-primary col-md-12 "
                      }
                      onClick={(e) => this.handleSubmit(e)}
                    >
                      {this.state.action === CRUD_ACTIONS.EDIT ? (
                        <FormattedMessage id="manage-user.edit" />
                      ) : (
                        <FormattedMessage id="manage-user.save" />
                      )}
                    </button>
                  </div>
                  <div className="img-thumbnail col-md-3">
                    <img
                      className="rounded mx-auto d-block"
                      style={{
                        backgroundImage: `url(${this.state.previewImg})`,
                        height: "100px",
                        width: "100px",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                      }}
                      alt=""
                      onClick={() => this.handleOnClickImg()}
                    />
                  </div>
                </div>
              </div>
            </form>
            {isLoading === true ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              ""
            )}
          </div>
        </div>

        {this.state.isOpen && (
          <Lightbox
            mainSrc={this.state.previewImg}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}

        <div className="container mb-5">
          {" "}
          <TableManageUser
            handleEditUserFromParent={this.handleEditUserFromParent}
            action={this.state.action}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    genderRedux: state.admin.genders,
    positionRedux: state.admin.positions,
    roleRedux: state.admin.roles,
    language: state.app.language,
    isLoading: state.admin.isLoading,
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createNewUserRedux: (data) => dispatch(actions.createNewUserRedux(data)),
    fetchAllUserRedux: () => dispatch(actions.fetchAllUserStart()),
    editUserRedux: (data) => dispatch(actions.editUser(data)),
    // processLogout: () => dispatch(actions.processLogout()),
    // changeLanguageRedux: (language) =>
    //   dispatch(actions.changeLanguage(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
