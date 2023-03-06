import React, { Component } from "react";
import { connect } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import HomeHeader from "../../HomePage/HomeHeader/HomeHeader";
import "./DetailDoctor.scss";
import { getDetailInfoDoctor } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtraInfo from "./DoctorExtraInfo";
import Comment from "../SocialPlugin/Comment";
import LikeAndShare from "../SocialPlugin/LikeAndShare";

class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},
      currentId: -1,
    };
  }
  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      const id = this.props.match.params.id;
      this.setState({
        currentId: id,
      });
      const res = await getDetailInfoDoctor(id);

      if (res && res.errCode === 0) {
        this.setState({
          detailDoctor: res.data,
        });
      }
    }
    // imageBase64 = new Buffer(user.image, "base64").toString("binary");
  }
  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    const { language } = this.props;
    const { detailDoctor } = this.state;
    let nameVi = "",
      nameEn = "";
    if (detailDoctor && detailDoctor.positionData) {
      nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
      nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
    }
    let currentURL =
      +process.env.REACT_APP_IS_LOCALHOST === 1
        ? "https://demochatbotapp.herokuapp.com/"
        : window.location.href;
    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="doctor-detail-container ">
          <div className="intro-doctor">
            <div className="content-left">
              <div
                className="doctor-image"
                style={{
                  backgroundImage: `url(${
                    detailDoctor.image ? detailDoctor.image : ""
                  })`,
                }}
              ></div>
            </div>
            <div className="content-right">
              <div className="up">
                {language === LANGUAGES.VI ? nameVi : nameEn}
              </div>
              <div className="down">
                {detailDoctor.Markdown && detailDoctor.Markdown.description && (
                  <span>{detailDoctor.Markdown.description}</span>
                )}
                <div className="like-share-plugin">
                  <LikeAndShare dataHref={currentURL} />
                </div>
              </div>
            </div>
          </div>
          <div className="schedule-doctor container">
            <div className="content-left">
              <DoctorSchedule detailDoctorFromParent={this.state.currentId} />
            </div>
            <div className="content-right">
              <DoctorExtraInfo detailDoctorFromParent={this.state.currentId} />
            </div>
          </div>
          <div className="detail-info-doctor">
            {detailDoctor.Markdown && detailDoctor.Markdown.contentHTML && (
              <div
                dangerouslySetInnerHTML={{
                  __html: detailDoctor.Markdown.contentHTML,
                }}
              ></div>
            )}
          </div>

          <Comment dataHref={currentURL} width={"100%"} />
        </div>
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
