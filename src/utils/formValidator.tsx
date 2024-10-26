import * as yup from "yup";
import { setLocale } from 'yup';

export type CheckoutFormType = yup.InferType<typeof checkoutSchema>;
export type RatioFormType = yup.InferType<typeof ratioFormSchema>;
export type OrderFormType = yup.InferType<typeof orderSchema>;
export type NewsletterSubscribeSchema = yup.InferType<typeof newsletterSubscribeSchema>;

export const checkoutSchema = yup.object({
    emailAddress: yup.string().email("Email format is not valid").required("Pole email jest wymagane"),
    nameOnCard: yup.string(),
    cardNumber: yup.number(),
    // .max(26).required(),
    cardDate: yup.string(),
    cvcCard: yup.string(),
    companyName: yup.string(),
    companyAddress: yup.string(),
    apartmentName: yup.string(),
    cityName: yup.string(),
    stateName: yup.string(),
    postalCode: yup.string(),
}).required();


export const ratioFormSchema = yup.object({
    headline: yup.string().required(),
    name: yup.string().required(),
    email: yup.string().required(),
    content: yup.string().required(),
    rating: yup.number().required(),
}).required();

export const orderSchema = yup.object({
    email: yup.string().email("Email format is not valid").required("Pole email jest wymagane"),
}).required();

export const newsletterSubscribeSchema = yup.object({
    email: yup.string().email("Email format is not valid").required("Pole email jest wymagane"),
    name: yup.string().required("Pole imie jest wymagane"),
}).required();

setLocale({
    mixed: {
      default: 'field_invalid',
    },
    number: {
      max: ({ max }) => ({ key: 'Card code have 26 numbers.', values: { max } }),
    },
  });

  checkoutSchema.validate({ name: 'jimmy', age: 11 }).catch(function (err) {
    console.log(err)
  });