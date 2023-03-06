import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./TableManageUser.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log("handleEditorChange", html, text);
}

class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userRedux: [],
    };
  }

  componentDidMount() {
    this.props.fetchAllUserRedux();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.listUsers !== this.props.listUsers) {
      this.setState({
        userRedux: this.props.listUsers,
      });
    }
  }
  handleDeleteUser = (id) => {
    this.props.deleteUserRedux(id);
  };
  handleEditUser = (user) => {
    this.props.handleEditUserFromParent(user);
  };

  render() {
    const arrUser = this.state.userRedux;
    return (
      <React.Fragment>
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
            {arrUser &&
              arrUser.length > 0 &&
              arrUser.map((user) => (
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
        <MdEditor
          style={{ height: "500px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllUserRedux: () => dispatch(actions.fetchAllUserStart()),
    deleteUserRedux: (id) => dispatch(actions.deleteUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
