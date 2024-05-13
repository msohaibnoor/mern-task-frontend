import React from "react";
import { Container } from "reactstrap";
import TopBar from "../../../Shared/TopBar";

const GeneralLayout = (props) => {
  return (
    <React.Fragment>
      <Container fluid>
        <TopBar
          isPublic={props.isPublic}
          isGuest={props.isGuest}
          isPrivate={props.isPrivate}
          isAuth={props.isAuth}
        />
        <Container fluid>{props.children}</Container>
      </Container>
    </React.Fragment>
  );
};

export default GeneralLayout;
