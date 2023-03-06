import React, { Component } from "react";
import { connect } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FormattedMessage } from "react-intl";
import "./RemedyModal.scss";

import { toast } from "react-toastify";
import moment from "moment";
import localization from "moment/locale/vi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { CommonUtils } from "../../../utils";

class RemedyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      imageBase64: "",
    };
  }
  async componentDidMount() {
    if (this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
        name: this.props.dataModal.name,
      });
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.dataModal !== this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
        name: this.props.dataModal.name,
      });
    }
  }
  handleOnchangeEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };
  handleOnchangeImage = async (e) => {
    const data = e.target.files;
    const file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);

      this.setState({
        imageBase64: base64,
      });
    }
  };
  handleSendRemedy = () => {
    this.props.sendRemedy(this.state);
  };

  render() {
    let { isOpenModal, dataModal, closeRemedyMoDal, sendRemedy } = this.props;
    let { email, name } = this.state;

    return (
      <Modal isOpen={isOpenModal} centered className={this.props.className}>
        <div className="booking-modal-header">
          <span className="left">Gửi hóa đơn khám bệnh</span>
          <span className="right">
            <FontAwesomeIcon icon={faXmark} onClick={closeRemedyMoDal} />
          </span>
        </div>
        <ModalBody>
          <div className="container">
            <div className="row ">
              <div className="col-md-6 form-group">
                <label>Tên bânh nhân</label>
                <input className="form-control" type="text" value={name} />
              </div>
              <div className="col-md-6 form-group">
                <label>Email</label>
                <input
                  className="form-control"
                  type="text"
                  value={email}
                  onChange={(e) => this.handleOnchangeEmail(e)}
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                <div className="input-group mb-3">
                  <input
                    type="file"
                    className="form-control"
                    id="inputGroupFile02"
                    onChange={(e) => this.handleOnchangeImage(e)}
                  />
                  <label className="input-group-text" for="inputGroupFile02">
                    Chọn file đơn thuốc
                  </label>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary px-2" onClick={() => this.handleSendRemedy()}>
            Xác nhận
          </Button>{" "}
          <Button color="secondary px-2" onClick={closeRemedyMoDal}>
            Hủy
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
