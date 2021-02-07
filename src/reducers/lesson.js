import { GET_LESSON_LIST } from "./../user/actions/lessonAction";
let initialState = {
  getLessonList: false,
  errorLessonList: false,
};

const lessons = (state = initialState, action) => {
  switch (action.type) {
    case GET_LESSON_LIST:
      return {
        ...state,
        getLessonList: action.payload.data,
        errorLessonList: action.payload.errorMessege,
      };

    default:
      return state;
  }
};

export default lessons;
