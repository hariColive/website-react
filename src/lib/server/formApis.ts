import "server-only";

type FormApiResult =
  | { payload: Record<string, unknown>; error?: never }
  | { payload?: never; error: string };

type FormApiDefinition = {
  path: string;
  successMessage: string;
  createPayload: (input: Record<string, unknown>) => FormApiResult;
};

const readString = (value: unknown): string =>
  typeof value === "string" ? value.trim() : "";

const contactForm: FormApiDefinition = {
  path: "/api/Colive/ContactUsInsert",
  successMessage: "Contact form submitted successfully.",
  createPayload(input) {
    const name = readString(input.Name ?? input.name);
    const mobile = readString(input.Mobile ?? input.mobile).replace(/\s+/g, "");
    const email = readString(input.Email ?? input.email);
    const message = readString(input.Message ?? input.message);
    const contactType = readString(
      input.ContactusType ?? input.contactusType ?? input.select
    );

    if (!name || !mobile || !contactType) {
      return {
        error: "Name, mobile number, and enquiry type are required.",
      };
    }

    if (!/^\d{10}$/.test(mobile)) {
      return { error: "Please enter a valid 10-digit mobile number." };
    }

    return {
      payload: {
        Name: name,
        Mobile: mobile,
        Email: email,
        Message: message,
        ContactusType: contactType,
        Source: readString(input.Source ?? "Website"),
      },
    };
  },
};

export const FORM_APIS = {
  contact: contactForm,
} satisfies Record<string, FormApiDefinition>;

export type FormApiName = keyof typeof FORM_APIS;

export function isFormApiName(name: string): name is FormApiName {
  return Object.hasOwn(FORM_APIS, name);
}
