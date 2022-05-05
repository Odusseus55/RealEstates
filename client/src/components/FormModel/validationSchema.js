import * as Yup from "yup";
import formModel from "./formModel";

const {
  formField: { estateType, region, district, fullName, phone, email },
} = formModel;

export default [
  Yup.object().shape({
    [estateType.name]: Yup.string().required(`${estateType.requiredErrorMsg}`),
    [region.name]: Yup.string().required(`${region.requiredErrorMsg}`),
    [district.name]: Yup.string().required(`${district.requiredErrorMsg}`),
  }),
  Yup.object().shape({
    [fullName.name]: Yup.string()
      .required(`${fullName.requiredErrorMsg}`)
      .min(5, fullName.minErrorMsg)
      .max(50, fullName.maxErrorMsg),
    [phone.name]: Yup.number()
      .required(`${phone.requiredErrorMsg}`)
      .min(100000000, `${phone.invalidErrorMsg}`)
      .max(999999999, `${phone.invalidErrorMsg}`),
    [email.name]: Yup.string()
      .email(`${email.invalidErrorMsg}`)
      .required(`${email.requiredErrorMsg}`),
  }),
];
