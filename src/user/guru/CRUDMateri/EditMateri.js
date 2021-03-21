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
import { useHistory, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import TransparentFooter from "components/Footers/TransparentFooter";
import BackButton from "../../../utils/BackComponent";

export default function EditMateri(props) {
  let { id } = useParams();
  const history = useHistory();
  const alert = useAlert();
  const { token, userId } = props;

  const [detailM, setDetailM] = useState();
  const [valButton, setValB] = useState("");
  const [judulMateri, setJudulMateri] = useState();
  const [materi, setMateri] = useState();
  const [lessonId, setLessonId] = useState();
  const [listLesson, setListLesson] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const [load, setLoad] = useState(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  let filterListL = listLesson?.filter(function (listL) {
    // eslint-disable-next-line
    return listL.user_id == userId;
  });

  async function fetchBab() {
    axios
      .get(`${API_URL}bab/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setLoad(false);
        setDetailM(response.data);
        setMateri(response.data.materi);
        setJudulMateri(response.data.judul_bab);
        setLessonId(response.data.lesson_id);
        setValB(response.data.pelajaran);
      })
      .catch((error) => {
        let message = error.response;
        console.log(message);
      });
  }

  async function fetchData() {
    axios
      .get(`${API_URL}pelajaran`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setLoad(false);
        setListLesson(response.data);

        // setValB(questions.pelajaran);
      })
      .catch((error) => {
        let message = error.response;
        console.log(message);
      });
  }

  React.useEffect(() => {
    setLoad(true);
    fetchBab();
    fetchData();
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoggedIn(true);

    axios({
      method: "put",
      url: `${API_URL}bab/${id}`,
      data: {
        lesson_id: lessonId,
        user_id: userId,
        judul_bab: judulMateri,
        materi: materi,
      },
      headers: {
        ContentType: "multipart/form-data",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(function (response) {
        setLoggedIn(false);
        alert.success(<div className="notif">Berhasil mengedit Bab!</div>);
        history.goBack();
        //handle success
        console.log(response);
      })
      .catch(function (error) {
        setLoggedIn(false);
        alert.error(
          <div className="notif">Gagal mengedit Bab Silahkan Coba Lagi</div>
        );
        console.log(error.response);
      });

    e.preventDefault();
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
          <div className="mt-2">
            <BackButton />
            <h2>Edit Materi {detailM?.judul_bab}</h2>
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
                            <DropdownItem className="text-danger" disabled>
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
                          <DropdownItem disabled>Loading...</DropdownItem>
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
                      // data={detailM?.judul_bab}
                      defaultValue={judulMateri}
                      // value={detailM?.judul_bab}
                      required
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
                    data={materi}
                    editor={ClassicEditor}
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
