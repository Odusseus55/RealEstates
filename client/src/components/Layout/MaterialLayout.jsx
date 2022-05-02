import React from "react";
import { Paper, CssBaseline } from "@material-ui/core";

import Header from "../Header";
import Footer from "../Footer";

import { useStyle } from "./styles";

export default function MaterialLayout(props) {
  const { children } = props;
  const classes = useStyle();

  return (
    <>
      <CssBaseline />
      <Header />
      <div className={classes.root}>
        <Paper className={classes.paper}>{children}</Paper>
      </div>
      <Footer />
    </>
  );
}
