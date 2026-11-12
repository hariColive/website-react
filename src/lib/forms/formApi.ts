// Typed form submissions for client components: map form values to the backend's field names, then post them
// through apiPostForm and the /api/forms/[api] route.
import { apiPostForm } from "@/lib/api/apiClient";

import type { FormResponse, LeadCaptureRequest } from "./formTypes";

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
