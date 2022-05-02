import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const FormCard = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Paper elevation={5}>Hello in Form Card</Paper>
      </Grid>
    </Grid>
  );
};

export default FormCard;
