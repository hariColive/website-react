import { apiPostForm } from "@/lib/api/apiClient";

import type {
  ContactFormRequest,
  ContactFormValues,
  FormApiResponse,
  FormResponse,
  LeadCaptureRequest,
  WalkthroughLeadRequest,
  WalkthroughLeadResponse,
} from "./formTypes";

export function submitContactForm(values: ContactFormValues) {
  const payload: ContactFormRequest = {
    Name: values.name.trim(),
    Mobile: values.mobile.trim(),
    Email: values.email.trim(),
    Message: values.message.trim(),
    ContactusType: values.select,
    Source: "WebContactus",
  };

  return apiPostForm<FormApiResponse>("ContactUsInsert", payload);
}

export const submitWalkthroughLead = (payload: WalkthroughLeadRequest) => {
  return apiPostForm<WalkthroughLeadResponse>("walkthroughLead", payload);
};

// Same fields and fixed values the legacy colive.com home page form posts
export function submitLeadCapture(values: LeadCaptureRequest) {
  return apiPostForm<FormResponse>("leadCapture", {
    ...values.tracking,
    first_name: values.name,
    customer_mobile: values.phone,
    leadSource: "Colive Home Page",
    LandingPageId: "1",
    Mobile_Number_Validated: "false",
    redirectURL: "/?act=thankyou",
  });
}
