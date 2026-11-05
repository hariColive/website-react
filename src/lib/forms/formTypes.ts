export type FormEndpoint = "ContactUsInsert";

export type ContactFormRequest = {
  Name: string;
  Mobile: string;
  Email: string;
  Message: string;
  ContactusType: string;
  Source: "WebContactus";
};

export type ContactFormValues = {
  name: string;
  mobile: string;
  email: string;
  select: string;
  message: string;
};

export type FormApiResponse<T = unknown> = {
  Status: string;
  Message: string;
  Data?: T;
};