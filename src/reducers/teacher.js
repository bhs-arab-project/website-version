import { GET_TEACHER_LIST } from "../user/actions/teacherAction";
let initialState = {
  getTeacherList: false,
  errorTeacherList: false,
};

const teachers = (state = initialState, action) => {
  switch (action.type) {
    case GET_TEACHER_LIST:
      return {
        ...state,
        getTeacherList: action.payload.data,
        errorTeacherList: action.payload.errorMessege,
      };

    default:
      return state;
  }
};

export default teachers;
