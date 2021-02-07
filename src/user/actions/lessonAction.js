import axios from "axios";

export const GET_LESSON_LIST = "GET_LESSON_LIST";

export const getLessonList = () => {
  return (dispatch) => {
    // Make a request for a user with a given ID
    axios
      .get("https://data-beta.herokuapp.com/api/pelajaran")
      .then(function (response) {
        dispatch({
          type: GET_LESSON_LIST,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
      })
      .catch(function (error) {
        dispatch({
          type: GET_LESSON_LIST,
          payload: {
            data: false,
            errorMessage: error.messege,
          },
        });
      });
  };
};
