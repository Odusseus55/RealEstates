import * as Yup from "yup";
import formModel from "./formModel";

const {
  formField: { estateType, region, district },
} = formModel;

export default Yup.object().shape({
  [estateType.name]: Yup.string().required(`${estateType.requiredErrorMsg}`),
  [region.name]: Yup.string().required(`${region.requiredErrorMsg}`),
  [district.name]: Yup.string().required(`${district.requiredErrorMsg}`),
});
