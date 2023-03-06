import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import "./ModalUser.scss";
import _ from "lodash";
class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
    };

    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    const user = this.props.currentUser;
    if (user && !_.isEmpty(user)) {
      this.setState({
        id: user.id,
        email: user.email,
        password: "hashCode",
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        phoneNumber: user.phoneNumber,
      });
    }
  }
  toggle() {
    this.props.toggleUser();
  }

  handleOnchangeInput = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({
      ...copyState,
    });
  };

  checkValidateInput = () => {
    let isValid = true;
    const arrInput = [
      "email",
      "password",
      "firstName",
      "lastName",
      "address",
      "phoneNumber",
    ];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleAddNewUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === true) {
      // call api create user

      this.props.createNewUser(this.state);
    }
  };

  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === true) {
      // call api create user

      this.props.editUser(this.state);
    }
  };

  render() {
    return (
      <>
        <Modal
          isOpen={this.props.openModal}
          toggle={this.toggle}
          className={this.props.className}
          size="lg"
          centered
        >
          <ModalHeader toggle={this.toggle}>Update User</ModalHeader>
          <ModalBody>
            <div className="modal-body">
              <div className="input-row">
                <div className="input-group">
                  <label>Email</label>
                  <input
                    disabled
                    type="text"
                    value={this.state.email}
                    onChange={(e) => this.handleOnchangeInput(e, "email")}
                  ></input>
                </div>

                <div className="input-group">
                  <label>Password</label>
                  <input
                    disabled
                    type="password"
                    value={this.state.password}
                    onChange={(e) => this.handleOnchangeInput(e, "password")}
                  ></input>
                </div>
              </div>

              <div className="input-row">
                <div className="input-group">
                  <label>First name</label>
                  <input
                    type="text"
                    value={this.state.firstName}
                    onChange={(e) => this.handleOnchangeInput(e, "firstName")}
                  ></input>
                </div>

                <div className="input-group">
                  <label>Last name</label>
                  <input
                    type="text"
                    value={this.state.lastName}
                    onChange={(e) => this.handleOnchangeInput(e, "lastName")}
                  ></input>
                </div>
              </div>

              <div className="input-row">
                <div className="input-address">
                  <label>Address</label>
                  <input
                    type="text"
                    value={this.state.address}
                    onChange={(e) => this.handleOnchangeInput(e, "address")}
                  ></input>
                </div>
              </div>
              {/* phone number */}
              <div className="input-row">
                <div className="input-group">
                  <label>Phone number</label>
                  <input
                    type="text"
                    value={this.state.phoneNumber}
                    onChange={(e) => this.handleOnchangeInput(e, "phoneNumber")}
                  ></input>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              className="px-3"
              onClick={() => this.handleSaveUser()}
            >
              Save Changes
            </Button>{" "}
            <Button color="secondary" className="px-3" onClick={this.toggle}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
