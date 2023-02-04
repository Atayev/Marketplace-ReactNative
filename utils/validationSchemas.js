import * as yup from "yup";

export const registerValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Please enter your Name")
    .min(3, ({ min }) => `Please name must be at least ${min} characters`),
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email Address is Required"),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
});
export const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email Address is Required"),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
});

export const listingValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Please make sure you correctly entered the name")
    .min(6, ({ min }) => `Name must be at least ${min} characters`),
  address: yup
    .string()
    .required("Please make sure you correctly entered the adress")
    .min(6, ({ min }) => `Address must be at least ${min} characters`),
  bedrooms: yup
    .number()
    .required("Minimum count must be 1")
    .min(1, ({ min }) => `Bedroom must be at least ${min}`),
  bathrooms: yup
    .number()
    .required("Minimum count must be 1")
    .min(1, ({ min }) => `Bathroom must be at least ${min}`),
  regularPrice: yup
    .number()
    .required("Please make sure you correctly entered regular price")
    .min(100, ({ min }) => `Price must be at least ${min}$`),
  images: yup.array().required("At least 1 Photo must be uploaded"),
});
