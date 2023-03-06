import React, { Component } from "react";
import { connect } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { FormattedMessage } from "react-intl";
import "./ManageSpecialty.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { LANGUAGES, CommonUtils } from "../../../utils";
import { createNewSpecialty } from "../../../services/userService";
import { toast } from "react-toastify";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      imageBase64: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
    };
  }
  async componentDidMount() {}
  componentDidUpdate(prevProps, prevState, snapshot) {}
  handleOnChangeInput = (e, id) => {
    let copyState = { ...CommonUtils.state };
    copyState[id] = e.target.value;
    this.setState({
      ...copyState,
    });
  };
  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionMarkdown: text,
      descriptionHTML: html,
    });
  };
  handleOnchangeImage = async (e) => {
    const data = e.target.files;
    const file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);

      const URLFile = URL.createObjectURL(file);
      this.setState({
        imageBase64: base64,
      });
    }
  };
  handleSaveNewSpecialty = async () => {
    let res = await createNewSpecialty(this.state);
    if (res && res.errCode === 0) {
      toast.success("Create new Specialty succeed !");
      this.setState({
        name: "",
        imageBase64: "",
        descriptionHTML: "",
        descriptionMarkdown: "",
      });
    } else {
      toast.error("Create new Specialty Failed !");
    }
  };
  render() {
    return (
      <div className="manage-specialty-container container">
        <div className="ms-title title">Quan ly chuyen khoa</div>

        <div className="all-specialty">
          <div className="row">
            <div className="col-md-6 form-group">
              <label>Ten chuyen khoa</label>
              <input
                type="text"
                className="form-control"
                value={this.state.name}
                onChange={(e) => this.handleOnChangeInput(e, "name")}
              />
            </div>
            <div className="col-md-6 form-group">
              <label>Anh chuyen khoa</label>
              <input
                type="file"
                className="form-control form-control-file"
                onChange={(e) => this.handleOnchangeImage(e)}
              />
            </div>
          </div>
          <div className="row markdown">
            <div className="col-md-12">
              <MdEditor
                style={{ height: "300px" }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={this.handleEditorChange}
                value={this.state.descriptionMarkdown}
              />
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-md-3">
              <button
                className="btn btn-primary btn-save-ms"
                onClick={() => this.handleSaveNewSpecialty()}
              >
                Add new
              </button>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
