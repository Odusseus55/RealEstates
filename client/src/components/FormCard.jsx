import * as React from "react";
import Paper from "@mui/material/Paper";
import { useStyle } from "../styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import { Formik, Form } from "formik";
import axios from "axios";
import { Link } from "react-router-dom";

import formModel from "./FormModel/formModel";
import validationSchema from "./FormModel/validationSchema";
import EstateForm from "./Forms/EstateForm";
import ContactForm from "./Forms/ContactForm";

const { formId, formField } = formModel;

const FormCard = () => {
  const classes = useStyle();
  const steps = ["Nemovitost", "Kontaktní údaje"];
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const submitForm = async (values, { setSubmitting, resetForm }) => {
    const valuesToSubmit = { ...values };
    const url = "http://127.0.0.1:8000/lead";
    if (typeof valuesToSubmit.phone === "number") {
      valuesToSubmit.phone = `+420${valuesToSubmit.phone.toString()}`;
    }

    try {
      await axios.post(url, valuesToSubmit);
      handleNext();
      setSubmitting(false);
      resetForm();
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = (values, actions) => {
    if (!activeStep) {
      handleNext();
      actions.setTouched({});
      actions.setSubmitting(false);
    } else {
      submitForm(values, actions);
    }
  };

  return (
    <Box my={3} className={classes.root}>
      <Paper elevation={3} className={classes.paper}>
        <Typography component="h1" variant="h4" align="center" marginBottom={3}>
          Chci nabídku
        </Typography>
        <Box sx={{ width: "100%" }}>
          <Stepper activeStep={activeStep} sx={{ pb: 5 }}>
            {steps.map((label) => {
              return (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>

          <Formik
            initialValues={{
              estateType: "",
              region: "",
              district: "",
              fullName: "",
              phone: "",
              email: "",
            }}
            validationSchema={
              activeStep ? validationSchema[1] : validationSchema[0]
            }
            onSubmit={handleSubmit}
          >
            {({ values, isSubmitting }) => {
              return (
                <Form id={formId}>
                  {activeStep === steps.length ? (
                    <React.Fragment>
                      <Typography sx={{ mt: 2, mb: 1 }} align="center">
                        Žádost byla úspešne odeslaná.
                      </Typography>
                      {/* <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}> */}
                      <Box
                        sx={{ display: "flex", flexDirection: "row", pt: 2 }}
                        justifyContent="center"
                      >
                        {/* <Box sx={{ flex: "1 1 auto" }} /> */}
                        <Button onClick={handleReset}>
                          Vyplnit novou žádost
                        </Button>
                        <Button component={Link} to="/">
                          Seznam žádostí
                        </Button>
                      </Box>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      {!activeStep ? (
                        <EstateForm formField={formField} values={values} />
                      ) : (
                        <ContactForm formField={formField} fullWidth />
                      )}
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          pt: 2,
                          mt: 5,
                        }}
                      >
                        <Button
                          color="inherit"
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          sx={{ mr: 1 }}
                        >
                          Back
                        </Button>
                        <Box sx={{ flex: "1 1 auto" }} />

                        <Button
                          // onClick={handleNext}
                          type="submit"
                          disabled={isSubmitting}
                        >
                          {activeStep === steps.length - 1 ? "Finish" : "Next"}
                        </Button>
                      </Box>
                    </React.Fragment>
                  )}
                </Form>
              );
            }}
          </Formik>
        </Box>
      </Paper>
    </Box>
  );
};

export default FormCard;
