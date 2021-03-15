import React from "react";
import { useForm } from "react-hook-form";
import { useAlert } from "react-alert";
import axios from "axios";
import { API_URL } from "utils/constants";

export default function Haha() {
  const [indexes, setIndexes] = React.useState([]);
  const [counter, setCounter] = React.useState(0);
  const { register, handleSubmit } = useForm();

  const alert = useAlert();
  const guru = localStorage.getItem("token");
  const guruToken = JSON.parse(guru);
  const access_token = guruToken?.token?.token;

  const onSubmit = (data) => {
    console.log(data);
    let jsonAns = JSON.stringify(data);

    axios({
      method: "post",
      url: `${API_URL}quiz`,
      data: {
        lesson_id: "8",
        pelajaran: "Nahwi",
        question_text: "Soal Yoyo",
        answer_options: jsonAns,
      },
      headers: {
        ContentType: "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    })
      .then(function (response) {
        alert.success(
          <div className="notif">Berhasil membuat Jawaban Quiz!</div>
        );
        //handle success
        console.log(response);
      })
      .catch(function (error) {
        alert.error(<div className="notif">Gagal membuat Jawaban Quiz</div>);
        console.log(error.response);
      });
  };

  const addFriend = () => {
    setIndexes((prevIndexes) => [...prevIndexes, counter]);
    setCounter((prevCounter) => prevCounter + 1);
  };

  const removeFriend = (index) => () => {
    setIndexes((prevIndexes) => [
      ...prevIndexes.filter((item) => item !== index),
    ]);
    setCounter((prevCounter) => prevCounter - 1);
  };

  const clearFriends = () => {
    setIndexes([]);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {indexes.map((index) => {
          const fieldName = `[${index}]`;
          return (
            <fieldset name={fieldName} key={index}>
              <label>
                First Name {index + 1}:
                <input
                  type="text"
                  name={`${fieldName}.answerText`}
                  ref={register}
                />
              </label>

              <label>
                Jawaban Benar
                <input
                  type="radio"
                  value="true"
                  name={`${fieldName}.isCorrect`}
                  ref={register}
                />
              </label>
              <label>
                Jawaban Salah
                <input
                  type="radio"
                  value="false"
                  name={`${fieldName}.isCorrect`}
                  ref={register}
                />
              </label>
              <button type="button" onClick={removeFriend(index)}>
                Remove
              </button>
            </fieldset>
          );
        })}

        <button type="button" onClick={addFriend}>
          Add Friend
        </button>
        <button type="button" onClick={clearFriends}>
          Clear Friends
        </button>
        <input type="submit" />
      </form>
    </>
  );
}
