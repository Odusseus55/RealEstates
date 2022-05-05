import * as React from "react";
import Grid from "@mui/material/Grid";
import SelectField from "./FormFields/SelectField";
import rawDistricts from "../../data/okresy.json";
import rawRegions from "../../data/kraje.json";
import Typography from "@mui/material/Typography";

const estateTypes = ["Byt", "Dům", "Pozemek"];
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

function EstateForm({ formField, values }) {
  const estateType = formField.estateType;
  const region = formField.region;
  const district = formField.district;

  React.useEffect(() => {
    // if region value changes, clear the district value
    values.district = "";
  }, [values.region]);

  return (
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
  );
}

export default EstateForm;
