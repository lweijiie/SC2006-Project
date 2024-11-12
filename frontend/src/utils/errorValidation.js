// validation.js
import {
    ERROR_TEXT_FIELD_MESSAGE,
  } from "../constants";

export const validateFirstName = (firstName) => {
    if (firstName === "") {
      return ERROR_TEXT_FIELD_MESSAGE.no_first_name;
    }
    if (!/^[a-zA-Z ]*$/.test(firstName)) {
      return ERROR_TEXT_FIELD_MESSAGE.invalid_first_name;
    }
    return "";
  };
  
  export const validateLastName = (lastName) => {
    if (lastName === "") {
      return ERROR_TEXT_FIELD_MESSAGE.no_last_name;
    }
    if (!/^[a-zA-Z ]*$/.test(lastName)) {
      return ERROR_TEXT_FIELD_MESSAGE.invalid_last_name;
    }
    return "";
  };
  
  export const validateEmail = (email) => {
    if (email === "") {
      return ERROR_TEXT_FIELD_MESSAGE.no_email_error;
    }
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      return ERROR_TEXT_FIELD_MESSAGE.invalid_email_error;
    }
    return "";
  };
  
  export const validatePassword = (password) => {
    if (password === "") {
      return ERROR_TEXT_FIELD_MESSAGE.no_password_error;
    }
    if (password.length < 8) {
      return ERROR_TEXT_FIELD_MESSAGE.under_length_password_error;
    }
    return "";
  };
  
  export const validateIndustry = (industry) => {
    if (industry === "") {
      return ERROR_TEXT_FIELD_MESSAGE.no_industry;
    }
    return "";
  };
  
  export const validateEducation = (education) => {
    if (education === "") {
      return ERROR_TEXT_FIELD_MESSAGE.no_education;
    }
    return "";
  };
  