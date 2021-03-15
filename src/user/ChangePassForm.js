import React, { useState } from "react";
import {
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Button,
  Spinner,
} from "reactstrap";
import axios from "axios";
import { API_URL } from "utils/constants";
import { useAlert } from "react-alert";
import { useHistory } from "react-router-dom";

export function ChangePassForm(props) {
  const [newPass, setNewPass] = useState("");
  const [oldPass, setOldPass] = useState("");
  const [confPass, setConfPass] = useState("");
  const [load, setLoad] = useState(false);
  const history = useHistory();
  const alert = useAlert();

  const { token } = props;

  const handleS = async (e) => {
    e.preventDefault();
    setLoad(true);

    if (oldPass === "") {
      setLoad(false);
      return alert.error(<div className="notif">Masukkan Password Lama</div>);
    } else if (newPass === "") {
      setLoad(false);
      return alert.error(<div className="notif">Masukkan Password Baru</div>);
    } else if (confPass === "") {
      setLoad(false);
      return alert.error(
        <div className="notif">Masukkan Konfirmasi Password</div>
      );
    }

    axios({
      method: "post",
      url: `${API_URL}change-password`,
      data: {
        old_password: oldPass,
        new_password: newPass,
        confirm_password: confPass,
      },
      headers: {
        ContentType: "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(function (response) {
        setLoad(false);
        alert.success(<div className="notif">Berhasil Mengubah Password!</div>);
        history.push("/");

        //handle success
        console.log(response);
      })
      .catch(function (error) {
        setLoad(false);
        alert.error(<div className="notif">{error.response.data.message}</div>);
      });

    e.preventDefault();
  };
  return (
    <div clasName="mt-2">
      <h2>Ubah Password</h2>
      <hr />
      <Form className="form" onSubmit={handleS}>
        <Row>
          <Col lg="5" sm="10">
            <FormGroup>
              <Label>Password Lama</Label>
              <Input
                placeholder="Konfirmasi Password"
                type="password"
                onInput={(e) => setOldPass(e.target.value)}
              ></Input>
            </FormGroup>
          </Col>
          <Col lg="5" sm="10">
            <FormGroup>
              <Label>Password Baru</Label>
              <Input
                placeholder="Password"
                type="password"
                onInput={(e) => setNewPass(e.target.value)}
              ></Input>
            </FormGroup>
          </Col>
          <Col lg="5" sm="10">
            <FormGroup>
              <Label>Konfirmasi Password Baru</Label>
              <Input
                placeholder="Konfirmasi Password"
                type="password"
                onInput={(e) => setConfPass(e.target.value)}
              ></Input>
            </FormGroup>
          </Col>
        </Row>

        <div>
          {load === true ? (
            <div className="float-right">
              <Spinner></Spinner>
            </div>
          ) : (
            <Button className="btn-round float-right" color="info" size="md">
              Submit
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
}
