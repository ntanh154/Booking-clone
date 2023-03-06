import React, { Component } from "react";
import { connect } from "react-redux";
import "./ModalUser.scss";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { emitter } from "../../utils/emitter";
class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
    };
    this.listenToEmitter();
    this.toggle = this.toggle.bind(this);
  }
  listenToEmitter() {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
        phoneNumber: "",
      });
    });
  }
  componentDidMount() {}
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
          <ModalHeader toggle={this.toggle}>Create New User</ModalHeader>
          <ModalBody>
            <div className="modal-body">
              <div className="input-row">
                <div className="input-group">
                  <label>Email</label>
                  <input
                    type="text"
                    value={this.state.email}
                    onChange={(e) => this.handleOnchangeInput(e, "email")}
                  ></input>
                </div>

                <div className="input-group">
                  <label>Password</label>
                  <input
                    type="text"
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
              onClick={() => this.handleAddNewUser()}
            >
              Add New
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
