import React from "react";
import { useHistory } from "react-router-dom";

import { Button } from "reactstrap";

const BackButton = () => {
  const history = useHistory();
  const goBackH = () => {
    history.goBack();
  };
  return (
    <Button color="danger" onClick={goBackH}>
      <i className="now-ui-icons arrows-1_minimal-left"></i> Kembali
    </Button>
  );
};

export default BackButton;
