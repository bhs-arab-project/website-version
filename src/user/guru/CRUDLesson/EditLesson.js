import DetailHeader from "components/Headers/DetailHeader";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import axios from "axios";
// reactstrap components
import {
  Button,
  Label,
  FormGroup,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
import Spinner from "reactstrap/lib/Spinner";
import { API_URL } from "utils/constants";
import { useHistory, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import TransparentFooter from "components/Footers/TransparentFooter";
import BackButton from "../../../utils/BackComponent";

export default function EditLesson(props) {
  let { id } = useParams();
  const history = useHistory();
  const alert = useAlert();
  const { token, name } = props;
  const [detailL, setDetailL] = useState();
  const [load, setLoad] = useState(false);
  const [pelajaran, setPelajaran] = useState("");
  const [kesulitan, setKesulitan] = useState("");
  const [deskripsi, setDeskripsi] = useState("");

  async function fetchData() {
    axios
      .get(`${API_URL}pelajaran/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setLoad(false);
        setDetailL(response.data);
        setPelajaran(response.data.pelajaran);
        setKesulitan(response.data.tingkatan);
        setDeskripsi(response.data.deskripsi);
      })
      .catch((error) => {
        let message = error.response;
        console.log(message);
      });
  }

  React.useEffect(() => {
    setLoad(true);
    fetchData();
    // eslint-disable-next-line
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoad(true);

    axios({
      method: "put",
      url: `${API_URL}pelajaran/${id}`,
      data: {
        pelajaran: pelajaran,
        tingkatan: kesulitan,
        deskripsi: deskripsi,
        guru: name,
      },
      headers: {
        ContentType: "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(function (response) {
        setLoad(false);
        alert.success(<div className="notif">Berhasil mengedit Kelas!</div>);
        history.push("/");
        //handle success
        console.log(response);
      })
      .catch(function (error) {
        setLoad(false);
        alert.error(
          <div className="notif">Gagal mengedit Kelas Silahkan Coba Lagi</div>
        );
        console.log(error.response);
      });

    e.preventDefault();
  };

  return (
    <>
      <DetailHeader
        header="Edit Kelas"
        subHeader="buat Kelas yang anda inginkan sekarang!"
        img={require("assets/img/class.jpg")}
      />
      <div className="section ">
        <Container>
          <BackButton />
          <br />
          <div clasName="mt-2">
            <h2>Edit Kelas {detailL?.pelajaran}</h2>
            <hr />
            <Form className="form" onSubmit={handleSubmit}>
              <Row>
                <Col lg="5" sm="10">
                  <FormGroup>
                    <Label>Nama Kelas</Label>
                    <Input
                      defaultValue={detailL?.pelajaran}
                      placeholder="Nama Kelas"
                      type="text"
                      name="namaKelas"
                      onInput={(e) => setPelajaran(e.target.value)}
                    ></Input>
                  </FormGroup>
                </Col>
                <Label>Tingkat Kesulitan : </Label>
                <Row className="mt-4">
                  <FormGroup check className="form-check-radio ">
                    <Label check>
                      <Input
                        defaultValue={detailL?.kesulitan}
                        type="radio"
                        label="mudah"
                        checked={kesulitan === "mudah"}
                        value={detailL?.kesulitan}
                        onClick={() => setKesulitan("mudah")}
                      ></Input>
                      <span className="form-check-sign "></span>
                      Mudah
                    </Label>
                  </FormGroup>
                  <FormGroup check className="form-check-radio ml-2">
                    <Label check>
                      <Input
                        defaultChecked
                        defaultValue={detailL?.kesulitan}
                        type="radio"
                        label="menengah"
                        checked={kesulitan === "menengah"}
                        value={detailL?.kesulitan}
                        onClick={() => setKesulitan("menengah")}
                      ></Input>
                      <span className="form-check-sign"></span>
                      Menengah
                    </Label>
                  </FormGroup>
                  <FormGroup check className="form-check-radio ml-2">
                    <Label check>
                      <Input
                        defaultChecked
                        defaultValue={detailL?.kesulitan}
                        name="level"
                        type="radio"
                        label="sulit"
                        checked={kesulitan === "sulit"}
                        value={detailL?.kesulitan}
                        onClick={() => setKesulitan("sulit")}
                      ></Input>
                      <span className="form-check-sign"></span>
                      Sulit
                    </Label>
                  </FormGroup>
                </Row>
              </Row>
              <Col>
                <FormGroup>
                  <Label>Deskripsi Kelas</Label>
                  <textarea
                    defaultValue={detailL?.deskripsi}
                    name="deskripsi"
                    onInput={(e) => setDeskripsi(e.target.value)}
                    className="form-control"
                    rows="5"
                  ></textarea>
                </FormGroup>
              </Col>
              <div>
                {load === true ? (
                  <div className="float-right">
                    <Spinner></Spinner>
                  </div>
                ) : (
                  <Button
                    className="btn-round float-right"
                    color="info"
                    size="md"
                  >
                    Submit
                  </Button>
                )}
              </div>
            </Form>
          </div>
        </Container>
      </div>
      <TransparentFooter />
    </>
  );
}
