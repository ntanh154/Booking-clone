import { faFacebook, faGooglePlus } from "@fortawesome/free-brands-svg-icons";
import { push } from "connected-react-router";
import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";

import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { handleLoginApi } from "../../services/userService";
import "./Login.scss";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      passWord: "",
      isShowPassword: false,
      errMessage: "",
    };
  }

  handleOnChangeUserName = (e) => {
    this.setState({
      userName: e.target.value,
    });
  };
  handleOnChangePassword = (e) => {
    this.setState({
      passWord: e.target.value,
    });
  };

  handleOnClick = async () => {
    this.setState({
      errMessage: "",
    });

    try {
      let data = await handleLoginApi(this.state.userName, this.state.passWord);
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message,
        });
      }
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user);
        // todo
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          this.setState({
            errMessage: error.response.data.message,
          });
        }
      }
    }
  };

  handleClickShowPass = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };

  handleKeyDown = (e) => {
    if (e.key === "Enter") {
      this.handleOnClick();
    }
  };

  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content">
            <div className="col-12 text-center">
              <p>Login</p>
            </div>
            <div className="col-12 form-group">
              <label>UserName:</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="form-control"
                value={this.state.userName}
                onChange={(e) => this.handleOnChangeUserName(e)}
              />
            </div>
            <div className="col-12 form-group">
              <label>Password:</label>
              <div className="custom-input-pass">
                <input
                  type={this.state.isShowPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="form-control"
                  value={this.state.passWord}
                  onChange={(e) => this.handleOnChangePassword(e)}
                  onKeyDown={(e) => this.handleKeyDown(e)}
                />
                <FontAwesomeIcon
                  className="icon"
                  icon={this.state.isShowPassword ? faEye : faEyeSlash}
                  onClick={() => this.handleClickShowPass()}
                />
              </div>
            </div>
            <div className="col-12" style={{ color: "red" }}>
              {this.state.errMessage}
            </div>
            <div className="col-12 btn">
              <button onClick={() => this.handleOnClick()}>Login</button>
            </div>
            <div className="col-12 forgot-pass">
              <p>Forgot your password</p>
            </div>
            <div className="col-12 sign-with">
              <p className="">Or sign in with:</p>
            </div>
            <div className="col-12 social-login">
              <FontAwesomeIcon className="facebook-icon" icon={faFacebook} />
              <FontAwesomeIcon className="google-icon" icon={faGooglePlus} />
            </div>
          </div>
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
  return {
    navigate: (path) => dispatch(push(path)),

    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
