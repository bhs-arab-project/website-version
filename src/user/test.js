import React, { useState } from "react";
import { Button } from "reactstrap";

export default function HookButtonSwitch(props) {
  const [resultatContenu, setResultatContenu] = useState("Content initial");
  const [state, setState] = useState(false);
  const [userType, setUserType] = useState("Admin");

  function handleEventSwitchButton(event, condition) {
    // this.setState({ buttonSwitch: condition });

    switch (event.target.id) {
      case "stats":
        console.log("Coucou Stats");
        return <p>halo</p>;
      case "list":
        console.log("Coucou List");
        return <p>hai handleAnswerOptionClick</p>;
    }
  }

  const toggle = () => setState(!state);
  // const { buttonSwitch = false } = this?.state;
  return (
    <div>
      <br />

      <Button
        id="list"
        variant="light"
        className="border-radius-left"
        // style={buttonSwitch && { backgroundColor: "black" }}
        onClick={(e) => setUserType("Manager")}
      >
        Semua Kelas
      </Button>

      <Button
        id="stats"
        variant="light"
        className="border-radius-right"
        // style={!buttonSwitch && { backgroundColor: "black" }}
        onClick={(e) => setUserType("Admin")}
      >
        Kelas Saya
      </Button>

      {(() => {
        switch (userType) {
          case "Admin":
            return <div>You are a Admin.</div>;
          case "Manager":
            return <div>You are a Manager.</div>;
          default:
            return <div>You are a User.</div>;
        }
      })()}

      <p>-------</p>

      <div onClick={toggle}>
        <div className="toggle">
          {state ? <div>Yes! 👍 </div> : <div>No! 👎</div>}
        </div>
      </div>
    </div>
  );
}
