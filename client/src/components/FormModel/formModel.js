export default {
  formId: "realEstateForm",
  formField: {
    estateType: {
      name: "estateType",
      label: "Typ nemovitosti*",
      requiredErrorMsg: "Typ nemovitosti je povinný údaj",
    },
    region: {
      name: "region",
      label: "Kraj*",
      requiredErrorMsg: "Kraj je povinný údaj",
    },
    district: {
      name: "district",
      label: "Okres*",
      requiredErrorMsg: "Okres je povinný údaj",
    },
    fullName: {
      name: "fullName",
      label: "Celé jméno*",
      requiredErrorMsg: "Celé jméno je povinný údaj",
      minErrorMsg: "Zadaný údaj je moc krátký",
      maxErrorMsg: "Zadaný údaj je moc dlouhý",
    },
    phone: {
      name: "phone",
      label: "Telefonní číslo",
      requiredErrorMsg: "Telefonní číslo je povinný údaj",
      invalidErrorMsg: "Neplatné telefonní číslo",
    },
    email: {
      name: "email",
      label: "E-mail",
      requiredErrorMsg: "E-mail je povinný údaj",
      invalidErrorMsg: "Neplatný e-mail",
    },
  },
};
