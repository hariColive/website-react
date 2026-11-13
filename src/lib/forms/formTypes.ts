export type FormEndpoint = "ContactUsInsert" | "walkthroughLead";

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
export interface WalkthroughLeadRequest {
  first_name: string;
  customer_mobile: string;
  [key: string]: string;
  leadSource: string;
  LandingPageId: string;
  Mobile_Number_Validated: string;
  redirectURL: string;
}

export interface WalkthroughLeadResponse {
  success: boolean;
  message?: string;
}