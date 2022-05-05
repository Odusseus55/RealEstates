import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import { useField } from "formik";
import { at } from "lodash";
import FormHelperText from "@mui/material/FormHelperText";

function PhoneField(props) {
  const { ...rest } = props;
  const [field, meta] = useField(props);
  const [touched, error] = at(meta, "touched", "error");
  const isError = touched && error && true;

  function _renderHelperText() {
    if (touched && error) {
      //   return error;
      return <FormHelperText>{error}</FormHelperText>;
    }
  }

  return (
    <FormControl variant="standard" {...rest} error={isError}>
      <InputLabel htmlFor="standard-adornment-amount">{rest.label}</InputLabel>
      <Input
        id="standard-adornment-amount"
        // value={values.amount}
        // onChange={handleChange("amount")}
        type="number"
        startAdornment={<InputAdornment position="start">+420</InputAdornment>}
        {...field}
      />
      {_renderHelperText()}
    </FormControl>
  );
}

export default PhoneField;
