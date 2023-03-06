import React, { Component } from "react";
import { connect } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { FormattedMessage } from "react-intl";
import "./DetailClinic.scss";
import HomeHeader from "../../HomePage/HomeHeader/HomeHeader";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfo from "../Doctor/DoctorExtraInfo";
import ProfileDoctor from "../../../containers/Patient/Doctor/ProfileDoctor";
import {
  getDetailInfoDoctor,
  getDetailClinicById,
  getAllCodeService,
} from "../../../services/userService";
import _ from "lodash";
import { LANGUAGES } from "../../../utils";
class DetailClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      dataDetailClinic: {},
      isShowDesc: false,
    };
  }
  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      const id = this.props.match.params.id;
      const res = await getDetailClinicById({
        id: id,
      });

      if (res && res.errCode === 0) {
        let data = res.data;
        let arrDoctorId = [];
        if (data && !_.isEmpty(res.data)) {
          let arr = data.doctorClinic;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              return arrDoctorId.push(item.doctorId);
            });
          }
        }
        this.setState({
          dataDetailClinic: res.data,
          arrDoctorId: arrDoctorId,
        });
      }
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {}

  handleClickShowDesc = () => {
    this.setState({
      isShowDesc: !this.state.isShowDesc,
    });
  };
  render() {
    let { arrDoctorId, dataDetailClinic, isShowDesc } = this.state;
    let { language } = this.props;
    const showDesc = {
      height: " fit-content",
    };
    const hiddenDesc = {
      height: "200px",
    };
    return (
      <div className="detail-specialty-container">
        <HomeHeader />
        <div className="detail-specialty-content ">
          <div
            className="desc-specialty "
            style={isShowDesc === false ? hiddenDesc : showDesc}
          >
            <div className="container">
              {dataDetailClinic && !_.isEmpty(dataDetailClinic) && (
                <>
                  <h2>{dataDetailClinic.name}</h2>
                  <p>{dataDetailClinic.address}</p>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: dataDetailClinic.descriptionHTML,
                    }}
                  ></div>
                </>
              )}
            </div>
          </div>
          <div className="show-hidden">
            <p className="container" onClick={() => this.handleClickShowDesc()}>
              {isShowDesc === false ? (
                <span>
                  <FormattedMessage id="extra-Info.show-detail" />
                </span>
              ) : (
                <span>
                  <FormattedMessage id="extra-Info.hidden-detail" />
                </span>
              )}
            </p>
          </div>

          <div className="all-each-doctor container">
            {arrDoctorId &&
              arrDoctorId.length > 0 &&
              arrDoctorId.map((item, index) => {
                return (
                  <div className="each-doctor " key={index}>
                    <div className="dt-content-left">
                      <div className="profile-doctor">
                        <ProfileDoctor
                          isShowDescDoctor={true}
                          doctorId={item}
                          isShowLinkDetail={true}
                          isShowPrice={false}
                          // dataTime={dataTime}
                        />
                      </div>
                    </div>
                    <div className="dt-content-right">
                      <div className="each-doctor-schedule">
                        {" "}
                        <DoctorSchedule detailDoctorFromParent={item} />
                      </div>
                      <div className="each-doctor-extra-info">
                        {" "}
                        <DoctorExtraInfo
                          className="customize-extra"
                          detailDoctorFromParent={item}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
