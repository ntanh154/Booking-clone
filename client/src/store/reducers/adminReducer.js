import actionTypes from "../actions/actionTypes";

const initialState = {
  genders: [],
  roles: [],
  positions: [],
  isLoading: false,
  users: [],
  topDoctors: [],
  allDoctors: [],
  allScheduleTime: [],
  allRequiredDoctorInfo: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    //gender
    case actionTypes.FETCH_GENDER_START:
      state.isLoading = true;
      state.genders = [];

      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      state.isLoading = false;
      state.genders = action.data;

      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_FAILED:
      state.isLoading = false;
      state.genders = [];

      return {
        ...state,
      };
    //position
    case actionTypes.FETCH_POSITION_START:
      state.isLoading = true;
      state.positions = [];

      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_SUCCESS:
      state.isLoading = false;
      state.positions = action.data;

      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_FAILED:
      state.isLoading = false;
      state.positions = [];

      return {
        ...state,
      };
    //Role
    case actionTypes.FETCH_ROLE_START:
      state.isLoading = true;
      state.roles = [];

      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_SUCCESS:
      state.isLoading = false;
      state.roles = action.data;

      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_FAILED:
      state.isLoading = false;
      state.roles = [];

      return {
        ...state,
      };
    // FETCH ALL USER
    case actionTypes.FETCH_ALL_USER_SUCCESS:
      state.users = action.users;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USER_FAILED:
      state.users = [];
      return {
        ...state,
      };
    default:
      return state;
    //FETCH TOP DOCTOR
    case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
      const copyState = { ...state };
      copyState.topDoctors = action.data;

      return {
        ...copyState,
      };
    case actionTypes.FETCH_TOP_DOCTOR_FAILED:
      state.topDoctors = [];
      return {
        ...state,
      };

    // GET ALL DOCTORS
    case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
      state.allDoctors = action.data;

      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_DOCTORS_FAILED:
      state.allDoctors = [];
      return {
        ...state,
      };
    // FETCH ALL SCHEDULE TIME
    case actionTypes.FETCH_ALL_SCHEDULE_TIMES_SUCCESS:
      state.allScheduleTime = action.data;

      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_SCHEDULE_TIMES_FAILED:
      state.allScheduleTime = [];
      return {
        ...state,
      };
    //Required doctor info (price,payment,province)
    //allRequiredDoctorInfo
    case actionTypes.FETCH_REQUIRE_DOCTOR_INFO_SUCCESS:
      state.allRequiredDoctorInfo = action.data;

      return {
        ...state,
      };
    case actionTypes.FETCH_REQUIRE_DOCTOR_INFO_FAILED:
      state.allRequiredDoctorInfo = [];
      return {
        ...state,
      };
  }
};

export default adminReducer;
