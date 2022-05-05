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
      requiredErrorMsg: "Celé jméno je povinny údaj",
      minErrorMsg: "Zadaný údaj je moc kratky",
      maxErrorMsg: "Zadaný údaj je moc dlouhy",
    },
    phone: {
      name: "phone",
      label: "Telefonní číslo",
      requiredErrorMsg: "Telefonní číslo je povinny údaj",
      invalidErrorMsg: "Neplatný telefonní číslo",
    },
    email: {
      name: "email",
      label: "E-mail",
      requiredErrorMsg: "E-mail je povinný údaj",
      invalidErrorMsg: "Neplatný e-mail",
    },

    //     address2: {
    //       name: "address2",
    //       label: "Address Line 2",
    //     },
    //     city: {
    //       name: "city",
    //       label: "City*",
    //       requiredErrorMsg: "City is required",
    //     },
    //     state: {
    //       name: "state",
    //       label: "State/Province/Region",
    //     },
    //     zipcode: {
    //       name: "zipcode",
    //       label: "Zipcode*",
    //       requiredErrorMsg: "Zipcode is required",
    //       invalidErrorMsg: "Zipcode is not valid (e.g. 70000)",
    //     },
    //     country: {
    //       name: "country",
    //       label: "Country*",
    //       requiredErrorMsg: "Country is required",
    //     },
    //     useAddressForPaymentDetails: {
    //       name: "useAddressForPaymentDetails",
    //       label: "Use this address for payment details",
    //     },
    //     nameOnCard: {
    //       name: "nameOnCard",
    //       label: "Name on card*",
    //       requiredErrorMsg: "Name on card is required",
    //     },
    //     cardNumber: {
    //       name: "cardNumber",
    //       label: "Card number*",
    //       requiredErrorMsg: "Card number is required",
    //       invalidErrorMsg: "Card number is not valid (e.g. 4111111111111)",
    //     },
    //     expiryDate: {
    //       name: "expiryDate",
    //       label: "Expiry date*",
    //       requiredErrorMsg: "Expiry date is required",
    //       invalidErrorMsg: "Expiry date is not valid",
    //     },
    //     cvv: {
    //       name: "cvv",
    //       label: "CVV*",
    //       requiredErrorMsg: "CVV is required",
    //       invalidErrorMsg: "CVV is invalid (e.g. 357)",
    //     },
  },
};
