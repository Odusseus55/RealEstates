import * as React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useStyle } from "../styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import { Formik, Form } from "formik";
import SelectField from "./SelectField";

import formModel from "./FormModel/formModel";
import rawRegions from "../data/kraje.json";
import rawDistricts from "../data/okresy.json";
import validationSchema from "./FormModel/validationSchema";

const { formId, formField } = formModel;
const estateTypes = ["byt", "dum", "pozemek"];

const regions = rawRegions.polozky.map((region) => {
  return region.nazev.cs;
});

function regionDistrictsArray(region) {
  const districtsObj = rawDistricts.polozky.filter((district) => {
    return district.kraj === region;
  });
  const districtsArr = districtsObj.map((district) => {
    return district.nazev.cs;
  });
  return districtsArr;
}

function regionID(regionName) {
  if (regionName) {
    const id = rawRegions.polozky.filter(
      (region) => region.nazev.cs === regionName
    );
    // console.log(id);
    return id[0].id;
  } else {
    return null;
  }
}

const FormCard = () => {
  const classes = useStyle();
  const steps = ["Nemovitost", "Kontaktní údaje"];
  const [activeStep, setActiveStep] = React.useState(0);

  const estateType = formField.estateType;
  const region = formField.region;
  const district = formField.district;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleSubmit = (values, { setSubmitting }) => {
    handleNext();
    console.log("Submitting");
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  };

  return (
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
          initialValues={{ estateType: "", region: "", district: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          //   onSubmit={(values, { setSubmitting }) => {
          //     console.log("Submitting");
          //     setTimeout(() => {
          //       alert(JSON.stringify(values, null, 2));
          //       setSubmitting(false);
          //     }, 400);
          //   }}
        >
          {({ values, isSubmitting }) => {
            React.useEffect(() => {
              // if region value changes, clear the district value
              values.district = "";
            }, [values.region]);
            return (
              <Form id={formId}>
                {!activeStep && (
                  <>
                    <Typography variant="h6" gutterBottom xs={{ mb: 3 }}>
                      Údaje o nemovitosti
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <SelectField
                          name={estateType.name}
                          label={estateType.label}
                          data={estateTypes}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <SelectField
                          name={region.name}
                          label={region.label}
                          data={regions}
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <SelectField
                          name={district.name}
                          label={district.label}
                          data={regionDistrictsArray(regionID(values.region))}
                          fullWidth
                          disabled={!values.region && true}
                        />
                        {/* {console.log(regionID("Středočeský kraj"))} */}
                      </Grid>
                    </Grid>
                  </>
                )}

                {activeStep === steps.length ? (
                  <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                      All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      <Box sx={{ flex: "1 1 auto" }} />
                      <Button onClick={handleReset}>Reset</Button>
                    </Box>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}
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

                {/* <button type="submit" disabled={isSubmitting}>
                Submit
              </button> */}
              </Form>
            );
          }}
        </Formik>
      </Box>
    </Paper>
  );
};

export default FormCard;
