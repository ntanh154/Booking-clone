import React, { Component } from "react";
import { connect } from "react-redux";
import "./UserManage.scss";
import {
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
} from "../../services/userService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faPlus,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";
import { emitter } from "../../utils/emitter";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUser: [],
      toggleState: false,
      modalEditUser: false,
      userEdit: {},
    };
  }

  async componentDidMount() {
    await this.getAllUserFromReact();
  }
  handleAddNewUser = () => {
    this.setState({
      toggleState: !this.state.toggleState,
    });
  };
  toggleUser = () => {
    this.setState({
      toggleState: !this.state.toggleState,
    });
  };
  toggleEditUser = () => {
    this.setState({
      modalEditUser: !this.state.modalEditUser,
    });
  };
  getAllUserFromReact = async () => {
    let response = await getAllUsers("all");
    const { users } = response;
    if (response && response.errCode === 0) {
      this.setState({
        arrUser: users,
      });
    }
  };

  createNewUser = async (data) => {
    try {
      const response = await createNewUserService(data);
      if (response && response.errCode !== 0) {
        alert(response.message);
      } else {
        await this.getAllUserFromReact();
        emitter.emit("EVENT_CLEAR_MODAL_DATA");
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleDeleteUser = async (id) => {
    try {
      const response = await deleteUserService(id);
      if (response && response.errCode !== 0) {
        alert(response.message);
      } else {
        await this.getAllUserFromReact();
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleEditUser = (user) => {
    this.setState({
      modalEditUser: true,
      userEdit: user,
    });
  };

  doEditUser = async (data) => {
    try {
      const response = await editUserService(data);
      if (response && response.errCode !== 0) {
        alert(response.message);
      } else {
        await this.getAllUserFromReact();
        this.setState({
          modalEditUser: !this.state.modalEditUser,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <div className="user-container">
        <ModalUser
          openModal={this.state.toggleState}
          toggleUser={this.toggleUser}
          className="modal-user-container"
          createNewUser={this.createNewUser}
        />
        {this.state.modalEditUser && (
          <ModalEditUser
            openModal={this.state.modalEditUser}
            toggleUser={this.toggleEditUser}
            currentUser={this.state.userEdit}
            editUser={this.doEditUser}
            className="modal-user-container"
          />
        )}

        <div className="title text-center">Manage users</div>
        <div className="container">
          <div className="user-table mt-4 ">
            <div className="my-2">
              <button
                className="btn btn-primary px-2"
                onClick={() => this.handleAddNewUser()}
              >
                <FontAwesomeIcon className="mx-1" icon={faPlus} />
                Add New User
              </button>
            </div>
            <div className="table-container">
              <table id="customers" className="customers">
                <thead className="table-head">
                  <tr>
                    <th>email</th>
                    <th>Firstname</th>
                    <th>Lastname</th>
                    <th>address</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {this.state.arrUser.map((user) => (
                    <tr key={user.id}>
                      <td>{user.email}</td>
                      <td> {user.firstName}</td>
                      <td>{user.lastName}</td>
                      <td>{user.address}</td>
                      <td className="container-btn">
                        <FontAwesomeIcon
                          className="btn btn-edit"
                          icon={faPenToSquare}
                          onClick={() => this.handleEditUser(user)}
                        />
                        <FontAwesomeIcon
                          className="btn btn-delete"
                          icon={faTrashCan}
                          onClick={() => this.handleDeleteUser(user.id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
