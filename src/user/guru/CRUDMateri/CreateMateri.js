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
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import Spinner from "reactstrap/lib/Spinner";
import { API_URL } from "utils/constants";
import { useAlert } from "react-alert";
import BackComponent from "../../../utils/BackComponent";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import TransparentFooter from "components/Footers/TransparentFooter";
import BackButton from "../../../utils/BackComponent";
import { useHistory } from "react-router-dom";

export default function CreateMateri() {
  const alert = useAlert();
  const guru = localStorage.getItem("token");
  const guruToken = JSON.parse(guru);
  const access_token = guruToken?.token?.token;
  const userId = guruToken?.user?.id;

  const history = useHistory();

  const [valButton, setValB] = useState("Pilih Kelas");
  const [judulMateri, setJudulMateri] = useState();
  const [materi, setMateri] = useState();
  const [lessonId, setLessonId] = useState("");
  const [listLesson, setListLesson] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [load, setLoad] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  let filterListL = listLesson.filter(function (listL) {
    // eslint-disable-next-line
    return listL.user_id == userId;
  });

  console.log(materi);

  async function fetchData() {
    axios
      .get(`${API_URL}pelajaran`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        setLoad(false);
        setListLesson(response.data);
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
  }, []);

  let bodyFormData = new FormData();
  bodyFormData.set("lesson_id", lessonId);
  bodyFormData.set("user_id", guruToken?.user?.id);
  bodyFormData.set("judul_bab", judulMateri);
  bodyFormData.set("materi", materi);

  // for (var pair of bodyFormData.entries()) {
  //   console.log(pair[0] + ", " + pair[1]);
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoggedIn(true);

    if (lessonId === "") {
      setLoggedIn(false);
      return alert.error(
        <div className="notif">Pilih Kelas Terlebih Dahulu</div>
      );
    }

    axios({
      method: "post",
      url: `${API_URL}bab`,
      data: bodyFormData,
      headers: {
        ContentType: "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    })
      .then(function (response) {
        setLoggedIn(false);
        alert.success(<div className="notif">Berhasil membuat Bab!</div>);

        history.goBack();
        //handle success
        console.log(response);
      })
      .catch(function (response) {
        setLoggedIn(false);
        alert.error(
          <div className="notif">Gagal membuat Bab Silahkan Coba Lagi</div>
        );
        console.log(response);
      });
  };

  return (
    <>
      <DetailHeader
        header="Buat Materi"
        subHeader="buat materi yang anda inginkan sekarang!"
        img={require("assets/img/my-babex.jpg")}
      />
      <div className="section ">
        <Container>
          <br />
          <div clasName="mt-2">
            <BackButton />
            <h2>Buat Materi</h2>
            <hr />
            <Form className="form" onSubmit={handleSubmit}>
              <Row>
                <Col lg="4" sm="10">
                  <FormGroup>
                    <Label>Pilih Kelas</Label>
                    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                      <DropdownToggle caret>{valButton}</DropdownToggle>
                      <DropdownMenu>
                        {load === false ? (
                          filterListL?.length === 0 ? (
                            <DropdownItem text className="text-danger" disabled>
                              Buat Kelas Terlebih Dahulu
                            </DropdownItem>
                          ) : (
                            filterListL?.map((list, index) => {
                              return (
                                <DropdownItem
                                  key={index}
                                  checked={lessonId === list.id}
                                  value={list.id}
                                  onClick={() => {
                                    setLessonId(list.id);
                                    setValB(list.pelajaran);
                                  }}
                                >
                                  {list.pelajaran}
                                </DropdownItem>
                              );
                            })
                          )
                        ) : (
                          <DropdownItem text disabled>
                            Loading...
                          </DropdownItem>
                        )}
                      </DropdownMenu>
                    </Dropdown>
                    <span className="text-xs text-info">
                      *anda hanya bisa memilih kelas yang anda buat
                    </span>
                  </FormGroup>
                </Col>
                <Col lg="5" sm="10">
                  <FormGroup>
                    <Label>Judul Materi</Label>
                    <Input
                      required
                      oninvalid="Judul Materi Harus di isi"
                      onvalid="this.setCustomValidity('')"
                      placeholder="Judul Materi"
                      type="text"
                      onInput={(e) => setJudulMateri(e.target.value)}
                    ></Input>
                  </FormGroup>
                </Col>
              </Row>
              <Col>
                <FormGroup>
                  <Label>Materi</Label>
                  <CKEditor
                    required
                    editor={ClassicEditor}
                    data={materi}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setMateri(data);
                    }}
                  />
                </FormGroup>
              </Col>

              <div>
                {loggedIn === true ? (
                  <div className="float-right">
                    <Spinner></Spinner>
                  </div>
                ) : (
                  <Button
                    className="btn-round float-right"
                    color="info"
                    // onClick={(e) => e.preventDefault()}
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
