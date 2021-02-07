import axios from "axios";

export const GET_TEACHER_LIST = "GET_TEACHER_LIST";

export const getTeacherList = () => {
  return (dispatch) => {
    // Make a request for a user with a given ID
    axios
      .get("https://data-beta.herokuapp.com/api/guru/1")
      .then(function (response) {
        dispatch({
          type: GET_TEACHER_LIST,
          payload: {
            data: response.data,
            errorMessage: false,
          },
        });
        console.log(response);
      })
      .catch(function (error) {
        dispatch({
          type: GET_TEACHER_LIST,
          payload: {
            data: false,
            errorMessage: error.messege,
          },
        });
        console.log(error);
      });
  };
};
