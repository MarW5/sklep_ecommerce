import * as yup from "yup";
import { setLocale } from 'yup';

export type CheckoutFormType = yup.InferType<typeof checkoutSchema>;
export type RatioFormType = yup.InferType<typeof ratioFormSchema>;
export type OrderFormType = yup.InferType<typeof orderSchema>;
export type NewsletterSubscribeSchema = yup.InferType<typeof newsletterSubscribeSchema>;
export type SingUpFormType = yup.InferType<typeof singUpSchema>;

export let checkoutSchema = yup.object({
    name: yup!.string().required("Imię jest wymagane"),
    surname: yup!.string().required("Nazwisko jest wymagane"),
    emailAddress: yup!.string().email("Email zawiera błędy").required("Pole email jest wymagane"),
    isCompanyBuy: yup.boolean().default(false),
    companyName: yup.string().default(''),
    taxId: yup.string().max(10).default(''),
    streetName: yup.string().required("Pole jest wymagane"),
    cityName: yup.string().required("Pole jest wymagane"),
    postalCode: yup.string().required("Pole jest wymagane"),
});

checkoutSchema = checkoutSchema.test(
'isCompanyBuy', null, (obj) => {
    if ( !obj.isCompanyBuy ) {
      return true;
    }
    return new yup.ValidationError(
      'Uzupełnij dane firmy',
        null,
        'taxId'
      );
    }
)

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

export const singUpSchema = yup.object({
    emailAddress: yup!.string().email("Email format is not valid").required("Pole email jest wymagane"),
    password: yup!.string().required("Hasło jest wymagane"),
    confirmPassword: yup!.string().required("Wprowadź hasło").oneOf([yup.ref('password')], 'Hasła muszą być identyczne'),
    
}).required();