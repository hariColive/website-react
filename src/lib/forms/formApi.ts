import { apiPostForm } from "@/lib/api/apiClient";

import type {
  ContactFormRequest,
  ContactFormValues,
  FormApiResponse,
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