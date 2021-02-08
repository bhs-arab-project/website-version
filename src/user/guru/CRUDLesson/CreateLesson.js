import DefaultFooter from "components/Footers/DefaultFooter";
import DetailHeader from "components/Headers/DetailHeader";
import React, { Component } from "react";
import BackComponent from "./BackComponent";
import { Form } from "react-bootstrap";
// reactstrap components
import {
  Button,
  Label,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

export default class CreateLesson extends Component {
  state = {};
  render() {
    return (
      <>
        <DetailHeader
          header="Buat Pelajaran"
          subHeader="buat pelajaran yang anda inginkan sekarang!"
          img={require("assets/img/my-bab.jpg")}
        />
        <div className="section ">
          <Container>
            <BackComponent />
            <br />
            <div id="inputs">
              <h2>Buat Pelajaran</h2>
              <hr />
              <Row>
                <Col lg="5" sm="10">
                  <FormGroup>
                    <Label>Nama Pelajaran</Label>
                    <Input
                      defaultValue=""
                      placeholder="Nama Pelajaran"
                      type="text"
                    ></Input>
                  </FormGroup>
                </Col>
                <Label>Kesulitan : </Label>
                <Row className="mt-4">
                  <FormGroup check className="form-check-radio ">
                    <Label check>
                      <Input
                        defaultValue="option1"
                        id="exampleRadios1"
                        name="exampleRadios"
                        type="radio"
                      ></Input>
                      <span className="form-check-sign "></span>
                      Radio is off
                    </Label>
                  </FormGroup>
                  <FormGroup check className="form-check-radio">
                    <Label check>
                      <Input
                        defaultChecked
                        defaultValue="option2"
                        id="exampleRadios1"
                        name="exampleRadios"
                        type="radio"
                      ></Input>
                      <span className="form-check-sign"></span>
                      Radio is on
                    </Label>
                  </FormGroup>
                  <FormGroup check className="form-check-radio">
                    <Label check>
                      <Input
                        defaultChecked
                        defaultValue="option2"
                        id="exampleRadios1"
                        name="exampleRadios"
                        type="radio"
                      ></Input>
                      <span className="form-check-sign"></span>
                      Radio is on
                    </Label>
                  </FormGroup>
                </Row>
              </Row>
            </div>
          </Container>
        </div>
        <DefaultFooter />
      </>
    );
  }
}
