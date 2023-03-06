import React, { Component } from "react";
import { connect } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { FormattedMessage } from "react-intl";
import "./DetailSpecialty.scss";
import HomeHeader from "../../HomePage/HomeHeader/HomeHeader";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfo from "../Doctor/DoctorExtraInfo";
import ProfileDoctor from "../../../containers/Patient/Doctor/ProfileDoctor";
import {
  getDetailInfoDoctor,
  getDetailSpecialtyById,
  getAllCodeService,
} from "../../../services/userService";
import _ from "lodash";
import { LANGUAGES } from "../../../utils";
class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      dataDetailSpecialty: {},
      listProvince: [],
      isShowDesc: false,
      image: "",
    };
  }
  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      const id = this.props.match.params.id;
      let resProvince = await getAllCodeService("PROVINCE");

      if (resProvince && resProvince.errCode === 0) {
        let dataProvince = resProvince.data;
        if (dataProvince && dataProvince.length > 0) {
          dataProvince.unshift({
            keyMap: "ALL",
            type: "PROVINCE",
            valueEn: "ALL",
            valueVi: "Toàn quốc",
          });
        }
        this.setState({
          listProvince: dataProvince,
        });
      }
      const res = await getDetailSpecialtyById({
        id: id,
        location: "ALL",
      });

      if (res && res.errCode === 0) {
        let data = res.data;
        let arrDoctorId = [];
        if (data && !_.isEmpty(res.data)) {
          let arr = data.doctorSpecialty;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              return arrDoctorId.push(item.doctorId);
            });
          }
        }
        this.setState({
          image: res.data.image,
          dataDetailSpecialty: res.data,
          arrDoctorId: arrDoctorId,
        });
      }
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {}
  handleOnchangeLocation = async (e) => {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      const id = this.props.match.params.id;
      const location = e.target.value;

      const res = await getDetailSpecialtyById({
        id: id,
        location: location,
      });

      if (res && res.errCode === 0) {
        let data = res.data;
        let arrDoctorId = [];
        if (data && !_.isEmpty(res.data)) {
          let arr = data.doctorSpecialty;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              return arrDoctorId.push(item.doctorId);
            });
          }
        }
        this.setState({
          image: res.data.image,
          dataDetailSpecialty: res.data,
          arrDoctorId: arrDoctorId,
        });
      }
    }
  };
  handleClickShowDesc = () => {
    this.setState({
      isShowDesc: !this.state.isShowDesc,
    });
  };
  render() {
    let { arrDoctorId, dataDetailSpecialty, listProvince, isShowDesc, image } =
      this.state;
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
              {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: dataDetailSpecialty.descriptionHTML,
                  }}
                ></div>
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
          <div className="search-sp-location mt-3 container">
            <div className="col-md-3">
              <select
                className="select-location"
                onChange={(e) => this.handleOnchangeLocation(e)}
              >
                {listProvince &&
                  listProvince.length > 0 &&
                  listProvince.map((item, index) => {
                    return (
                      <option key={index} value={item.keyMap}>
                        {language === LANGUAGES.VI
                          ? item.valueVi
                          : item.valueEn}
                      </option>
                    );
                  })}
              </select>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
