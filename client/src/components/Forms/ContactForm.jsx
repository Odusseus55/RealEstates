import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import InputField from "./FormFields/InputField";
import PhoneField from "./FormFields/PhoneField";

function ContactForm({ formField }) {
  const fullName = formField.fullName;
  const phone = formField.phone;
  const email = formField.email;

  return (
    <>
      <Typography variant="h6" gutterBottom xs={{ mb: 3 }}>
        Kontaktní údaje
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <InputField name={fullName.name} label={fullName.label} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <PhoneField name={phone.name} label={phone.label} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <InputField
            name={email.name}
            label={email.label}
            type="email"
            fullWidth
          />
        </Grid>
      </Grid>
    </>
  );
}

export default ContactForm;
