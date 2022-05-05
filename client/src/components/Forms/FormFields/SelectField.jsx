import React from "react";
import PropTypes from "prop-types";
import { at } from "lodash";
import { useField } from "formik";
import {
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
} from "@material-ui/core";

function SelectField(props) {
  const { label, data, ...rest } = props;
  const [field, meta] = useField(props);
  var { value: selectedValue } = field;
  const [touched, error] = at(meta, "touched", "error");
  const isError = touched && error && true;

  //   console.log(label);
  //   console.log(data);
  //   console.log(rest);
  //   console.log(field);
  //   console.log(meta);
  //   console.log(selectedValue);

  function _renderHelperText() {
    if (isError) {
      return <FormHelperText>{error}</FormHelperText>;
    }
  }

  //   If user changes the Region after the district was chosen, then set the District value to empty string
  if (!data.includes(selectedValue)) {
    selectedValue = "";
  }

  return (
    <FormControl {...rest} error={isError}>
      <InputLabel>{label}</InputLabel>
      <Select {...field} value={selectedValue ? selectedValue : ""}>
        {data.map((item, index) => (
          <MenuItem key={index} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
      {_renderHelperText()}
    </FormControl>
  );
}

SelectField.defaultProps = {
  data: [],
};

SelectField.propTypes = {
  data: PropTypes.array.isRequired,
};

export default SelectField;
