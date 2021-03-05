import React, { useState } from "react";
import { Button } from "reactstrap";

export default function HookButtonSwitch(props) {
  const [resultatContenu, setResultatContenu] = useState("Content initial");
  const [state, setState] = useState(false);

  const handleEventSwitchButton = (event, condition) => {
    // this.setState({ buttonSwitch: condition });

    let resultatContenu;
    switch (event.target.id) {
      case "stats":
        console.log("Coucou Stats");
        resultatContenu = "Stats";
        break;
      case "list":
        console.log("Coucou List");
        resultatContenu = "LIST";
        break;
    }
    setResultatContenu(resultatContenu);
  };

  const toggle = () => setState(!state);
  //   const { buttonSwitch = false } = this?.state;
  return (
    <div>
      <br />

      <Button
        id="list"
        variant="light"
        className="border-radius-left"
        // style={buttonSwitch && { backgroundColor: "black" }}
        onClick={(e) => handleEventSwitchButton(e, true)}
      >
        Semua Kelas
      </Button>

      <Button
        id="stats"
        variant="light"
        className="border-radius-right"
        // style={!buttonSwitch && { backgroundColor: "black" }}
        onClick={(e) => handleEventSwitchButton(e, false)}
      >
        Kelas Saya
      </Button>

      <div> {resultatContenu} </div>

      {/* <p>-------</p>

            <div onClick={toggle}>
                <div className="toggle">
                    {state ? <div>Yes! 👍  </div>   : <div>No! 👎</div>}
                </div>
            </div>
            */}
    </div>
  );
}
