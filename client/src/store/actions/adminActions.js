import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  createNewUserService,
  getAllUsers,
  deleteUserService,
  editUserService,
  getTopDoctorHomeService,
  getAllDoctors,
  saveDetailInfoDoctor,
  getAllSpecialty,
  getAllClinic,
} from "../../services/userService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// export const fetchGenderStart = () => ({
//   type: actionTypes.FETCH_GENDER_START,
// });

//GENDER ACTION
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_GENDER_START });
      let res = await getAllCodeService("GENDER");
      console.log("check res data gender from fetchGenderStart ", res);
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (error) {
      dispatch(fetchGenderFailed());
    }
  };
};

export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});

export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});
//POSITION ACTION

export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_POSITION_START });
      let res = await getAllCodeService("POSITION");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (error) {
      dispatch(fetchPositionFailed());
      console.log("fetch position start error: ", error);
    }
  };
};

export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});

export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});

// Role id

export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_ROLE_START });
      let res = await getAllCodeService("ROLE");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (error) {
      toast.error("Fetch user failed");
      dispatch(fetchRoleFailed());
      console.log("fetch role start error: ", error);
    }
  };
};

export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});

export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});

//  CREATE NEW USER

export const createNewUserRedux = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserService(data);

      if (res && res.errCode === 0) {
        toast.success("Create new user success", {
          icon: true,
        });
        dispatch(saveUserSuccess(res.data));
        dispatch(fetchAllUserStart());
      } else {
        toast.error("Create new user failed");
        dispatch(saveUserFailed());
      }
    } catch (error) {
      toast.error("Create new user failed");
      dispatch(saveUserFailed());
      console.log("saveUserFailed error: ", error);
    }
  };
};

export const saveUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});

export const saveUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILED,
});

// DELETE USER

export const deleteUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserService(userId);

      if (res && res.errCode === 0) {
        toast.success("Delete user succeed", {
          icon: true,
        });
        dispatch(deleteUserSuccess());
        dispatch(fetchAllUserStart());
      } else {
        toast.error("Delete user failed");
        dispatch(deleteUserFailed());
      }
    } catch (error) {
      toast.error("Delete user failed");
      dispatch(deleteUserFailed());
      console.log("deleteUserFailed error: ", error);
    }
  };
};

export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});

// FETCH ALL USER
export const fetchAllUserStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers("all");

      if (res && res.errCode === 0) {
        dispatch(fetchAllUserSuccess(res.users.reverse()));
      } else {
        toast.error("Fetch all user failed");
        dispatch(fetchAllUserFailed());
      }
    } catch (error) {
      toast.error("Fetch all user failed");
      dispatch(fetchAllUserFailed());
      console.log("fetchAllUserFailed", error);
    }
  };
};

export const fetchAllUserSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USER_SUCCESS,
  users: data,
});

export const fetchAllUserFailed = () => ({
  type: actionTypes.FETCH_ALL_USER_FAILED,
});

// EDIT
export const editUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserService(data);

      if (res && res.errCode === 0) {
        toast.success("Update new user success", {
          icon: true,
        });
        dispatch(editUserSuccess());
        dispatch(fetchAllUserStart());
      } else {
        toast.error("Edit user failed");
        dispatch(editUserFailed());
      }
    } catch (error) {
      toast.error("Edit user failed");
      dispatch(editUserFailed());
      console.log("editUserFailed error: ", error);
    }
  };
};

export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});

export const editUserFailed = () => ({
  type: actionTypes.EDIT_USER_FAILED,
});

// Fetch top doctor
export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorHomeService("8");

      if (res && res.errCode === 0) {
        await dispatch(fetchTopDoctorSuccess(res.data));
      } else {
        dispatch(fetchTopDoctorFailed());
      }
    } catch (error) {
      dispatch(fetchTopDoctorFailed());
      console.log("fetchTopDoctorFailed error: ", error);
    }
  };
};

export const fetchTopDoctorSuccess = (data) => ({
  type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
  data: data,
});

export const fetchTopDoctorFailed = () => ({
  type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
});

// ACTION GET ALL DOCTORS

export const fetchAllDoctors = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctors();

      if (res && res.errCode === 0) {
        await dispatch(fetchAllDoctorsSuccess(res.data));
      } else {
        dispatch(fetchAllDoctorsFailed());
      }
    } catch (error) {
      dispatch(fetchAllDoctorsFailed());
      console.log("fetchAllDoctorsFailed error: ", error);
    }
  };
};

export const fetchAllDoctorsSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
  data: data,
});

export const fetchAllDoctorsFailed = () => ({
  type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
});

// SAVE DETAIL DOCTOR ACTION
export const saveDetailDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveDetailInfoDoctor(data);

      if (res && res.errCode === 0) {
        toast.success("Save detail info doctor success");
        await dispatch(saveDetailDoctorSuccess());
      } else {
        toast.error("Save detail info doctor failed");
        dispatch(saveDetailDoctorFailed());
      }
    } catch (error) {
      toast.error("Save detail info doctor failed server");
      dispatch(saveDetailDoctorFailed());
      console.log("saveDetailDoctorFailed error: ", error);
    }
  };
};

export const saveDetailDoctorSuccess = () => ({
  type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
});

export const saveDetailDoctorFailed = () => ({
  type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
});

// FETCH ALL SCHEDULE TIMES
export const fetchAllScheduleTimes = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("TIME");

      if (res && res.errCode === 0) {
        await dispatch(fetchAllScheduleTimesSuccess(res.data));
      } else {
        dispatch(fetchAllScheduleTimesFailed());
      }
    } catch (error) {
      dispatch(fetchAllScheduleTimesFailed());
      console.log("fetchAllScheduleTimesFailed error: ", error);
    }
  };
};

export const fetchAllScheduleTimesSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_SCHEDULE_TIMES_SUCCESS,
  data: data,
});

export const fetchAllScheduleTimesFailed = () => ({
  type: actionTypes.FETCH_ALL_SCHEDULE_TIMES_FAILED,
});

//Get all price from AllCode table

export const getRequireDoctorInfo = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_REQUIRE_DOCTOR_INFO_START });
      let resPrice = await getAllCodeService("PRICE");
      let resPayment = await getAllCodeService("PAYMENT");
      let resProvince = await getAllCodeService("PROVINCE");
      let resSpecialty = await getAllSpecialty();
      let resClinic = await getAllClinic();
      if (
        resPrice &&
        resPrice.errCode === 0 &&
        resPayment &&
        resPayment.errCode === 0 &&
        resProvince &&
        resProvince.errCode === 0 &&
        resSpecialty &&
        resSpecialty.errCode === 0 &&
        resClinic &&
        resClinic.errCode === 0
      ) {
        let data = {
          dataPrice: resPrice.data,
          dataPayment: resPayment.data,
          dataProvince: resProvince.data,
          dataSpecialty: resSpecialty.data,
          dataClinic: resClinic.data,
        };
        console.log("check data getRequireDoctorInfo", data);
        dispatch(fetchRequireDoctorInfoSuccess(data));
      } else {
        dispatch(fetchRequireDoctorInfoFailed());
      }
    } catch (error) {
      dispatch(fetchRequireDoctorInfoFailed());
      console.log("fetch require doctor info start error: ", error);
    }
  };
};

export const fetchRequireDoctorInfoSuccess = (data) => ({
  type: actionTypes.FETCH_REQUIRE_DOCTOR_INFO_SUCCESS,
  data: data,
});

export const fetchRequireDoctorInfoFailed = () => ({
  type: actionTypes.FETCH_REQUIRE_DOCTOR_INFO_FAILED,
});
